const info = {
    //direccion: 'https://localhost:7039/api/Inventario', //[DEV]
    direccion: 'http://192.168.0.36:7070/api/Inventario', //[QA]
    version: '?v=7'
}
let respuesta;
let paginaActual = 1;
let porPagina = 20;
let cantidadPaginas;
let limites;
let botonBuscar = true;
let botonFiltrar = false;

function loguear() {
    $('#spinner-div').show();
    let loguear = {
        nombre: $('#input-usuario').val(),
        clave: $('#input-clave').val(),
    };
    $.ajax({
        url: info.direccion + '/LoguearUsuario',
        type: 'POST',
        data: JSON.stringify(loguear),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            if (data[0].respuesta == 0) {
                window.localStorage.setItem('logueado', false);
                alert('El usuario o la clave son incorrectos.');
            }
            if (data[0].respuesta == 1) {
                window.localStorage.setItem('logueado', true);
                window.location.href = 'inventario.html';
                //$('#contenedor').load('parts/inventario.html' + info.version);
                //alert('Acceso correcto.');
            }
        },
        complete: function () {
            console.log(window.localStorage.getItem('logueado'));
            $('#spinner-div').hide();
        }
    });
}

$( document ).ready(function() {
    console.log(window.localStorage.getItem('logueado'));
    //if (window.localStorage.getItem('logueado') == true) {
        //$('#contenedor').load('parts/inventario.html' + info.version);
    traerFiltrosIniciales();
    /*} else {
        $('#contenedor').load('parts/logueo.html' + info.version);
    }*/
});

function cerrarSesion() {
    $('#spinner-div').show();
    window.localStorage.setItem('logueado', false);
    console.log(window.localStorage.getItem('logueado'));
    window.location.href = 'index.html';
    //$('#contenedor').load('parts/logueo.html' + info.version);
    $('#spinner-div').hide();
}

function verFiltrar() {
    botonFiltrar = true;
    
    $('.seccion-filtrar').show();
    $('#boton-filtrar').show();
    $('#boton-descargar-filtrar').show();
    $('#boton-ver-buscar').show();
    
    $('#seccion-buscar').hide();
    $('#boton-buscar').hide();
    $('#boton-descargar-buscar').hide();
    $('#boton-ver-filtrar').hide();
}

function verBuscar() {
    botonBuscar = true;
    
    $('#seccion-buscar').show();
    $('#boton-buscar').show();
    $('#boton-descargar-buscar').show();
    $('#boton-ver-filtrar').show();
    
    $('.seccion-filtrar').hide();
    $('#boton-filtrar').hide();
    $('#boton-descargar-filtrar').hide();
    $('#boton-ver-buscar').hide();
}

