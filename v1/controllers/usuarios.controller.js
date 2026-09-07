export const registrarUsuario = (req, res) => {
  res.status(200).json({
    message: "Ruta de registro de usuario"
  });
};

export const loginUsuario = (req, res) => {
  res.status(200).json({
    message: "Ruta de inicio de sesión"
  });
};

export const cambiarPlan = (req, res) => {
  res.status(200).json({
    message: "Ruta de cambio de plan"
  });
};