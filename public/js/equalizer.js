$(document).ready(()=> {

	console.log('eq ready');
	const socket = io();

	const eq = document.getElementById("eq");
	eq.addEventListener("change", () => { //add event listener for when checkbox changes
		socket.emit('eq', Number(this.checked)); //send button status to server (as 1 or 0)
	});
		
	});
