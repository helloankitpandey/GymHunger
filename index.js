// Import express framework
const express = require('express');

// Create an instance of an Express application
const app = express();

// Import database connection (MongoDB connection using Mongoose)
require('./DBConn/conn');

// Define the port where the server will run
const PORT = 4000;

// Define a simple GET route for the root URL ("/")
// This is used to test if the backend is running
app.get('/', (req, res) => {
    res.send('Gym Management System backend is running ✅');
});

// Start the server and listen on the specified port
// Once running, it will log the message in the console
app.listen(PORT, () => {
    console.log(`Server is running on port no : ${PORT}`);
});
