const server = "http://localhost:8080";

let socket;
let isConnected = false;

const eventLogs = [{ channel: "channelOne" }, { channel: "channelTwo" }];

connect();

function connect() {
	socket = io(server);
	socket.emit("doorConnect");
	isConnected = true;
	registerSocketEvents();
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
	fetch(`${server}/api/nextMove`, { mode: "no-cors" }).then((returnData) => {
		document.getElementById("updateTime").innerText = returnData.ok ? returnData.body : "failed";
	});
}

function registerSocketEvents() {
	eventLogs.forEach((eventLog) => {
		if (!eventLog.logContainer) {
			const channelContainer = document.createElement("div");
			channelContainer.id = eventLog.channel;
			document.getElementById("channels").appendChild(channelContainer);
			eventLog.logContainer = channelContainer;
		}

		socket.on(eventLog.channel, () => {
			const logObj = document.createElement("div");
			logObj.innerText = `Event received on channel "${eventLog.channel}"`;
			eventLog.logContainer.appendChild(logObj);
		});
	});
}

function emitDoorState(event) {
	event.preventDefault();

	const formData = {};
	let form = document.getElementById("doorData");

	Object.keys(form.children).forEach((childKey) => {
		const child = form.children[childKey];
		if (child.hasAttribute("name")) {
			formData[child.getAttribute("name")] = child.value;
		}
	});

	socket.emit("currentState", JSON.stringify(formData));
}
