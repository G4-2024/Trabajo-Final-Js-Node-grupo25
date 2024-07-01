const db = require('../db/db');


const ObtenerTodosLosProductos = (req,res)=>{
    const sql = 'SELECT * FROM productos';
    db.query(sql,(err,results)=>{
        if(err)
            throw err;
        res.json(results);
    });
};

const ObtenerProductoPorId = (req,res)=>{
    const {id} = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ? '
    
    db.query (sql,[id],(err,result)=>{
        if(err)
            throw err;
        res.json(result);
    });

};

const CrearProducto = (req,res)=>{
    const {titulo,color,precio} = req.body;

    const sql = 'INSERT INTO productos (titulo,color,precio) VALUES (?,?,?)';

    db.query(sql,[titulo,color,precio], (err,result) =>
    {
        if (err) throw err;
        res.json(
            {
                message : "Producto creado on EXITO!!!",
                idProducto : result.insertId
            }
        );

    }

)};

const ActualizarProducto = (req,res)=>{
    const {id} = req.params;
    const {titulo,color,precio} = req.body;

    const sql = 'UPDATE productos SET titulo = ?, color = ?, precio = ? WHERE id = ?'

    db.query(sql, [titulo,color,precio,id], (err,result) =>
    {
        if (err) throw err;
        res.json(
            {
                message : "Usuario editado con EXITO!!!",
            
            }
        )

    } );

};

const BorrarProducto = (req,res)=>{

    const {id} = req.params;

    const sql = 'DELETE FROM productos WHERE id=?';

    db.query(sql, [id], (err,result) =>{
        if (err) throw err;
        res.json(
            {
                message : "Usuario eliminado con EXITO!!!"
            
            }
        )

    } );

};

module.exports={
    ObtenerTodosLosProductos,
    ObtenerProductoPorId,
    CrearProducto,
    ActualizarProducto,
    BorrarProducto

}