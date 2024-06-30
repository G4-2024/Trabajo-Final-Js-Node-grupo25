const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para servir archivos estáticos de la carpeta Admin
app.use("/Admin/", express.static(path.join(__dirname, "Admin")));

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Admin", "views"));

/* RUTAS ADMIN */
app.get("/Admin/index", (req, res) => {
  res.render("dashboard/indexAdmin");
});

app.get("/Admin/AbmUsuarios", (req, res) => {
  res.render("dashboard/abmUsuarios");
});

app.get("/Admin/abmProductos", (req, res) => {
  res.render("dashboard/abmProductos");
});

app.get("/Admin/listarProductos", (req, res) => {
  res.render("dashboard/listarProductos");
});

app.get("/Admin/listarUsuarios", (req, res) => {
  res.render("dashboard/listarUsuarios");
});

app.get("/Admin/listarVentas", (req, res) => {
  res.render("dashboard/listarVentas");
});
/* ********** */

// Rutas para servir HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Index.html"));
});

app.get("/registroUsuario", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "registroUsuario.html"));
});

app.get("/registroVendedores", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "registroVendedores.html"));
});

// Ruta para manejar subidas de archivos con Multer
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("Archivo subido exitosamente");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
