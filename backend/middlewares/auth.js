// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token)
//     return res.status(401).json({ msg: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // includes id and role
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// };


// module.exports = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

//   const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : authHeader;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// };


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('🚀 Received Authorization header:', authHeader); // ✅ Log

  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded JWT:', decoded); // ✅ Log
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ JWT Verification Failed:', err.message); // ✅ Log
    res.status(401).json({ msg: 'Invalid token' });
  }
};

