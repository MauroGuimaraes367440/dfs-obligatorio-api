export const validarQueryMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        message: "Los parámetros de búsqueda no son válidos",
        errores: error.details.map((detalle) => detalle.message)
      });
    }

    req.validatedQuery = value;

    next();
  };
};