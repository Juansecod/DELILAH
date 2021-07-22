const sequelize = require('../config/conexion.js');
const errorResponse = require('../errors/users.errors.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const condicionalSQL = (req) => {return ` WHERE idUsuario = ${req.decoded.idUsuario}`;}

const signupUser = async (req, res) => {
    const { nombreUsuario, nombreCompleto, correo, telefono, direccion} = req.body;
    var { contrasena } = req.body;
    try {
    	const correoSplit1 = correo.split('@')[1];
    	const correoSplit2 = correoSplit.split('.')[1];
    	if(!correoSplit1 || !correoSplit2) throw new Error ('400M');
    	if(contrasena.length < 8) throw new Error('400P');
    	contrasena = await bcrypt.hashSync(contrasena, 10);
        const resultInsertUser = await sequelize.query(`INSERT INTO usuarios(nombreUsuario, nombreCompleto, correo, telefono, direccion, contrasena, idRol)  
        	VALUES('${nombreUsuario}', '${nombreCompleto}', '${correo}', '${telefono}', '${direccion}', '${contrasena}', 2);`,
        	{ type: sequelize.QueryTypes.INSERT });

        return res.status(201).json({
            'msg': true,
            'data': `Registrado usuario: ${nombreUsuario} con exito`
        })

    } catch (error) {
        errorResponse(res,error);
    }
};

const loginUser = async (req, res) => {    
    const { usuario_mail, contrasena} = req.body;    
    try {    
        const result = await sequelize.query(`select idUsuario, idRol, nombreCompleto, contrasena from usuarios u 
                            where (correo = '${usuario_mail}' or nombreUsuario = '${usuario_mail}') 
                             limit 1;`,
                            { type: sequelize.QueryTypes.SELECT });
        if (result == '') throw new Error('404');
    	const token = await bcrypt.compare(contrasena, result[0].contrasena).then((authorization) => {
			if(authorization){
				const jwtToken = jwt.sign({'idUsuario': result[0].idUsuario, 'idRol':result[0].idRol}, 
                                    process.env.KEY_TOKEN, { expiresIn: process.env.EXPIRES });
        		return jwtToken;
			}else{
				throw new Error('400');
			}
		});
		return res.status(200).json( {
	        'msg': true,
	        'data': `Bienvenido ${result[0].nombreCompleto}`,
	        'token': token
	    });
    } catch (error) {
        errorResponse(res, error);
    }    
};

const getUser = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT nombreUsuario, nombreCompleto, correo, telefono, direccion FROM usuarios 
                            ${condicionalSQL(req)}`, 
                            {type:sequelize.QueryTypes.SELECT});
        return res.status(200).json({
            'msg': true,
            'data':result
        })
    } catch (error) {
        errorResponse(res, error);
    }
};

const updateUser = async (req, res) => {
	const { nombreCompleto, correo, telefono, direccion} = req.body;
	try{		
		let sql = `UPDATE usuarios SET`;
		let valores = "";
		if (nombreCompleto != undefined) valores = valores + ` nombreCompleto = '${nombreCompleto}'`;
		if (correo != undefined) valores = valores + `, correo = '${correo}'`;
		if (telefono != undefined) valores = valores + `, telefono = '${telefono}'`;
		if (direccion != undefined) valores = valores + `, direccion = '${direccion}'`;
		if (valores[0] == ",") valores = valores.replace(",","");
		
		const sentenciaSQL = sql + valores + condicionalSQL(req);

		let resultUpdate = await sequelize.query(`${sentenciaSQL};`,
	        { type: sequelize.QueryTypes.UPDATE });

		if(resultUpdate[1] == 0) throw new Error('400');
		
		return res.status(201).json({
	            'msg': true,
	            'data': `Usuario actualizado con exito`
	        });
	}catch(error){
		errorResponse(res, error);
	}
}

const updatePassword = async (req, res) => {
	try { 
		const { idUsuario } = req.decoded;
		const { claveDinamica } = req.body;
		let { nuevaContrasena } = req.body;
        const result = await sequelize.query(`SELECT contrasena FROM usuarios WHERE idUsuario = ${idUsuario};`,
                            { type: sequelize.QueryTypes.SELECT });
        if (result == '') throw new Error('404');
    	response = await bcrypt.compare(nuevaContrasena, result[0].contrasena).then(async(authorization)=>{
    		if(authorization) return '400'
    		nuevaContrasena = await bcrypt.hashSync(nuevaContrasena, 10);
    		if(typeof(claveDinamica) == 'number'){
				const resultUpdate = await sequelize.query(`UPDATE usuarios SET contrasena = '${nuevaContrasena}' 
					WHERE idUsuario = ${idUsuario}`, { type: sequelize.QueryTypes.UPDATE });
				return 'ok'
			}else{
				return '400';
			}
    	});	
		if(response == 'ok') return res.status(200).json( {
	        'msg': true,
	        'data': `Se ha actualizado exitosamente la contraseña`,
	    });
		throw new Error(response);
    } catch (error) {
        errorResponse(res, error);
    }
}

const deleteUser = async(req, res) =>{
	const contrasena = req.headers['contrasena'];
	try {
        const result = await sequelize.query(`SELECT contrasena FROM usuarios 
                            ${condicionalSQL(req)}`, 
                            { type: sequelize.QueryTypes.SELECT });
        const resultDelete = await bcrypt.compare(contrasena, result[0].contrasena).then(async(authorization) => {
        	if(authorization){
				const result = await sequelize.query(`DELETE FROM usuarios ${condicionalSQL(req)}`,
					{ type: sequelize.QueryTypes.DELETE });
			}else{
				throw new Error('400');
			}
		});
		return res.status(200).json( {
	        'msg': true,
	        'data': `Usuario eliminado con exito`
	    });
    } catch (error) {
        errorResponse(res, error);
    }
};

const updateRol = async(req, res) => {
	const {idUsuario} = req.params;
	const {idRol} = req.query;
	try{
		const resultUpdate = await sequelize.query(`UPDATE usuarios SET idRol = ${idRol} WHERE idUsuario = ${idUsuario}`, 
			{ type: sequelize.QueryTypes.UPDATE});
		if(resultUpdate[1] == 0) throw new Error('400');
		return res.status(201).json({
	            'msg': true,
	            'data': `Usuario actualizado con exito`
	        });
	}catch(error){
		errorResponse(res, error);
	}
}

const getUsers = async (req,res) => {
	try {
	    const result = await sequelize.query('SELECT nombreUsuario, nombreCompleto, correo, telefono, direccion FROM usuarios', 
	    	{type:sequelize.QueryTypes.SELECT});
	    return res.status(200).json({
	        'msg': true,
	        'data': result
	    });
	} catch (error) {
	    errorResponse(res, error);
	}
}

module.exports = { signupUser, loginUser, getUser, updateUser, updatePassword, deleteUser, updateRol, getUsers };