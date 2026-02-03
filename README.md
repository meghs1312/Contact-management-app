# Contact Manager

A simple and user-friendly contact management application built with React and Node.js. Features user authentication and allows users to store, search, and manage their personal contacts with a clean table-based interface.

## Features

- ✅ Add new contacts with name, email, and phone
- ✅ View all contacts in a clean, organized layout
- ✅ Search contacts by name, email, or phone number
- ✅ Edit existing contact information
- ✅ Delete contacts with confirmation
- ✅ User authentication (registration and login)
- ✅ User-specific contacts (each user sees only their contacts)
- ✅ Clickable table interface for easy contact management
- ✅ Responsive design that works on desktop and mobile
- ✅ Modern, clean user interface with red theme

## Technologies Used

- **Frontend**: React, Vite, Custom CSS, Lucide React (icons)
- **Backend**: Node.js, Express.js
- **Database**: SQLite (SQL database)
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or navigate to the project folder**
   ```bash
   cd /path/to/Contact-management-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

You need to run both the backend and frontend servers:

1. **Start the backend server** (in a new terminal):
   ```bash
   cd backend
   node index.js
   ```
   The backend will run on `http://localhost:5001`

2. **Start the frontend development server** (in another terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser** and go to `http://localhost:5173` to use the application.

## How to Use

1. **Add a Contact**: Click the "Add Contact" button and fill in the contact information
2. **Search Contacts**: Use the search bar in the header to find contacts by name, email, or phone
3. **Edit a Contact**: Click on any contact row in the table to open the edit modal
4. **Delete a Contact**: Click on a contact to edit, then click the "Delete" button and confirm

## Project Structure

```
Contact-management-app/
├── backend/
│   ├── index.js          # Main server file with API endpoints
│   ├── db.js            # Database setup and connection
│   ├── package.json     # Backend dependencies
│   └── database.sqlite  # SQLite database file (created automatically)
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React application
│   │   ├── App.css      # Custom CSS styles
│   │   └── main.jsx     # React app entry point
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
└── README.md            # This file
```

## API Endpoints

The backend provides these REST API endpoints:

**Authentication endpoints:**
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user and get JWT token

**Contact endpoints (protected):**
- `GET /api/contacts` - Get all contacts for authenticated user
- `POST /api/contacts` - Create a new contact for authenticated user
- `PUT /api/contacts/:id` - Update a contact by ID (user-specific)
- `DELETE /api/contacts/:id` - Delete a contact by ID (user-specific)

## Database Schema

The SQLite database has a `contacts` table with these fields:
- `id` - Auto-incrementing primary key
- `user_id` - User ID (for user-specific contacts)
- `name` - Contact name (required)
- `email` - Email address (optional)
- `phone` - Phone number (optional)
- `created_at` - Timestamp when contact was created

## Troubleshooting

**Backend won't start?**
- Make sure you're in the `backend` folder
- Check if port 5001 is already in use
- Run `npm install` to ensure all dependencies are installed

**Frontend won't start?**
- Make sure you're in the `frontend` folder  
- Check if port 5173 is already in use
- Run `npm install` to ensure all dependencies are installed

**Can't add contacts?**
- Make sure both backend (port 5001) and frontend (port 5173) are running
- Check the browser console for any error messages
- Verify the backend is accessible at `http://localhost:5001/api/contacts`

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

This project is open source and available under the MIT License.
