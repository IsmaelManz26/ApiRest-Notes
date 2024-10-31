export const UI = {
  drawNotes: (notes, elementDiv) => {
    notes.forEach((element) => {
      elementDiv.innerHTML += `<p>Tipo: ${element.tipo}<br>Contenido: ${element.contenido}<br>Fecha: ${element.fechaCreacion}</p>`;
    });
  },
};

