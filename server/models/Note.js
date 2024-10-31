const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  tipo: String,
  contenido: String,
  fechaCreacion: String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
