const formatoFechaBD = (fecha) => {
    var resultado = fecha.split('/');
    return resultado[2] + '-' + resultado[1]  + '-' + resultado[0];
}

const formatoFechaWeb = (fecha) => {
    var arreglo = fecha.split('T');
    var resultado = arreglo[0].split('-');
    return resultado[2] + '/' + resultado[1]  + '/' + resultado[0];
}