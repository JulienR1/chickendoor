const server = "http://localhost:8080";

let socket;
let isConnected = false;

const eventLogs = channels.map((channel) => ({
	channel,
}));

connect();

function connect() {
	socket = io(server);
	socket.on("disconnect", () => disconnect());
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

function clearChannels() {
	document.querySelectorAll("#channels p").forEach((p) => {
		p.remove();
	});
}

function updateConnectionButtons() {
	document.getElementById("connect-btn").disabled = isConnected;
	document.getElementById("disconnect-btn").disabled = !isConnected;
	document.getElementById("emit-btn").disabled = !isConnected;

	if (isConnected) {
		document.body.setAttribute("connected", "");
	} else {
		document.body.removeAttribute("connected");
	}
}

function fetchUpdateTime() {
	fetch(`${server}/api/nextMove`).then((returnData) => {
		if (returnData.ok) {
			returnData.text().then((body) => {
				document.getElementById("updateTime").innerText = body;
			});
		} else {
			document.getElementById("updateTime").innerText = "failed";
		}
	});
}

function registerSocketEvents() {
	eventLogs.forEach((eventLog) => {
		if (!eventLog.logContainer) {
			const channelContainer = document.createElement("div");
			channelContainer.innerHTML = `<h4>${eventLog.channel}</h4>`;
			channelContainer.id = eventLog.channel;
			document.getElementById("channels").appendChild(channelContainer);
			eventLog.logContainer = channelContainer;
		}

		socket.on(eventLog.channel, (data) => {
			const logObj = document.createElement("p");
			logObj.innerText = `${new Date().toLocaleTimeString("en-GB")}: ${data ? data : "Event received"}`;
			eventLog.logContainer.insertBefore(logObj, eventLog.logContainer.querySelector("h4").nextSibling);
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
