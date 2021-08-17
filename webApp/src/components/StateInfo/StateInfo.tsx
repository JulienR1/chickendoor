import "./StateInfo.scss";

import { DualIcon, IconName, IIcon } from "@root/models/IIcon";
import React, { useEffect, useState } from "react";

import IconGroup from "../Icons";
import { LightData } from "@shared/models/lightData";

function StateInfo(): JSX.Element {
	const [daylightIcons, setDaylightIcons] = useState<(IIcon | DualIcon)[]>(Array(2).fill({ name: IconName.Empty }));

	useEffect(() => {
		let lightStatusTimeout: NodeJS.Timeout;

		const callAPI = () => fetch(`${process.env.SERVER_ENDPOINT}/api/daylight`).then(onLightDataReceived);

		const onLightDataReceived = async (lightData: Response) => {
			if (lightData.ok) {
				const { isDay, delayToUpdate }: LightData = await lightData.json();

				setDaylightIcons([
					{ name: IconName.Sun, disabled: !isDay },
					{ name: IconName.Moon, disabled: isDay },
				]);
				lightStatusTimeout = setTimeout(callAPI, Math.max(1000, delayToUpdate));
			}
		};

		callAPI();

		return () => {
			if (lightStatusTimeout) {
				clearTimeout(lightStatusTimeout);
			}
		};
	}, []);

	const doorStateIcons: (IIcon | DualIcon)[] = [
		{ name: IconName.DoorClosed },
		[{ name: IconName.ArrowUp }, { name: IconName.ArrowDown }],
		{ name: IconName.DoorOpen },
	];

	return (
		<div className="stateInfo">
			<IconGroup icons={doorStateIcons} />
			<IconGroup icons={daylightIcons} />
		</div>
	);
}

export default StateInfo;
