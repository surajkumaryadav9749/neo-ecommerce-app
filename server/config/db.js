const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected to server successfully`);
  } catch (error) {
    console.error(`Connecton to database failed...`, error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
