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
      console.error('---------------------------------------------------');
      console.error('If you have special characters in your password (like @, :, /), you MUST URL encode them!');
      console.error('Example: @ -> %40, : -> %3A');
      console.error('---------------------------------------------------');
      process.exit(1);
    });
}

module.exports = connectToDB;