function traerFiltrosIniciales() {
    $('#spinner-div').show();
    $.ajax({
        url: info.direccion + '/ObtenerFiltroOperador',
        type: 'POST',
        data: JSON.stringify(),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            let cadena = '<option value="" selected>Selecciona el operador</option>';
            for (let i = 0; i < data.length; i++) {
                cadena += '<option value="' + data[i].operador + '">' + data[i].operador + '</option>';							
            }
            $('#filtro-operador').html(cadena);
        }
    });
    $.ajax({
        url: info.direccion + '/ObtenerFiltroUsuario',
        type: 'POST',
        data: JSON.stringify(),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            let cadena = '<option value="" selected>Selecciona el usuario</option>';
            for (let i = 0; i < data.length; i++) {
                cadena += '<option value="' + data[i].usuario + '">' + data[i].usuario + '</option>';							
            }
            $('#filtro-usuario').html(cadena);
        }
    });
    $.ajax({
        url: info.direccion + '/ObtenerFiltroSede',
        type: 'POST',
        data: JSON.stringify(),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            let cadena = '<option value="" selected>Selecciona la sede</option>';
            for (let i = 0; i < data.length; i++) {
                cadena += '<option value="' + data[i].sede + '">' + data[i].sede + '</option>';							
            }
            $('#filtro-sede').html(cadena);
        }
    });
    $.ajax({
        url: info.direccion + '/ObtenerFiltroArea',
        type: 'POST',
        data: JSON.stringify(),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            let cadena = '<option value="" selected>Selecciona el área</option>';
            for (let i = 0; i < data.length; i++) {
                cadena += '<option value="' + data[i].area + '">' + data[i].area + '</option>';							
            }
            $('#filtro-area').html(cadena);
        }
    });
    $.ajax({
        url: info.direccion + '/ObtenerFiltroProveedor',
        type: 'POST',
        data: JSON.stringify(),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            let cadena = '<option value="" selected>Selecciona la opción</option>';
            for (let i = 0; i < data.length; i++) {
                cadena += '<option value="' + data[i].proveedor + '">' + data[i].proveedor + '</option>';							
            }
            $('#filtro-proveedor').html(cadena);
        }
    });
    $.ajax({
        url: info.direccion + '/ObtenerFiltroEquipo',
        type: 'POST',
        data: JSON.stringify(),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            let cadena = '<option value="" selected>Selecciona la opción</option>';
            for (let i = 0; i < data.length; i++) {
                cadena += '<option value="' + data[i].equipo + '">' + data[i].equipo + '</option>';							
            }
            $('#filtro-equipo').html(cadena);
        },
        complete: function () {
            $('#spinner-div').hide();
        }
    });
}

function eliminar(i) {
    $('#index-eliminar').val(i);
}

function guardarEliminar() {
    let i = $('#index-eliminar').val();
    let eliminar = {
        id: $('#' + i + '-id').val()
    };

    $.ajax({
        url: info.direccion + '/EliminarRegistro',
        type: 'POST',
        data: JSON.stringify(eliminar),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            console.log(data);				
        },
        complete: function () {
            //alert('Registro eliminado correctamente.');
            $('#boton-cerrar-eliminar').click();
            if (botonBuscar) $('#boton-buscar').click();
            if (botonFiltrar) $('#boton-filtrar').click();
            $('#spinner-div').hide();
        }
    });
}

function buscar() {
    $('#spinner-div').show();
    let busqueda = {
        palabra: $('#input-busqueda').val(),
    };
    $.ajax({
        url: info.direccion + '/BuscarInventario',
        type: 'POST',
        data: JSON.stringify(busqueda),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            respuesta = data;
            paginaActual = 1;
            armarRespuesta();
        },
        complete: function () {
            $('#spinner-div').hide();
        }
    });
}

function filtrar() {
    $('#spinner-div').show();
    let filtro = {
        operador: $('#filtro-operador').val(),
        usuario: $('#filtro-usuario').val(),
        sede: $('#filtro-sede').val(),
        area: $('#filtro-area').val(),
        proveedor: $('#filtro-proveedor').val(),
        equipo: $('#filtro-equipo').val(),
    };
    $.ajax({
        url: info.direccion + '/FiltrarInventario',
        type: 'POST',
        data: JSON.stringify(filtro),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            respuesta = data;
            paginaActual = 1;
            armarRespuesta();
        },
        complete: function () {
            $('#spinner-div').hide();
        }
    });
}

function descargarBuscar() {
    $('#spinner-div').show();
    let busqueda = {
        palabra: $('#input-busqueda').val(),
    };
    $.ajax({
        url: info.direccion + '/DescargarBuscarInventario',
        type: 'POST',
        data: JSON.stringify(busqueda),
        contentType: 'application/json; charset=utf-8',
        dataType: 'binary',
        cache: false,
        xhrFields : {
            'responseType' : 'blob'
        },
        xhr: function () {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 2) {
                    if (xhr.status == 200) {
                        xhr.responseType = "blob";
                    } else {
                        xhr.responseType = "text";
                    }
                }
            };
            return xhr;
        },
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            let fileName = 'ReporteInventario.xlsx'
            let blob = new Blob([data], { type: "application/octetstream" }); 
            let isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                let url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob);
                let a = $("<a />");
                a.attr("download", fileName);
                a.attr("href", link);
                $("body").append(a);
                a[0].click();
                $("body").remove(a);
            }
        },
        complete: function () {
            $('#spinner-div').hide();
        }
    });
}

