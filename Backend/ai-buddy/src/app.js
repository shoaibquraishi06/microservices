const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')




const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nike-4.netlify.app"
  ],
  credentials: true
}));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "AI service is running"
    });
});



module.exports = app;