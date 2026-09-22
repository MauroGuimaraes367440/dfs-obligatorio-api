import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  }
});

const Categoria = mongoose.model(
  "Categoria",
  categoriaSchema,
  "categorias"
);

export default Categoria;