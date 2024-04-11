// adminAuthMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized to access this resource' });
  }
};
