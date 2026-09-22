import {
  registerService,
  loginService
} from "../services/auth.services.js";

export const registrarUsuario = async (req, res) => {
  const { username, password } = req.validatedBody;

  const usuario = await registerService(username, password);

  res.status(201).json({
    message: "Usuario registrado correctamente",
    usuario: {
      id: usuario._id,
      username: usuario.username,
      rol: usuario.rol,
      plan: usuario.plan
    }
  });
};

export const loginUsuario = async (req, res) => {
  const { username, password } = req.validatedBody;

  const { usuario, token } = await loginService(username, password);

  res.status(200).json({
    message: "Inicio de sesión correcto",
    usuario: {
      id: usuario._id,
      username: usuario.username,
      rol: usuario.rol,
      plan: usuario.plan
    },
    token
  });
};