require('dotenv').config({degub:true});
const app = require('./src/app');
const connectDB = require('./src/db/db');



connectDB();



app.listen(3008, () => {

 console.log("contact  is running on port 3008");

})