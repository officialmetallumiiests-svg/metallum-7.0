const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  photoURL: String,
  role: { type: String, default: 'user' } // 'admin' or 'user'
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

