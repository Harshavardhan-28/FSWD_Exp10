# Car Showroom Web Application

A full-stack web application where users can list their cars for sale and browse vehicles posted by others. Built with React for the frontend and Node.js/Express for the backend, with MongoDB as the database.

![Car Showroom](src/assets/TG_DSC0155.jpg)

## Features

- **User Authentication**: Sign up, login, and session management
- **Car Listings**: Users can post their vehicle information and images
- **My Inventory**: Manage your own car listings
- **Favorites**: Save and browse cars you're interested in
- **Responsive Design**: Works on mobile, tablet and desktop devices
- **Real-time Server Status**: Automatic detection of server connection issues

## Tech Stack

### Frontend

- React 19
- React Router v7
- React Bootstrap
- Context API for state management
- Bootstrap 5 for styling

### Backend

- Node.js
- Express
- MongoDB
- Express-Session for authentication
- Bcrypt for password encryption

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

#### Clone the repository

```bash
git clone <repository-url>
cd car-showroom
```

#### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/car-showroom
SESSION_SECRET=your_secret_key_here
```

4. Start the backend server:

```bash
npm start
```

The server will run on http://localhost:5000

#### Frontend Setup

1. Navigate back to the root directory:

```bash
cd ..
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

The application will open in your browser at http://localhost:3000

## Project Structure

```
├── backend/                  # Backend Node.js/Express server
│   ├── controllers/          # Request controllers
│   ├── middleware/           # Express middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   └── server.js             # Entry point
└── src/                      # Frontend React application
    ├── assets/               # Images and static assets
    ├── components/           # Reusable React components
    ├── contexts/             # React context for state management
    ├── pages/                # Page components
    └── styles/               # CSS and style files
```

## Usage

1. Register a new account or log in with existing credentials
2. Browse car listings on the main page
3. Add cars to your favorites by clicking on the heart icon
4. Manage your car inventory through "My Inventory" page
5. Add new car listings with details and images

## Authentication Flow

- The application uses session-based authentication
- When the server is restarted, users are automatically logged out for security
- The navbar displays the username when logged in and login/signup options when logged out

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Car images and data used for demonstration purposes only
- Bootstrap Icons for the UI elements
- Create React App for the initial project setup

