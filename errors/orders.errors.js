const errorResponseOrder = (res, error) => {
    if(error.message == '204') return res.status(204).json( {
        'msg': false,
        'data': 'No hay ordenes registrados.'
    });

    if(error.message == '404') return res.status(404).json( {
        'msg': false,
        'data': 'No encontrado.'
    });

    if(error.message == '400') return res.status(400).json( {
        'msg': false,
        'data': "Algo ha salido mal, por favor intentelo nuevamente. Revise los campos ingresados dado sea el caso."
    });


    if(error.message == '401') return res.status(401).json({
        "msg": 'No tienes acceso.'
    });

    return res.status(400).json({
        'msg': false,
        'data': 'Ups! Algo ha salido mal.'
    });
}

module.exports = errorResponseOrder;