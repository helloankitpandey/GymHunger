// Import mongoose library
const mongoose = require("mongoose");

// Define a schema for the Membership collection
const MembershipSchema = mongoose.Schema(
    {
        // Number of months for this membership plan (required)
        months: {
            type: Number,
            required: true,
        },

        // Price for the membership plan in currency units (required)
        price: {
            type: Number,
            required: true,
        },

        // Reference to the gym this membership belongs to (foreign key)
        gym: {
            type: mongoose.Schema.Types.ObjectId, // Stores ObjectId of the gym document
            ref: "gym",                           // References 'gym' collection
            required: true,
        }
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

// Create a model from the schema for the 'membership' collection
const modalMembership = mongoose.model("membership", MembershipSchema);

// Export the model so it can be used in other parts of the app
module.exports = modalMembership;
