const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {

    // 1. Cookie se token
    let token = req.cookies?.token;

    // 2. Agar cookie me nahi hai
    // Authorization header se token lo
    if (!token) {
      const authHeader = req.headers.authorization;

      if (
        authHeader &&
        authHeader.startsWith("Bearer ")
      ) {
        token = authHeader.split(" ")[1];
      }
    }

    // 3. Token nahi mila
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    // 4. Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 5. User attach
    req.user = decoded;

    console.log("✅ AUTH USER:", req.user);

    next();

  } catch (error) {

    console.error(
      "❌ AUTH ERROR:",
      error.message
    );

    return res.status(401).json({
      message: "Unauthorized: Invalid token",
    });
  }
}

module.exports = {
  authMiddleware,
};