function descargarFiltrar() {
    $('#spinner-div').show();
    let filtro = {
        operador: $('#filtro-operador').val(),
        usuario: $('#filtro-usuario').val(),
        sede: $('#filtro-sede').val(),
        area: $('#filtro-area').val(),
        proveedor: $('#filtro-proveedor').val(),
        equipo: $('#filtro-equipo').val(),
    };
    $.ajax({
        url: info.direccion + '/DescargarFiltrarInventario',
        type: 'POST',
        data: JSON.stringify(filtro),
        contentType: 'application/json; charset=utf-8',
        dataType: 'binary',
        cache: false,
        xhrFields : {
            'responseType' : 'blob'
        },
        xhr: function () {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 2) {
                    if (xhr.status == 200) {
                        xhr.responseType = "blob";
                    } else {
                        xhr.responseType = "text";
                    }
                }
            };
            return xhr;
        },
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            let fileName = 'ReporteInventario.xlsx'
            let blob = new Blob([data], { type: "application/octetstream" }); 
            let isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                let url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob);
                let a = $("<a />");
                a.attr("download", fileName);
                a.attr("href", link);
                $("body").append(a);
                a[0].click();
                $("body").remove(a);
            }
        },
        complete: function () {
            $('#spinner-div').hide();
        }
    });
}

