const express = require("express");
const app = express();
let port = 3000;
const path = require("path");

const productosRouter = require("./routes/productos");
const ventasRoutes = require("./routes/ventasRoutes");
const adminController = require("./controller/adminController");

app.use(express.json());

app.use("/productos", productosRouter);

// app.get('/', (req,res)=>{
//     res.send('Todo funciona correctamente');
// });

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("servidor ejecutandose en el puerto ");
});

//=========================================================================================
// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Configuración de Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Middleware para servir archivos estáticos
// app.use(express.static(path.join(__dirname, "public")));

// // Middleware para servir archivos estáticos de la carpeta Admin
// app.use("/Admin/", express.static(path.join(__dirname, "Admin")));
//========================================================================================

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Admin", "views"));

/* RUTAS ADMIN */
app.get("/Admin/index", adminController.getDashboard);
app.get("/Admin/AbmUsuarios", adminController.getAbmUsuarios);
app.get("/Admin/abmProductos", adminController.getAbmProductos);
app.get("/Admin/listarProductos", adminController.getListarProductos);
app.get("/Admin/listarUsuariosAdm", adminController.getListarUsuarios);
app.get("/Admin/listarVentas", adminController.getListarVentas);
app.delete("/Admin/deleteUser/:userId", adminController.deleteUser);
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

//==============================================================================
// // Ruta para manejar subidas de archivos con Multer
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.send("Archivo subido exitosamente");
// });

// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en el puerto ${PORT}`);
// });
//================================================================================
app.use("/ventas", ventasRoutes);
