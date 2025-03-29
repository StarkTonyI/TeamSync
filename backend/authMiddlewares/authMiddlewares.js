const jwt = require("jsonwebtoken");
// Middleware проверки авторизации
require('dotenv').config();
const accessTokenSecret = process.env.JWT_SECRET;

const auth = async(req, res, next) => {
  const token = req.user;
  if (!token) return res.status(401).json({ message: "Нет токена" });
  
  try {
    req.user = token;
    next();
  } catch (err) {
    res.status(403).json({ message: "Неверный токен" });
  }
};

// Middleware для проверки ролей
const checkRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: "Нет доступа" });
}
  next();
};

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Нет доступа" });

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Токен недействителен" });
      req.user = decoded; // Данные юзера из токена
      next();
  });
};


module.exports = { auth, checkRole, authMiddleware };
