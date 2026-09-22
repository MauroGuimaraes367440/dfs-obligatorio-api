export const validarParamsMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        message: "Los parámetros enviados no son válidos",
        errores: error.details.map((detalle) => detalle.message)
      });
    }

    req.validatedParams = value;

    next();
  };
};