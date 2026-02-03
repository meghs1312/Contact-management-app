const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const setupDb = require('./db');
const { authenticateToken, JWT_SECRET } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

let db;

async function startServer() {
    db = await setupDb();

    // User Registration
    app.post('/api/register', async (req, res) => {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.run(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );
            
            const token = jwt.sign({ userId: result.lastID, username }, JWT_SECRET, { expiresIn: '7d' });
            
            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: { id: result.lastID, username, email }
            });
        } catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                res.status(400).json({ error: 'Username or email already exists' });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    });

    // User Login
    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        try {
            const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
            
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
            
            res.json({
                message: 'Login successful',
                token,
                user: { id: user.id, username: user.username, email: user.email }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // GET all contacts (protected, user-specific)
    app.get('/api/contacts', authenticateToken, async (req, res) => {
        try {
            const contacts = await db.all(
                'SELECT * FROM contacts WHERE user_id = ? ORDER BY created_at DESC',
                [req.user.userId]
            );
            res.json(contacts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // POST new contact (protected, user-specific)
    app.post('/api/contacts', authenticateToken, async (req, res) => {
        const { name, email, phone } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        try {
            const result = await db.run(
                'INSERT INTO contacts (user_id, name, email, phone) VALUES (?, ?, ?, ?)',
                [req.user.userId, name, email, phone]
            );
            res.status(201).json({ id: result.lastID, user_id: req.user.userId, name, email, phone });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // PUT update contact (protected, user-specific)
    app.put('/api/contacts/:id', authenticateToken, async (req, res) => {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        try {
            const result = await db.run(
                'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ? AND user_id = ?',
                [name, email, phone, id, req.user.userId]
            );
            
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Contact not found or access denied' });
            }
            
            res.json({ id, name, email, phone });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // DELETE contact (protected, user-specific)
    app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.run(
                'DELETE FROM contacts WHERE id = ? AND user_id = ?',
                [id, req.user.userId]
            );
            
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Contact not found or access denied' });
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
