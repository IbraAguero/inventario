import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'No autorizado' });
    req.user = decoded.UserInfo.name;
    req.userId = decoded.UserInfo.id;
    req.rol = decoded.UserInfo.rol;
    next();
  });
};

export default verifyJWT;
