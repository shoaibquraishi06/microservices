const jwt = require('jsonwebtoken');



function createAuthMiddleware(roles = ["user"]) {
  return function (req, res, next) {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    // console.log("auth token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}



module.exports = createAuthMiddleware;