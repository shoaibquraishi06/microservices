const mongoose = require('mongoose');

async function connectDB(mongoUri) {
   const uri = mongoUri || process.env.MONGO_URI ;
   try {
      await mongoose.connect(uri);
      console.log('Connected MongoDB successfully');
   } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
   }
}

module.exports = connectDB;
