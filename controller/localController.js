const db = require('../db/db');

const obtenerLocales = (req, res) => {
    const query = 'SELECT * FROM locales';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los locales:', err);
            return res.status(500).json({ error: 'Error al obtener los locales' });
        }
        res.status(200).json(results);
    });
};

module.exports = { obtenerLocales };
