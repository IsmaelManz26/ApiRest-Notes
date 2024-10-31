export class Note {
  constructor(tipo, contenido, fechaCreacion) {
    this._tipo = tipo;
    this._contenido = contenido;
    this._fechaCreacion = fechaCreacion;
    console.log("Creando nota de tipo " + tipo);
  }

  get tipo() {
    return this._tipo;
  }

  set tipo(tipo) {
    this._tipo = tipo;
  }

  get contenido() {
    return this._contenido;
  }

  set contenido(contenido) {
    this._contenido = contenido;
  }

  get fechaCreacion() {
    return this._fechaCreacion;
  }

  set fechaCreacion(fechaCreacion) {
    this._fechaCreacion = fechaCreacion;
  }

  draw() {}
}
