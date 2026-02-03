# Contact Manager

A simple and user-friendly contact management application built with React and Node.js. Store, search, and manage your contacts with an intuitive interface.

## Features

- ✅ Add new contacts with name, email, phone, and address
- ✅ View all contacts in a clean, organized layout
- ✅ Search contacts by name, email, or phone number
- ✅ Edit existing contact information
- ✅ Delete contacts with confirmation
- ✅ Responsive design that works on desktop and mobile
- ✅ Modern, clean user interface

## Technologies Used

- **Frontend**: React, Vite, TailwindCSS, Lucide React (icons)
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
   cd /Users/sravankumarbokka/ideaProjects/contacts-manager
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
2. **Search Contacts**: Use the search bar to find contacts by name, email, or phone
3. **Edit a Contact**: Click the edit icon (pencil) on any contact card
4. **Delete a Contact**: Click the delete icon (trash) and confirm the deletion

## Project Structure

```
contacts-manager/
├── backend/
│   ├── index.js          # Main server file with API endpoints
│   ├── db.js            # Database setup and connection
│   ├── package.json     # Backend dependencies
│   └── database.sqlite  # SQLite database file (created automatically)
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React application
│   │   ├── index.css    # Tailwind CSS styles
│   │   └── main.jsx     # React app entry point
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
└── README.md            # This file
```

## API Endpoints

The backend provides these REST API endpoints:

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact by ID
- `DELETE /api/contacts/:id` - Delete a contact by ID

## Database Schema

The SQLite database has a `contacts` table with these fields:
- `id` - Auto-incrementing primary key
- `name` - Contact name (required)
- `email` - Email address (optional, unique)
- `phone` - Phone number (optional)
- `address` - Physical address (optional)
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
