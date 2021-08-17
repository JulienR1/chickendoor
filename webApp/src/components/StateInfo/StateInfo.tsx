import "./StateInfo.scss";

import { DualIcon, IconName, IIcon } from "@root/models/IIcon";
import React, { useEffect, useState } from "react";

import IconGroup from "../Icons";
import { LightData } from "@shared/models/lightData";
import { useSocket } from "@root/contexts/SocketContext";
import { SocketChannel } from "@shared/constants/socketChannel";

import { DoorData } from "@shared/models/doorData";
import { DoorPosition } from "@shared/constants/doorPosition";

function StateInfo(): JSX.Element {
	const [doorStateIcons, setDoorStateIcons] = useState<(IIcon | DualIcon)[]>(Array(3).fill({ name: IconName.Empty }));
	const [daylightIcons, setDaylightIcons] = useState<IIcon[]>(Array(2).fill({ name: IconName.Empty }));
	const socket = useSocket();

	useEffect(() => {
		let lightStatusTimeout: NodeJS.Timeout;

		const callLightAPI = () => fetch(`${process.env.SERVER_ENDPOINT}/api/daylight`).then(onLightDataReceived);

		const onLightDataReceived = async (lightData: Response) => {
			if (lightData.ok) {
				const { isDay, delayToUpdate }: LightData = await lightData.json();

				setDaylightIcons([
					{ name: IconName.Sun, disabled: !isDay },
					{ name: IconName.Moon, disabled: isDay },
				]);
				lightStatusTimeout = setTimeout(callLightAPI, Math.max(1000, delayToUpdate));
			}
		};

		socket?.on(SocketChannel.NotifyDoorState, (doorDataStr: string) => {
			const { position }: DoorData = JSON.parse(doorDataStr);

			setDoorStateIcons([
				{ name: IconName.DoorClosed, disabled: position !== DoorPosition.Down },
				[
					{ name: IconName.ArrowUp, disabled: position !== DoorPosition.MovingUp },
					{ name: IconName.ArrowDown, disabled: position !== DoorPosition.MovingDown },
				],
				{ name: IconName.DoorOpen, disabled: position !== DoorPosition.Up },
			]);
		});

		callLightAPI();
		socket?.emit(SocketChannel.NotifyDoorState);

		return () => {
			if (lightStatusTimeout) {
				clearTimeout(lightStatusTimeout);
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
