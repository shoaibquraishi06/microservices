const monogoose = require('mongoose');


const connectDB = async () => {

   try{
        await monogoose.connect(process.env.MONGO_URI);

        console.log("Connected to the database successfully");
       

   }catch(error){
       console.error("Error connecting to MongoDB:", error);
       process.exit(1);
   }


}

module.exports = connectDB;