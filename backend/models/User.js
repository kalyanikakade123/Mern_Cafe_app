const mongoose = require('mongoose');

// destructuring with the help of mongoose
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: 'user',
    },
});

module.exports = mongoose.model('User', UserSchema)