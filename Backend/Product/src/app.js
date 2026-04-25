const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const productRouter = require('./routes/product.routes');
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Product service is running"
    });
})



app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

module.exports = app;