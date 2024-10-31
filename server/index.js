const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");
var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Para parsear JSON en las solicitudes POST

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/notasdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Conectado a MongoDB");
});

// Endpoint para obtener todas las notas
app.get("/", async (req, res) => {
  try {
    const notas = await Note.find(); // Obtiene las notas de MongoDB
    res.json({ lista: notas });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las notas" });
  }
});

// Endpoint para agregar una nueva nota
app.post("/", async (req, res) => {
  try {
    const nuevaNota = new Note(req.body); // Crea una nueva instancia de nota
    await nuevaNota.save(); // Guarda la nueva nota en MongoDB
    res.status(201).json(nuevaNota);
  } catch (error) {
    res.status(400).json({ message: "Error al guardar la nota" });
  }
});

// Escucha del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// app.get("/", (req, res) => {
//   const mensaje = {
//     lista: [
//       {
//         tipo: "Critica",
//         contenido: "esto es una nota muy buena",
//         fechaCreacion: "26-06-2023",
//       },
//       {
//         tipo: "Normal",
//         contenido: "esto es una nota muy mala",
//         fechaCreacion: "25-12-2023",
//       },
//       {
//         tipo: "Critica",
//         contenido: "esto es una nota muy buena",
//         fechaCreacion: "24-12-2023",
//       },
//     ],
//   };
//   res.send(mensaje);
// });

// // Endpoint para agregar una nueva nota
// app.post("/", (req, res) => {
//   const nuevaNota = req.body;
//   mensaje.lista.push(nuevaNota);
//   res.status(201).json(nuevaNota);
// });
