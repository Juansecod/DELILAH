const errorResponseUser = (res, error) => {
    if(error.message == '404') return res.status(404).json( {
        'msg': false,
        'data': 'No encontrado.'
    });

    if(error.message == '400') return res.status(400).json( {
        'msg': false,
        'data': "Algo ha salido mal, por favor intentelo nuevamente. Revise los campos ingresados dado sea el caso."
    });

    if(error.message == '400M') return res.status(400).json( {
        'msg': false,
        'data': "Ingresa un formato de correo valido."
    });

    if(error.message == '400P') return res.status(400).json( {
        'msg': false,
        'data': "Ingresa una contraseña de minimo 8 caracteres."
    });


    if(error.message == '401') return res.status(401).json({
        'msg': false,
        'data': 'No Autorizado'
    });

    return res.status(400).json({
        'msg': false,
        'data': 'Ups! Algo ha salido mal.'
    });
}

module.exports = errorResponseUser;