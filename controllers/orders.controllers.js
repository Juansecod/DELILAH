const sequelize = require('../config/conexion.js');
const errorResponse = require('../errors/orders.errors.js');

const createOrder = async (req, res) => {
    const { idMetodoPago, productos } = req.body;
    const { idUsuario } = req.decoded;

    let preciosProductos = '';
    var valorTotal = 0;
    try {
        const resultInsertPedido = await sequelize.query(`INSERT INTO pedidos(idUsuario, idMetodoPago, idEstado,valorTotal) 
            VALUES (${idUsuario}, ${idMetodoPago}, 1, ${valorTotal})`,
            { type: sequelize.QueryTypes.INSERT });

        productos.forEach(async(producto)=>{
            try {
                const productoBD = await sequelize.query(`SELECT precio FROM productos 
                    WHERE idProducto = ${producto.idProducto}`,
                    { type: sequelize.QueryTypes.SELECT });

              	const resultInsertEncargo = await sequelize.query(`INSERT INTO encargos(idPedido, idProducto, cantidad) 
              		VALUES(${resultInsertPedido[0]}, ${producto.idProducto}, ${producto.cantidad})`);

                valorTotal = valorTotal + (parseInt(productoBD[0].precio) * parseInt(producto.cantidad));

                const insertAllPrice = await sequelize.query(`UPDATE pedidos SET valorTotal = ${valorTotal}
            		WHERE idPedido = ${resultInsertPedido[0]}`,
            			{ type: sequelize.QueryTypes.UPDATE });

            } catch (error) {              
                errorResponse(res, error);
            }
        });
        return res.status(201).json({
            "msg": true,
            "data": `¡Recibimos tu pedido!, se generó con la orden ${resultInsertPedido[0]}, puedes seguir tu pedido para saber el estado en que se encuentra`
        })
    } catch (error) {
        errorResponse(res, error);
    }   
};

const getOrders = async (req, res) => {
    if(req.decoded.idRol == 1) {
        try {
            const result = await sequelize.query(`SELECT DISTINCT pe.idPedido, pe.fechaPedido, pe.valorTotal, u.nombreCompleto, u.direccion, es.nombreEstado, en.cantidad, pr.nombreProducto, pr.codigoProducto, mp.nombreMetodo 
				from pedidos pe left join usuarios u using (idUsuario) left join estados es using (idEstado) left join metodospago mp using (idMetodoPago) inner join encargos en on pe.idPedido = en.idPedido left join productos pr using(idProducto);`,
                {type:sequelize.QueryTypes.SELECT});
        
            res.status(200).json({
                "msg": true,
                "data": result
            })
        } catch (error) {
            errorResponse(res, error);
        }
    }else {
        try {
            const result = await sequelize.query(`SELECT DISTINCT pe.idPedido, pe.fechaPedido, pe.valorTotal, u.nombreCompleto, u.direccion, es.nombreEstado, en.cantidad, pr.nombreProducto, pr.codigoProducto, mp.nombreMetodo 
				from pedidos pe left join usuarios u using (idUsuario) left join estados es using (idEstado)
				left join metodospago mp using (idMetodoPago)
				inner join encargos en on pe.idPedido = en.idPedido left join productos pr using(idProducto)
				where u.idUsuario = ${req.decoded.idUsuario};`,
                {type:sequelize.QueryTypes.SELECT});
        
            res.status(200).json({
                "msg": true,
                "data": result
            })
        } catch (error) {
            errorResponse(res, error);
        }
    }
}

const getOrdersById = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT DISTINCT pe.idPedido, pe.fechaPedido, pe.valorTotal, u.nombreCompleto, u.direccion, es.nombreEstado, en.cantidad, pr.nombreProducto, pr.codigoProducto, mp.nombreMetodo 
				from pedidos pe left join usuarios u using (idUsuario) left join estados es using (idEstado)
				left join metodospago mp using (idMetodoPago)
				inner join encargos en on pe.idPedido = en.idPedido left join productos pr using(idProducto)
				where pe.idPedido = ${req.params.idPedido};`,
	            {type:sequelize.QueryTypes.SELECT});
        if(result.length == 0) throw new Error('404');
        return res.status(200).json({
            "msg": true,
            "data": result
        });
    } catch (error) {
        errorResponse(res, error);
    }
}

const getOrdersByIdClient = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT DISTINCT pe.idPedido, pe.fechaPedido, pe.valorTotal, u.nombreCompleto, u.direccion, es.nombreEstado, en.cantidad, pr.nombreProducto, pr.codigoProducto, mp.nombreMetodo 
				from pedidos pe left join usuarios u using (idUsuario) left join estados es using (idEstado)
				left join metodospago mp using (idMetodoPago)
				inner join encargos en on pe.idPedido = en.idPedido left join productos pr using(idProducto)
				where pe.idPedido = ${req.params.idPedido}
                and u.idUsuario = ${req.decoded.idUsuario};`,
                {type:sequelize.QueryTypes.SELECT});
                
        if(result.length == 0) throw new Error('404');   
        return res.status(200).json({
        	"msg": true,
            "data": result
        });
    } catch (error) {
        errorResponse(res, error);
    }
}

const updateOrder = async (req, res) => {
    const { idEstado } =  req.body;
    try {
        const resultUpdate = await sequelize.query(`UPDATE pedidos SET idEstado = ${idEstado} WHERE idPedido = ${req.params.idPedido};`,
                { type: sequelize.QueryTypes.UPDATE });
        if (resultUpdate[1] == 0) throw new Error('400');
        return res.status(201).json({
            "msg": true,
            "data": "Estado de la orden actualizado correctamente"
        });
    } catch (error) {

        errorResponse(res, error);
    }
}

const cancelOrder = async(req,res) =>{
	try {
        const resultUpdate = await sequelize.query(`UPDATE pedidos SET idEstado = 5 WHERE idPedido = ${req.params.idPedido} and idUsuario = ${req.decoded.idUsuario};`,
                { type: sequelize.QueryTypes.UPDATE });
        if (resultUpdate[1] == 0) throw new Error('400');
        return res.status(201).json({
            "msg": true,
            "data": "Pedido cancelado exitosamente"
        });
    } catch (error) {
        errorResponse(res, error);
    }
}
	

module.exports = { createOrder, getOrders, getOrdersById, getOrdersByIdClient, updateOrder, cancelOrder };