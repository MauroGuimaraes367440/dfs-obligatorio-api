import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
    required: true
  },

  plan: {
    type: String,
    enum: ["plus", "premium"],
    default: "plus",
    required: true
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");

export default Usuario;