function armarRespuesta() {			
    let longitud = respuesta.length;
    cantidadPaginas = obtenerCantidadPaginas(longitud, porPagina);
    limites = obtenerLimites(longitud, paginaActual, cantidadPaginas, porPagina);
    
    let cadena;
    if(longitud > 0) {
        cadena = '<div class="table-responsive">' +
            '<table class="table table-striped table-hover table-sm table-bordered">' +
                '<thead>' +
                    '<tr>' +
                        '<th class="color-verde-1"> </th>' +
                        '<th class="color-verde-1">Proveedor</th>' +
                        '<th class="color-verde-1">Operador</th>' +
                        '<th class="color-verde-1">Código empleado</th>' +
                        '<th class="color-verde-1">Usuario</th>' +
                        '<th class="color-verde-1">Ceco</th>' +
                        '<th class="color-verde-1">Línea</th>' +
                        '<th class="color-verde-1">Costo plan sin IGV</th>' +
                        '<th class="color-verde-1">Costo plan con IGV</th>' +
                        '<th class="color-verde-1">Sede</th>' +
                        '<th class="color-verde-1">Área</th>' +
                        '<th class="color-verde-1">Fecha compra inicial</th>' +
                        '<th class="color-verde-1">Fecha último cambio</th>' +
                        '<th class="color-verde-1">Plazo permanencia</th>' +
                        '<th class="color-verde-1">Meses transcurridos</th>' +
                        '<th class="color-verde-1">Meses faltantes</th>' +
                        '<th class="color-verde-1">Código equipo</th>' +
                        '<th class="color-verde-1">Tipo equipo</th>' +
                        '<th class="color-verde-1">Marca</th>' +
                        '<th class="color-verde-1">Modelo</th>' +
                        '<th class="color-verde-1">Equipo</th>' +
                        '<th class="color-verde-1">IMEI</th>' +
                        '<th class="color-verde-1">MAC Address</th>' +
                        '<th class="color-verde-1">Número SIM</th>' +
                        '<th class="color-verde-1">Plan contratado</th>' +
                        '<th class="color-verde-1">Estado equipo</th>' +
                        '<th class="color-verde-1">Renovación por</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>';

        for (let i = limites[0]; i < limites[1]; i++) {
            cadena += '<tr>' +
                '<td class="text-center">' +
                    '<button type="button" class="btn btn-success btn-sm mb-1" onclick="editar(' + i + ')"  data-bs-toggle="modal" data-bs-target="#editar">' +
                        '<i class="bi bi-pencil" aria-hidden="true"></i>' +
                    '</button>' +
                    '<button type="button" class="btn btn-danger btn-sm" onclick="eliminar(' + i + ')"  data-bs-toggle="modal" data-bs-target="#eliminar">' +
                        '<i class="bi bi-trash" aria-hidden="true"></i>' +
                    '</button>' +
                '</td>' +
                '<input id="' + i + '-id" type="hidden" value="'+ respuesta[i].id + '"/>'+
                '<td><div id="' + i + '-proveedor">' + respuesta[i].proveedor + '</div></td>' +
                '<td><div id="' + i + '-operador">' + respuesta[i].operador + '</div></td>' +
                '<td><div id="' + i + '-codigo_empleado">' + respuesta[i].codigo_empleado + '</div></td>' +
                '<td><div id="' + i + '-usuario">' + respuesta[i].usuario + '</div></td>' +
                '<td><div id="' + i + '-ceco">' + respuesta[i].ceco + '</div></td>' +
                '<td><div id="' + i + '-linea">' + respuesta[i].linea + '</div></td>' +
                '<td><div id="' + i + '-costo_plan_sin_igv">' + respuesta[i].costo_plan_sin_igv + '</div></td>' +
                '<td><div id="' + i + '-costo_plan_con_igv">' + respuesta[i].costo_plan_con_igv + '</div></td>' +
                '<td><div id="' + i + '-sede">' + respuesta[i].sede + '</div></td>' +
                '<td><div id="' + i + '-area">' + respuesta[i].area + '</div></td>' +
                '<td><div id="' + i + '-fecha_compra_inicial">' + formatoFechaWeb(respuesta[i].fecha_compra_inicial) + '</div></td>' +
                '<td><div id="' + i + '-fecha_ultimo_cambio">' + formatoFechaWeb(respuesta[i].fecha_ultimo_cambio) + '</div></td>' +
                '<td><div id="' + i + '-plazo_permanencia">' + respuesta[i].plazo_permanencia + '</div></td>' +
                '<td><div id="' + i + '-meses_transcurridos">' + respuesta[i].meses_transcurridos + '</div></td>' +
                '<td><div id="' + i + '-meses_faltantes">' + respuesta[i].meses_faltantes + '</div></td>' +
                '<td><div id="' + i + '-codigo_equipo">' + respuesta[i].codigo_equipo + '</div></td>' +
                '<td><div id="' + i + '-tipo_equipo">' + respuesta[i].tipo_equipo + '</div></td>' +
                '<td><div id="' + i + '-marca">' + respuesta[i].marca + '</div></td>' +
                '<td><div id="' + i + '-modelo">' + respuesta[i].modelo + '</div></td>' +
                '<td><div id="' + i + '-equipo">' + respuesta[i].equipo + '</div></td>' +
                '<td><div id="' + i + '-imei">' + respuesta[i].imei + '</div></td>' +
                '<td><div id="' + i + '-mac_address">' + respuesta[i].mac_address + '</div></td>' +
                '<td><div id="' + i + '-numero_sim">' + respuesta[i].numero_sim + '</div></td>' +
                '<td><div id="' + i + '-plan_contratado">' + respuesta[i].plan_contratado + '</div></td>' +
                '<td><div id="' + i + '-estado_equipo">' + respuesta[i].estado_equipo + '</div></td>' +
                '<td><div id="' + i + '-renovacion_por">' + respuesta[i].renovacion_por + '</div></td>' +
            '</tr>';															
        }
        cadena += '</tbody>' +
            '</table>' +
        '</div>';
    } else {
        cadena = '<div class="table-responsive">' +
            '<table class="table table-striped table-hover table-sm table-bordered">' +
                '<thead>' +
                    '<tr>' +
                        '<th class="text-center color-verde-1">SIN REGISTROS</th>' +
                    '</tr>' +
                '</thead>' +
            '</table>' +
        '</div>';														
    }
    armarPaginacion();
    $('#listado-inventario').html(cadena);
}

