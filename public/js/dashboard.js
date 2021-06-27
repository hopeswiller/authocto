var socket = io.connect('http://localhost:5050/dashboard')

/* socket.on('connect', function (data) {
    socket.emit('',);
}); */

socket.on('adminConn',(data) => {
    console.log(data)
})

