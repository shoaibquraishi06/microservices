
const jwt = require("jsonwebtoken");

function createAuthMiddleware(roles = ["seller"]) {
  return function authMiddleware(req, res, next) {

    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided"
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Forbidden: Insufficient permissions"
        });
      }

      req.user = decoded;
      next();

    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
        error: error.message
      });
    }
  };
}

module.exports = createAuthMiddleware;
