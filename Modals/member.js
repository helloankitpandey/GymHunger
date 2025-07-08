// Import mongoose library
const mongoose = require("mongoose");

// Define a schema for the Member collection
const memberSchema = mongoose.Schema(
    {
        // Member's full name (required field)
        name: {
            type: String,
            required: true,
        },

        // Member's mobile number (required)
        mobileNo: {
            type: String,
            required: true,
        },

        // Member's address (required)
        address: {
            type: String,
            required: true,
        },

        // Reference to the membership plan (foreign key)
        membership: {
            type: mongoose.Schema.Types.ObjectId, // Stores ObjectId of the membership document
            ref: 'membership',                    // References 'membership' collection
            required: true,
        },

        // Reference to the gym this member belongs to (foreign key)
        gym: {
            type: mongoose.Schema.Types.ObjectId, // Stores ObjectId of the gym document
            ref: 'gym',                           // References 'gym' collection
            required: true,
        },

        // URL or path to the member's profile picture (required)
        profilePic: {
            type: String,
            required: true,
        },

        // Membership status: Active (default) or Inactive
        status: {
            type: String,
            default: "Active",
        },

        // Date of last payment (defaults to current date)
        lastPayment: {
            type: Date,
            default: new Date(),
        },

        // Date when the next bill is due (required)
        nextBillDate: {
            type: Date,
            required: true,
        }
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

// Create a model from the schema for the 'member' collection
const memberModel = mongoose.model("member", memberSchema);

// Export the model so it can be used in other parts of the app
module.exports = memberModel;
