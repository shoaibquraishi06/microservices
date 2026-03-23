const express = require('express');
const contactRoutes = require("./routes/contact.routes")
const cors = require('cors')

const app = express();


app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    
}))


app.use("/api", contactRoutes);


app.get('/', (req, res) => {
    res.status(200).json({
        message: "Contact service is running"
    });
});



module.exports = app;