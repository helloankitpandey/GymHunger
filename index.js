// Import express framework
const express = require('express');
const cookieparser = require('cookie-parser');
require('dotenv').config();
// require cors
const cors = require('cors');

// Create an instance of an Express application
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed for this origin: ' + origin), false);
    }
  },
  credentials: true
}));

// Import database connection (MongoDB connection using Mongoose)
require('./DBConn/conn');

// Define the port where the server will run
const PORT = process.env.PORT || 4000;

app.use(cookieparser());
app.use(express.json());

const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');

app.use('/auth', GymRoutes);
app.use('/plans', MembershipRoutes);
app.use('/members', MemberRoutes);

// Start the server and listen on the specified port
// Once running, it will log the message in the console
app.listen(PORT, () => {
    console.log(`Server is running on port no : ${PORT}`);
});
