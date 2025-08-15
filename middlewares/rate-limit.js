
// Crear middleware (middlewares/rate-limit.js)
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos por IP para auth
  message: {
    ok: false,
    msg: 'Demasiados intentos de login, intenta de nuevo en 15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skipear IPs de confianza si es necesario
  skip: (req) => {
    // return req.ip === 'your-trusted-ip';
    return false;
  }
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por 15 minutos para otras rutas
  message: {
    ok: false,
    msg: 'Demasiadas peticiones, intenta más tarde'
  }
});

module.exports = { authLimiter, generalLimiter };
