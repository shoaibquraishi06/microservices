require('dotenv').config();
require("../Product/src/models/product.model"); 
const connectDB = require('./src/db/db');
const app = require('./src/app');


connectDB();



app.listen(3002, () => {

 console.log("Server is running on port 3002");

})