const mongoose = require('mongoose');

function connectToDB() {
  if (!process.env.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in .env');
    process.exit(1);
  }

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB Connected Successfully');
    })
    .catch((error) => {
      console.error('MongoDB Connection Error:', error);
      process.exit(1);
    });
}

module.exports = connectToDB;