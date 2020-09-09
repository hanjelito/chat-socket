var socket = io();
//
var params = new URLSearchParams(window.location.search);
console.log(params.has('nombre'));
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });
});
//escucha
socket.on('disconnect', function() {
    console.log('Conexion fallida')
});
socket.on('enviarMensaje', (message) => {
    console.log(message);
});
//emite
socket.emit('enviarMensaje', {
    usuario: 'Angel',
    mensaje: 'Hola mundo'
}, function(resp) {
    console.log('Respuesta Servidor', resp);
});

socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

socket.on('listaPersona', function(personas) {
    console.log(personas);
});

socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado: ', mensaje)
})