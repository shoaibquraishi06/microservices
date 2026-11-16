const jwt = require('jsonwebtoken');
function createAuthMiddleware(roles = [ "user" ]) {

    return function authMiddleware(req, res, next) {
           console.log("AUTH MIDDLEWARE HIT");

    console.log("COOKIE:", req.cookies);
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[ 1 ];
  
           
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized: No token provided',
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
             console.log("JWT VERIFIED:", decoded);

            if (!roles.includes(decoded.role)) {
                return res.status(403).json({
                    message: 'Forbidden: Insufficient permissions',
                });
            }

            req.user = decoded;
            next();
        }
        catch (err) {
            console.log("JWT ERROR:", err.message);
            
            return res.status(401).json({
                message: 'Unauthorized: Invalid token', error: err.message,
            });
        }

    }

}

module.exports =  { createAuthMiddleware };