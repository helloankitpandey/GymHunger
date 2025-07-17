// Import express framework
const express = require('express');
const cookieparser = require('cookie-parser');
require('dotenv').config();
// require cors
const cors = require('cors');

// Create an instance of an Express application
const app = express();

// resolving cors error
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Import database connection (MongoDB connection using Mongoose)
require('./DBConn/conn');

// Define the port where the server will run
const PORT = process.env.PORT;
app.use(cookieparser());
app.use(express.json());


// Define a simple GET route for the root URL ("/")
// This is used to test if the backend is running
// app.get('/', (req, res) => {
//     res.send('Gym Management System backend is running ✅');
// });

const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');

app.use('/auth',GymRoutes);
app.use('/plans',MembershipRoutes);
app.use('/members',MemberRoutes);


// Start the server and listen on the specified port
// Once running, it will log the message in the console
app.listen(PORT, () => {
    console.log(`Server is running on port no : ${PORT}`);
});
