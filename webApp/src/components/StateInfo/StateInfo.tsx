import "./StateInfo.scss";

import { DualIcon, IconName, IIcon } from "@root/models/IIcon";
import React, { useEffect, useState } from "react";

import IconGroup from "../Icons";
import { useSocket } from "@root/contexts/SocketContext";
import { SocketChannel } from "@shared/constants/socketChannel";
import { callLightAPI, listenToDoorData } from "./service";

function StateInfo(): JSX.Element {
	const [doorStateIcons, setDoorStateIcons] = useState<(IIcon | DualIcon)[]>(Array(3).fill({ name: IconName.Empty }));
	const [daylightIcons, setDaylightIcons] = useState<IIcon[]>(Array(2).fill({ name: IconName.Empty }));
	const socket = useSocket();

	useEffect(() => {
		let lightTimeout: NodeJS.Timeout;

		callLightAPI().then(({ timeout, apiData: iconData }) => {
			setDaylightIcons(iconData);
			lightTimeout = timeout;
		});

		if (socket) {
			listenToDoorData(socket, setDoorStateIcons);
			socket.emit(SocketChannel.NotifyDoorState);
		}

		return () => {
			if (lightTimeout) {
				clearTimeout(lightTimeout);
			}
		};
	}, []);

	return (
		<div className="stateInfo">
			<IconGroup icons={doorStateIcons} />
			<IconGroup icons={daylightIcons} />
		</div>
	);
}

export default StateInfo;