function armarPaginacion() {
    let cadena = '<ul class="pagination pagination-sm">';

    /*let limiteInicio = 1;
    if ((porPagina/2) <= limiteInicio) limiteInicio = paginaActual;
    if ((porPagina/2) <= paginaActual) limiteInicio++;
    let limiteFin = limiteInicio + 5;*/

    //for (let i = limiteInicio; i <= limiteFin; i++) {	
    for (let i = 1; i <= cantidadPaginas; i++) {
        if (i <= 40) {
            if (paginaActual == i){			
                cadena += '<li id="pagina-' + i + '" class="page-item active">'+
                    '<span class="page-link fondo-verde-2 borde-verde-2">' + i + '</span>'+
                '</li>';
            } else {
                cadena += '<li id="pagina-' + i + '" class="page-item">'+
                    '<a class="page-link color-gris-3" onclick="navegarPagina(' + i + ')" href="#">' + i + '</a>'+
                '</li>';
            }
        }
    }
    cadena += '</ul>';
    $('#paginacion').html(cadena);
}

function navegarPagina(i) {
    paginaActual = i;
    armarRespuesta();
}

function guardarNuevo() {
    var nuevo = {
        proveedor: $('#input-proveedor-nuevo').val(),
        operador: $('#input-operador-nuevo').val(),
        codigo_empleado: $('#input-codigo_empleado-nuevo').val(),
        usuario: $('#input-usuario-nuevo').val(),
        ceco: $('#input-ceco-nuevo').val(),
        linea: $('#input-linea-nuevo').val(),
        costo_plan_sin_igv: $('#input-costo_plan_sin_igv-nuevo').val(),
        costo_plan_con_igv: $('#input-costo_plan_con_igv-nuevo').val(),
        sede: $('#input-sede-nuevo').val(),
        area: $('#input-area-nuevo').val(),
        fecha_compra_inicial: formatoFechaBD($('#input-fecha_compra_inicial-nuevo').val()),
        fecha_ultimo_cambio: formatoFechaBD($('#input-fecha_ultimo_cambio-nuevo').val()),
        plazo_permanencia: parseInt($('#input-plazo_permanencia-nuevo').val()),
        codigo_equipo: $('#input-codigo_equipo-nuevo').val(),
        tipo_equipo: $('#input-tipo_equipo-nuevo').val(),
        marca: $('#input-marca-nuevo').val(),
        modelo: $('#input-modelo-nuevo').val(),
        equipo: $('#input-equipo-nuevo').val(),
        imei: $('#input-imei-nuevo').val(),
        mac_address: $('#input-mac_address-nuevo').val(),
        numero_sim: $('#input-numero_sim-nuevo').val(),
        plan_contratado: $('#input-plan_contratado-nuevo').val(),
        estado_equipo: $('#input-estado_equipo-nuevo').val(),
        renovacion_por: $('#input-renovacion_por-nuevo').val(),
    };

    if (nuevo.proveedor == '' 
        || nuevo.operador == '') {			
        alert('Es necesario llenar todos los campos.');
    
    } else {
        $.ajax({
            url: info.direccion + '/NuevoRegistro',
            type: 'POST',
            data: JSON.stringify(nuevo),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            error: function (error) {
                console.log(error);
            },
            success: function (data) {
                alert('Registro nuevo realizado correctamente.');
            },
            complete: function () {	
                $('#boton-cerrar-nuevo').click();
                if (botonBuscar) $('#boton-buscar').click();
                if (botonFiltrar) $('#boton-filtrar').click();

                $('#input-proveedor-nuevo').val('');
                $('#input-operador-nuevo').val('');
                $('#input-codigo_empleado-nuevo').val('');
                $('#input-usuario-nuevo').val('');
                $('#input-ceco-nuevo').val('');
                $('#input-linea-nuevo').val('');
                $('#input-costo_plan_sin_igv-nuevo').val('');
                $('#input-costo_plan_con_igv-nuevo').val('');
                $('#input-sede-nuevo').val('');
                $('#input-area-nuevo').val('');
                $('#input-fecha_compra_inicial-nuevo').val('');
                $('#input-fecha_ultimo_cambio-nuevo').val('');
                $('#input-plazo_permanencia-nuevo').val('');
                $('#input-codigo_equipo-nuevo').val('');
                $('#input-tipo_equipo-nuevo').val('');
                $('#input-marca-nuevo').val('');
                $('#input-modelo-nuevo').val('');
                $('#input-equipo-nuevo').val('');
                $('#input-imei-nuevo').val('');
                $('#input-mac_address-nuevo').val('');
                $('#input-numero_sim-nuevo').val('');
                $('#input-plan_contratado-nuevo').val('');
                $('#input-estado_equipo-nuevo').val('');
                $('#input-renovacion_por-nuevo').val('');

                $('#spinner-div').hide();
            }
        });
    }
}

