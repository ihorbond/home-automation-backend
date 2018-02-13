$(document).ready(()=> {

	console.log('eq ready');
	const socket = io();

	const eq = document.getElementById("eq");
	eq.addEventListener("change", () => { //add event listener for when checkbox changes
		socket.emit('eq', Number(eq.checked)); //send button status to server (as 1 or 0)
	});

	process.on('SIGINT', () => { //on ctrl+c
		EQ.writeSync(0); // Turn EQ off
		EQ.unexport(); // Unexport EQ GPIO to free resources
		process.exit(); //exit completely
	});
	
	});
