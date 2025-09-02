// Import mongoose library
const mongoose = require("mongoose");

// Define a schema for the Gym collection
const gymSchema = mongoose.Schema(
    {
        // User's email (required field)
        email: {
            type: String,
            required: true,
        },

        // Username of the gym owner/user (required)
        userName: {
            type: String,
            required: true,
        },

        // User's password (required)
        password: {
            type: String,
            required: true,
        },

        // URL or path to the user's profile picture (required)
        profilePic: {
            type: String,
            required: true,
        },

        // Name of the gym (required)
        gymName: {
            type: String,
            required: true,
        },

        // Description of the gym (optional)
        description: {
            type: String,
            default: "No description available",
        },

        // Gym functionality/features (optional)
        functionality: {
            type: String,
            default: "Standard gym facilities",
        },

        // Contact number (optional)
        contactNumber: {
            type: String,
            default: "Not provided",
        },

        // Address of the gym (optional)
        address: {
            type: String,
            default: "Not provided",
        },

        // Role of the user: 'gym' or 'user'
        role: {
            type: String,
            enum: ['gym', 'user'],
            default: 'gym',
            required: true,
        },

        // Token for password reset functionality (optional)
        resetPasswordToken: {
            type: String,
        },

        // Expiry time for password reset token (optional)
        resetPasswordExpires: {
            type: Date,
        }
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

// Create a model from the schema
const modal = mongoose.model("gym", gymSchema);

// Export the model so it can be used in other parts of the app
module.exports = modal;
