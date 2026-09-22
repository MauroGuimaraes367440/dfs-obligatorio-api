import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerService = async (username, password) => {
  const usuarioExistente = await Usuario.findOne({ username });

  if (usuarioExistente) {
    const error = new Error("El usuario ya existe");
    error.status = 409;
    throw error;
  }

  const hashedPassword = bcrypt.hashSync(
    password,
    Number(process.env.ROUND)
  );

  const usuario = new Usuario({
    username,
    password: hashedPassword,
    rol: "usuario",
    plan: "plus"
  });

  try {
    await usuario.save();
  } catch (error) {
    if (error.code === 11000) {
      const errorDuplicado = new Error("El usuario ya existe");
      errorDuplicado.status = 409;
      throw errorDuplicado;
    }

    throw error;
  }

  return usuario;
};

export const loginService = async (username, password) => {
  const usuario = await Usuario.findOne({ username })
    .select("+password");

  if (!usuario) {
    const error = new Error("Credenciales incorrectas");
    error.status = 401;
    throw error;
  }

  const passwordValida = bcrypt.compareSync(
    password,
    usuario.password
  );

  if (!passwordValida) {
    const error = new Error("Credenciales incorrectas");
    error.status = 401;
    throw error;
  }



  const token = jwt.sign(
    { id: usuario._id.toString() },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return { usuario, token };
};