const db = require('../db/db');

const crearVenta = (req, res) => {
    const { productos, total } = req.body;
    let totalNumerico = parseFloat(total);

    // Verificar si total es un número válido
    if (isNaN(totalNumerico)) {
        console.error('El total no es un número válido:', total);
        return res.status(400).json({ error: 'El total no es un número válido' });
    }

    const query = 'INSERT INTO ventas (productos, total) VALUES (?, ?)';

    db.query(query, [JSON.stringify(productos), totalNumerico], (err, results) => {
        if (err) {
            console.error('Error al insertar la venta:', err);
            return res.status(500).json({ error: 'Error al registrar la venta' });
        }
        res.status(201).json({ message: 'Venta registrada exitosamente' });
    });
};

// Función para obtener todas las ventas
const obtenerVentas = (req, res) => {
    const query = 'SELECT * FROM ventas';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las ventas:', err);
            return res.status(500).json({ error: 'Error al obtener las ventas' });
        }
        res.status(200).json(results);
    });
};
module.exports = { crearVenta, obtenerVentas };