let idEditar;
function editar(i) {
    let dataEditar = {
        proveedor: $('#' + i + '-proveedor').text(),
        operador: $('#' + i + '-operador').text(),
        codigo_empleado: $('#' + i + '-codigo_empleado').text(),
        usuario: $('#' + i + '-usuario').text(),
        ceco: $('#' + i + '-ceco').text(),
        linea: $('#' + i + '-linea').text(),
        costo_plan_sin_igv: $('#' + i + '-costo_plan_sin_igv').text(),
        costo_plan_con_igv: $('#' + i + '-costo_plan_con_igv').text(),
        sede: $('#' + i + '-sede').text(),
        area: $('#' + i + '-area').text(),
        fecha_compra_inicial: $('#' + i + '-fecha_compra_inicial').text(),
        fecha_ultimo_cambio: $('#' + i + '-fecha_ultimo_cambio').text(),
        plazo_permanencia: $('#' + i + '-plazo_permanencia').text(),
        codigo_equipo: $('#' + i + '-codigo_equipo').text(),
        tipo_equipo: $('#' + i + '-tipo_equipo').text(),
        marca: $('#' + i + '-marca').text(),
        modelo: $('#' + i + '-modelo').text(),
        equipo: $('#' + i + '-equipo').text(),
        imei: $('#' + i + '-imei').text(),
        mac_address: $('#' + i + '-mac_address').text(),
        numero_sim: $('#' + i + '-numero_sim').text(),
        plan_contratado: $('#' + i + '-plan_contratado').text(),
        estado_equipo: $('#' + i + '-estado_equipo').text(),
        renovacion_por: $('#' + i + '-renovacion_por').text(),
    };
    //indiceEditar = i;

    idEditar = parseInt($('#' + i + '-id').val());

    //alert(parseInt($('#' + i + '-id').val()));

    $('#input-proveedor-editar').val(dataEditar.proveedor);
    $('#input-operador-editar').val(dataEditar.operador);
    $('#input-codigo_empleado-editar').val(dataEditar.codigo_empleado);
    $('#input-usuario-editar').val(dataEditar.usuario);
    $('#input-ceco-editar').val(dataEditar.ceco);
    $('#input-linea-editar').val(dataEditar.linea);
    $('#input-costo_plan_sin_igv-editar').val(dataEditar.costo_plan_sin_igv);
    $('#input-costo_plan_con_igv-editar').val(dataEditar.costo_plan_con_igv);
    $('#input-sede-editar').val(dataEditar.sede);
    $('#input-area-editar').val(dataEditar.area);
    $('#input-fecha_compra_inicial-editar').val(dataEditar.fecha_compra_inicial);
    $('#input-fecha_ultimo_cambio-editar').val(dataEditar.fecha_ultimo_cambio);
    $('#input-plazo_permanencia-editar').val(dataEditar.plazo_permanencia);
    $('#input-codigo_equipo-editar').val(dataEditar.codigo_equipo);
    $('#input-tipo_equipo-editar').val(dataEditar.tipo_equipo);
    $('#input-marca-editar').val(dataEditar.marca);
    $('#input-modelo-editar').val(dataEditar.modelo);
    $('#input-equipo-editar').val(dataEditar.equipo);
    $('#input-imei-editar').val(dataEditar.imei);
    $('#input-mac_address-editar').val(dataEditar.mac_address);
    $('#input-numero_sim-editar').val(dataEditar.numero_sim);
    $('#input-plan_contratado-editar').val(dataEditar.plan_contratado);
    $('#input-estado_equipo-editar').val(dataEditar.estado_equipo);
    $('#input-renovacion_por-editar').val(dataEditar.renovacion_por);
}

