var socket = io();


$('.info').submit(() => {
	socket.emit('newUser', {
		name: $('.nameField').val().trim(),
	});
});

socket.on('chat', (data) => {
	$('.card-text').append(`${data.name}:hello`)
})