import mongoose from "mongoose";

const postulacionSchema = new mongoose.Schema({
  puesto: {
    type: String,
    required: true,
    trim: true
  },

  empresa: {
    type: String,
    required: true,
    trim: true
  },

  descripcion: {
    type: String,
    required: true,
    trim: true
  },

  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true
  },

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  estado: {
    type: String,
    enum: [
      "guardada",
      "enviada",
      "entrevista",
      "aceptada",
      "rechazada"
    ],
    default: "guardada",
    required: true
  },

  enlace: {
    type: String,
    trim: true
  },

  notas: {
    type: String,
    trim: true
  }

});

const Postulacion = mongoose.model(
  "Postulacion",
  postulacionSchema,
  "postulaciones"
);

export default Postulacion;