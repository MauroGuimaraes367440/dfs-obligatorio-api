export const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;

  if (status >= 500) {
    console.error(err);
  }

  const message = status >= 500
    ? "Error interno del servidor"
    : err.message;

  const details = status >= 500
    ? null
    : (err.details || null);

  res.status(status).json({ message, details });
};