function guardarEditar() {
    var editar = {
        id: idEditar,
        proveedor: $('#input-proveedor-editar').val(),
        operador: $('#input-operador-editar').val(),
        codigo_empleado: $('#input-codigo_empleado-editar').val(),
        usuario: $('#input-usuario-editar').val(),
        ceco: $('#input-ceco-editar').val(),
        linea: $('#input-linea-editar').val(),
        costo_plan_sin_igv: $('#input-costo_plan_sin_igv-editar').val(),
        costo_plan_con_igv: $('#input-costo_plan_con_igv-editar').val(),
        sede: $('#input-sede-editar').val(),
        area: $('#input-area-editar').val(),
        fecha_compra_inicial: formatoFechaBD($('#input-fecha_compra_inicial-editar').val()),
        fecha_ultimo_cambio: formatoFechaBD($('#input-fecha_ultimo_cambio-editar').val()),
        plazo_permanencia: parseInt($('#input-plazo_permanencia-editar').val()),
        codigo_equipo: $('#input-codigo_equipo-editar').val(),
        tipo_equipo: $('#input-tipo_equipo-editar').val(),
        marca: $('#input-marca-editar').val(),
        modelo: $('#input-modelo-editar').val(),
        equipo: $('#input-equipo-editar').val(),
        imei: $('#input-imei-editar').val(),
        mac_address: $('#input-mac_address-editar').val(),
        numero_sim: $('#input-numero_sim-editar').val(),
        plan_contratado: $('#input-plan_contratado-editar').val(),
        estado_equipo: $('#input-estado_equipo-editar').val(),
        renovacion_por: $('#input-renovacion_por-editar').val(),
    };

    if (editar.proveedor == '' 
        || editar.operador == '') {			
        alert('Es necesario llenar todos los campos.');
    
    } else {
        $.ajax({
            url: info.direccion + '/EditarRegistro',
            type: 'POST',
            data: JSON.stringify(editar),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            error: function (error) {
                console.log(error);
            },
            success: function (data) {
                alert('Registro editado realizado correctamente.');
            },
            complete: function () {	
                $('#boton-cerrar-editar').click();
                if (botonBuscar) $('#boton-buscar').click();
                if (botonFiltrar) $('#boton-filtrar').click();

                $('#input-proveedor-editar').val('');
                $('#input-operador-editar').val('');
                $('#input-codigo_empleado-editar').val('');
                $('#input-usuario-editar').val('');
                $('#input-ceco-editar').val('');
                $('#input-linea-editar').val('');
                $('#input-costo_plan_sin_igv-editar').val('');
                $('#input-costo_plan_con_igv-editar').val('');
                $('#input-sede-editar').val('');
                $('#input-area-editar').val('');
                $('#input-fecha_compra_inicial-editar').val('');
                $('#input-fecha_ultimo_cambio-editar').val('');
                $('#input-plazo_permanencia-editar').val('');
                $('#input-codigo_equipo-editar').val('');
                $('#input-tipo_equipo-editar').val('');
                $('#input-marca-editar').val('');
                $('#input-modelo-editar').val('');
                $('#input-equipo-editar').val('');
                $('#input-imei-editar').val('');
                $('#input-mac_address-editar').val('');
                $('#input-numero_sim-editar').val('');
                $('#input-plan_contratado-editar').val('');
                $('#input-estado_equipo-editar').val('');
                $('#input-renovacion_por-editar').val('');

                $('#spinner-div').hide();
            }
        });
    }
}


