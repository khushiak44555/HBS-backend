const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String },
    gender: { type: String },
    age: { type: Number },
    bloodGroup: { type: String },
    mobileNumber: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
