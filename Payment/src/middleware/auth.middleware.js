const jwt = require('jsonwebtoken');



function createAuthMiddleware(roles = [ "user" ]) {

    return function authMiddleware(req, res, next) {
          console.log("AUTH MIDDLEWARE HIT");
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[ 1 ];
   console.log("AUTH MIDDLEWARE HIT:", token);
    console.log("REQ TOKEN:", req.token);
      

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized: No token provided',
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (!roles.includes(decoded.role)) {
                return res.status(403).json({
                    message: 'Forbidden: Insufficient permissions',
                });
            }

            req.user = decoded;
            console.log(req.token);
            
            
            next();
        }
        catch (err) {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token',
            });
        }

    }

}


module.exports = createAuthMiddleware;