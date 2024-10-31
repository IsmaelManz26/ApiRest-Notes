import { NoteHandler } from "./modulos/NoteHandler.js";
import { NoteConsumer } from "./modulos/NoteConsumer.js";
import { UI } from "./modulos/UI.js";

// Cargar notas
let notes = null;
NoteHandler.getInstance("http://localhost:3000").getAllNotes((datos) => {
  notes = NoteConsumer.consumNotes(datos);
  UI.drawNotes(notes, document.getElementById("nota"));
});

// Función para filtrar notas por mes
// Window= asocia una función o variable al objeto global en el navegador
window.filterNotesByMonth = function () {
  const month = document.getElementById("monthFilter").value;

  // Filtrar las notas por el mes de `fechaCreacion`
  const filteredNotes = notes.filter((note) => {
    const noteMonth = note.fechaCreacion.split("-")[1]; // Dividimos la fecha con - y cogemos la posicion 1 que es el mes
    return noteMonth === month;
  });

  // Limpiar el div de notas filtradas y mostrar solo las notas filtradas
  const notesFilteredDiv = document.getElementById("notasFiltradas");
  notesFilteredDiv.innerHTML = ""; // Limpiar contenido anterior
  if (filteredNotes.length > 0) {
    notesFilteredDiv.innerHTML = `<h3>Notas del mes seleccionado:</h3>`;
    UI.drawNotes(filteredNotes, notesFilteredDiv); // Mostrar notas filtradas
  } else {
    notesFilteredDiv.innerHTML = "<p>No hay notas para este mes.</p>";
  }
};