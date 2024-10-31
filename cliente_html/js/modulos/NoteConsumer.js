import { Note } from "./Note.js";

export class NoteConsumer {
  static consumNotes(datos) {
    console.log("Datos a consumir en notas:", datos);
    let notes = [];
    datos.forEach((element) => {
      notes.push(
        new Note(element.tipo, element.contenido, element.fechaCreacion)
      );
    });
    return notes;
  }
}
