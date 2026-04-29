const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const orderRoutes = require("./routes/order.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://nike-jordan-shoe.netlify.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // postman/server calls
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Explicit preflight handler
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Order service is running" });
});

app.use("/api/orders", orderRoutes);

module.exports = app;