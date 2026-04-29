const express = require("express");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routes/order.routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://nike-jordan-shoe.netlify.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // IMPORTANT

app.get("/", (req, res) => {
  res.json({ message: "Order service is running" });
});

app.use("/api/orders", orderRoutes);

module.exports = app;