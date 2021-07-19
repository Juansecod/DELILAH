const sequelize = require('../config/conexion.js');
const errorResponse = require('../errors/products.errors.js');
const condicionalSQL = (req) => {return ` WHERE idProducto = ${req.params.idProducto}`;}

const registerProduct = async (req, res) => {
    const { codigo, nombre, descripcion, precio } = req.body;
    try{
        const result = await sequelize.query(`INSERT INTO productos(codigoProducto, nombreProducto, descripcion, precio) VALUES('${codigo}', '${nombre}', '${descripcion}', ${precio});`,
        		{ type: sequelize.QueryTypes.INSERT });
        return res.status(201).json({
            'msg': true,
            'data': `El producto: ${nombre}, ha sido registrado exitosamente`
        });
    } catch(error){
        errorResponse(res, error);
    };
}; 

const updateProduct = async (req, res) => {
	const { codigo, nombre, descripcion, precio } = req.body;
	let result = await sequelize.query(`SELECT * FROM productos${condicionalSQL(req)};`,
	        { type: sequelize.QueryTypes.SELECT });
	try{
		if(!result[0]) throw new Error('404');
		let sql = `UPDATE productos SET`;
		let valores = "";
		if (codigo != undefined) valores = valores + ` codigoProducto = '${codigo}'`;
		if (nombre != undefined) valores = valores + `, nombreProducto = '${nombre}'`;
		if (descripcion != undefined) valores = valores + `, descripcion = '${descripcion}'`;
		if (precio != undefined) valores = valores + `, precio = '${precio}'`;
		if (valores[0] == ",") valores = valores.replace(",","");
		const sentenciaSQL = sql + valores + condicionalSQL(req);
		let resultUpdate = await sequelize.query(`${sentenciaSQL};`,
	        { type: sequelize.QueryTypes.UPDATE });
		if(resultUpdate[1] == 0) throw new Error('400');
		return res.status(201).json({
	            'msg': true,
	            'data': `Producto actualizado con exito`
	        });
	}catch(error){
		errorResponse(res,error);
	}
}

const getProduct = async (req, res)=>{
	try {
        const result = await sequelize.query(`SELECT codigoProducto, nombreProducto, descripcion, precio FROM productos 
                            ${condicionalSQL(req)}`, 
                            {type:sequelize.QueryTypes.SELECT});
        if(!result[0]) throw new Error('404');
        return res.status(200).json({
            'msg': true,
            'data': result
        });
    } catch (error) {
        errorResponse(res, error);
    }
}

const getProducts = async (req, res) => {
	try {
        const result = await sequelize.query(`SELECT codigoProducto, nombreProducto, descripcion, precio FROM productos`, 
                            {type:sequelize.QueryTypes.SELECT});
       	if(!result[0]) throw new Error('204');
        return res.status(200).json({
            'msg': true,
            'data': result
        })
    } catch (error) {
        errorResponse(res, error);
    }
}

const deleteProduct = async (req, res) => {
	const { codigo } = req.query
	try {
		const query = await sequelize.query(`SELECT codigoProducto FROM productos ${condicionalSQL(req)};`,
			{ type: sequelize.QueryTypes.SELECT });
		if(!query[0]) throw new Error('404');
		if(query[0].codigoProducto !== codigo) throw new Error('400');
		const result = await sequelize.query(`DELETE FROM productos ${condicionalSQL(req)} and codigoProducto = '${codigo}';`,
			{ type: sequelize.QueryTypes.DELETE });
		return res.status(200).json( {
	        'msg': true,
	        'data': `Producto eliminado con exito`
	    });
    } catch (error) {
        errorResponse(res, error);
    }
}

module.exports = { registerProduct, updateProduct, getProduct, getProducts, deleteProduct };