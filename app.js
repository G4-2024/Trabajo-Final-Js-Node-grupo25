const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para servir HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Index.html'));
});

app.get('/registroUsuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registroUsuario.html'));
});

app.get('/registroVendedores', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registroVendedores.html'));
});

// Ruta para manejar subidas de archivos con Multer
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Archivo subido exitosamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
