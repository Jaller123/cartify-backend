const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get the token from the header
  const token = req.header('x-auth-token');
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID from the token to the request object
    req.user = decoded.userId;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
