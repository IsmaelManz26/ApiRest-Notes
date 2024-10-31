# API de Notas con Node.js, Express y MongoDB

Esta API permite gestionar y almacenar notas en MongoDB mediante operaciones CRUD básicas. La aplicación está construida con Node.js y Express, y utiliza MongoDB como base de datos. La API ofrece funcionalidad para crear y obtener notas.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Estructura de Archivos](#estructura-de-archivos)
- [Rutas de la API](#rutas-de-la-api)
  - [GET /](#get-)
  - [POST /](#post-)
- [Esquema de la Nota](#esquema-de-la-nota)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Pruebas](#pruebas)
- [Comentarios en el Código](#comentarios-en-el-código)

## Instalación

1. Clona este repositorio.
   ```bash
   git clone
   ```
2. Instala las dependencias:

   ```bash
   o un npm install y instala todas las dependencias necesarias que hay en package.json
   npm install express
   npm install mongoose
   ```

3. Asegúrate de que MongoDB esté ejecutándose localmente o especifica la URL de tu base de datos en el archivo `index.js`:
   ```javascript
   mongoose.connect("mongodb://127.0.0.1:27017/notasdb", {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   ```
4. Inicia el servidor:
   ```bash
   node index.js
   ```

## Estructura de Archivos

```
.
├── models/
│   └── Note.js      # Modelo Mongoose para las notas
├── index.js         # Servidor principal de Express
└── README.md        # Documentación del proyecto
```

- `index.js`: Define el servidor Express, los endpoints de la API y conecta a MongoDB.
- `models/Note.js`: Contiene el esquema de Mongoose para las notas.

## Rutas de la API

### GET /

- **Descripción**: Devuelve todas las notas almacenadas en la base de datos.
- **URL**: `/`
- **Método**: `GET`
- **Respuesta de ejemplo**:
  ```json
  {
    "lista": [
      {
        "_id": "635e8efc3f4b7e001e347213",
        "tipo": "Critica",
        "contenido": "esto es una nota muy buena",
        "fechaCreacion": "26-06-2023"
      },
      {
        "_id": "635e8efc3f4b7e001e347214",
        "tipo": "Normal",
        "contenido": "esto es una nota muy mala",
        "fechaCreacion": "25-12-2023"
      }
    ]
  }
  ```

### POST /

- **Descripción**: Crea y almacena una nueva nota en la base de datos.
- **URL**: `/`
- **Método**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
    "tipo": "Critica",
    "contenido": "Este es el contenido de una nota",
    "fechaCreacion": "31-10-2024"
  }
  ```
- **Respuesta de ejemplo**:

  ```json
  {
    "_id": "635e8efc3f4b7e001e347213",
    "tipo": "Critica",
    "contenido": "Este es el contenido de una nota",
    "fechaCreacion": "31-10-2024"
  }
  ```

- **Respuestas de error**:
  - `500`: Error del servidor al intentar acceder a la base de datos.
  - `400`: Datos de la solicitud incompletos o incorrectos.

## Esquema de la Nota

Las notas almacenadas en MongoDB siguen el siguiente esquema:

```javascript
{
  tipo: String,          // Tipo de la nota, como 'Crítica' o 'Normal'
  contenido: String,     // Contenido de la nota
  fechaCreacion: String  // Fecha de creación en formato 'dd-mm-aaaa'
}
```

## Ejemplos de Uso

Se puede probar los endpoints de la API mediante Postman o cualquier cliente HTTP.

- **Para crear una nota**:
  - Método `POST` en `http://localhost:3000/`.
  - Cuerpo:
    ```json
    {
      "tipo": "Critica",
      "contenido": "Contenido de ejemplo",
      "fechaCreacion": "2024-10-31"
    }
    ```
- **Para obtener todas las notas**:
  - Método `GET` en `http://localhost:3000/`.

## Pruebas

Se puede utilizar Postman o cualquier otro cliente HTTP para realizar pruebas manuales de los endpoints, yo he usado postman:

1. **GET**: Consulta para ver todas las notas en el sistema.
2. **POST**: Creación de una nueva nota, verificando que se guarda en la base de datos y se retorna correctamente en la respuesta.

## Comentarios en el Código

### index.js

```javascript
// Importación de módulos necesarios
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/Note"); // Importa el modelo Note para interactuar con MongoDB

const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para permitir solicitudes desde el cliente
app.use(express.json()); // Parsea el cuerpo de las solicitudes POST en JSON

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/notasDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Evento de error para manejar posibles fallos de conexión a la base de datos
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Conectado a MongoDB");
});

// Endpoint GET para obtener todas las notas
app.get("/", async (req, res) => {
  try {
    const notas = await Note.find(); // Obtiene todas las notas
    res.json({ lista: notas });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las notas" });
  }
});

// Endpoint POST para crear una nueva nota
app.post("/", async (req, res) => {
  try {
    const nuevaNota = new Note(req.body); // Crea una instancia de la nueva nota
    await nuevaNota.save(); // Guarda la nueva nota en MongoDB
    res.status(201).json(nuevaNota); // Envía la nueva nota en la respuesta
  } catch (error) {
    res.status(400).json({ message: "Error al guardar la nota" });
  }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
```

### models/Note.js

```javascript
// Esquema de la colección de notas para MongoDB
const mongoose = require("mongoose");

// Definición del esquema de la nota
const noteSchema = new mongoose.Schema({
  tipo: String, // Tipo de la nota, como 'Crítica' o 'Normal'
  contenido: String, // Contenido de la nota
  fechaCreacion: String, // Fecha de creación en formato 'dd-mm-aaaa'
});

// Define y exporta el modelo Note basado en el esquema noteSchema
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
```
