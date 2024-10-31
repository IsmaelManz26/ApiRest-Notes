import { NoteHandlerC } from "./NoteHandlerC.js";

export const NoteHandler = {
  noteHandler: null,
  getInstance: (url) => {
    if (NoteHandler.noteHandler === null) {
      NoteHandler.noteHandler = new NoteHandlerC(url);
    }
    return NoteHandler.noteHandler;
  },
};
