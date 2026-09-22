import jwt from "jsonwebtoken";

export const authenticateMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No se proporcionó el token"
    });
  }

  const [tipo, token, extra] = authHeader.trim().split(/\s+/);

  if (tipo !== "Bearer" || !token || extra) {
    return res.status(401).json({
      message: "Formato de autorización inválido"
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Token inválido o vencido"
      });
    }

    req.decoded = decoded;

    next();
  });
};