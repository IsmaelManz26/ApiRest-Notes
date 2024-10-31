export class NoteHandlerC {
  constructor(url) {
    this._url = url;
    this._lastQueryStatus = null;
  }

  getAllNotes(onSuccesCallBack, onErrorCallBack) {
    fetch(`${this._url}/`).then(
      (datos) => {
        datos.json().then(
          (datos) => {
            this._lastQueryStatus = true;
            onSuccesCallBack(datos.lista);
          },
          (error) => {
            this._lastQueryStatus = false;
            onErrorCallBack("JSONException");
          }
        );
      },
      (error) => {
        this._lastQueryStatus = false;
        onErrorCallBack("ConnectionException");
      }
    );
  }
}
