const express = require("express");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routes/order.routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://nike-jordan-shoe.netlify.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.options("/*", cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Order service is running"
  });
});

app.use("/api/orders", orderRoutes);

module.exports = app;