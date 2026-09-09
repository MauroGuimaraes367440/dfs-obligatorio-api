export const validarBodyMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const errores = [];

      for (const detalle of error.details) {
        errores.push(detalle.message);
      }

      return res.status(400).json({
        message: "Los datos enviados no son válidos",
        errores: errores
      });
    }

    req.validatedBody = value;

    next();
  };
};