const jwt = require('jsonwebtoken');

const verifiy = (req, res, next) => {
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, 'xyz');
    if (!decodedToken.email) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

module.exports = verifiy