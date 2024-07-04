const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  path.join(__dirname, "../database.sqlite"),
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Conectado a la base de datos SQLite.");
    }
  }
);

exports.getDashboard = (req, res) => {
  res.render("indexAdmin");
};

exports.getAbmUsuarios = (req, res) => {
  res.render("abmUsuarios");
};

exports.getAbmProductos = (req, res) => {
  res.render("abmProductos");
};

exports.getListarProductos = (req, res) => {
  res.render("listarProductos");
};

exports.getListarUsuarios = (req, res) => {
  const sql = "SELECT * FROM administrador";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error al consultar usuarios:", err);
      res.status(500).send("Error interno del servidor");
      return;
    }
    console.log(rows);
    res.render("listarUsuariosAdm", { usuarios: rows });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;

  const sql = "DELETE FROM administrador WHERE ad_id = ?";
  db.run(sql, userId, function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar el usuario" });
    }
    console.log(`Usuario eliminado con ID: ${userId}`);
    res.json({ message: "Usuario eliminado correctamente" });
  });
};

exports.getListarVentas = (req, res) => {
  res.render("listarVentas");
};