let uploadedFile;
let fileData=[{}];

$('#uploadFile').on('change', () => {
    uploadedFile = event.target.files[0];
});

$('#subirInventario').on('click', () => {
    XLSX.utils.json_to_sheet(fileData, 'output.xlsx');
    if (uploadedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(uploadedFile);
        fileReader.onload = (event) => {
            let fileData = event.target.result;
            let workbook = XLSX.read(fileData,{type:'binary'});
            workbook.SheetNames.forEach(sheet => {
                let rowData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                for (let i = 0; i < rowData.length; i++) {
                    rowData[i].fecha_compra_inicial = formatoFechaBD(rowData[i].fecha_compra_inicial);
                    rowData[i].fecha_ultimo_cambio = formatoFechaBD(rowData[i].fecha_ultimo_cambio);
                    rowData[i].plazo_permanencia = parseInt(rowData[i].plazo_permanencia);
                }
                let jsonData = JSON.stringify(rowData,undefined,4);
                subir(jsonData);
            });
        }
    }
});

/*document.getElementById('uploadFile').addEventListener('change', (event) => {
    uploadedFile = event.target.files[0];
});

document.getElementById('subirInventario').addEventListener('click', () => {
    XLSX.utils.json_to_sheet(fileData, 'output.xlsx');
    if (uploadedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(uploadedFile);
        fileReader.onload = (event) => {
            let fileData = event.target.result;
            let workbook = XLSX.read(fileData,{type:'binary'});
            workbook.SheetNames.forEach(sheet => {
                let rowData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                for (let i = 0; i < rowData.length; i++) {
                    rowData[i].fecha_compra_inicial = formatoFechaBD(rowData[i].fecha_compra_inicial);
                    rowData[i].fecha_ultimo_cambio = formatoFechaBD(rowData[i].fecha_ultimo_cambio);
                    rowData[i].plazo_permanencia = parseInt(rowData[i].plazo_permanencia);
                }
                let jsonData = JSON.stringify(rowData,undefined,4);
                subir(jsonData);
            });
        }
    }
});*/

function subir(json) {
    $('#spinner-div').show();
    $.ajax({
        url: info.direccion + '/SubirInventario',
        type: 'POST',
        data: json,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (error) {
            console.log(error);
        },
        success: function (data) {
            console.log(data);
        },
        complete: function () {
            alert('Inventario subido correctamente.');
            $('#boton-cerrar-subir').click();
            if (botonBuscar) $('#boton-buscar').click();
            if (botonFiltrar) $('#boton-filtrar').click();
            $('#spinner-div').hide();
        }
    });
}

function obtenerCantidadPaginas(longitud, porPagina) {
    let resultado = longitud / porPagina;
    let cantidadPaginas = Math.ceil(resultado);

    console.log('obtenerCantidadPaginas');
    console.log(cantidadPaginas);
    return cantidadPaginas;
}

function obtenerLimites(longitud, numeroPagina, cantidadPaginas, porPagina) {
    let maximo;
    let modulo = longitud % porPagina;
    let limiteInferior = numeroPagina * porPagina - porPagina;
    let limiteSuperior = numeroPagina * porPagina;
    (modulo == 0)
        ? maximo = cantidadPaginas * porPagina
        : maximo = cantidadPaginas * porPagina - porPagina;
    if (limiteSuperior > maximo && modulo > 0) {
    limiteSuperior = limiteInferior + modulo;
    }
    let resultado = [limiteInferior, limiteSuperior];
    console.log('obtenerLimites');
    console.log(resultado);

    return resultado;
}