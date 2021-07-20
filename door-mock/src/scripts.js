const server = "http://localhost:8080";

let socket;
let isConnected = false;

connect();

function connect() {
	socket = io(server);
	socket.emit("doorConnect");
	isConnected = true;
	updateConnectionButtons();
}

function disconnect() {
	socket.disconnect();
	isConnected = false;
	updateConnectionButtons();
}

function updateConnectionButtons() {
	document.getElementById("connect-btn").disabled = isConnected;
	document.getElementById("disconnect-btn").disabled = !isConnected;
}

function fetchUpdateTime() {
	fetch(`${server}/api/updateDelta`, { mode: "no-cors" }).then((returnData) => {
		document.getElementById("updateTime").innerText = returnData.ok ? returnData.body : "failed";
	});
}
