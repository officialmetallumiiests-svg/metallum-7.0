const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Link to User model
  name: String,
  email: String,
  phone: String,
  college: String,
  branch: String,
  year: String,
  event: { type: String, default: "Steel Quest" },
  teamName: String,
  tshirtSize: { type: String, enum: ['S', 'M', 'L', 'XL', 'XXL'] },
  tshirtName: String,
  paymentStatus: { type: String, enum: ['Pending', 'Verified', 'Failed'], default: 'Pending' },
  transactionId: String,
  amount: Number,
  paymentDate: { type: Date },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  teammates: [{
    name: String,
    phone: String
  }],
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('registration', registrationSchema);
module.exports = Registration;