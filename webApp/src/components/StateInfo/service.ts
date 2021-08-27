import { IconName, IIcon, DualIcon } from "@root/models/IIcon";
import { ITimeoutAPI } from "@root/models/ITimeoutAPI";
import { DoorPosition } from "@shared/constants/doorPosition";
import { SocketChannel } from "@shared/constants/socketChannel";
import { DoorData } from "@shared/models/doorData";
import { LightData } from "@shared/models/lightData";
import { Socket } from "socket.io-client";

const callLightAPI = (): Promise<ITimeoutAPI<IIcon[]>> => {
	return new Promise(async (resolve, reject) => {
		const apiTimeoutData = await fetch(`${process.env.SERVER_ENDPOINT}/api/daylight`).then(onLightDataReceived);
		return apiTimeoutData ? resolve(apiTimeoutData) : reject();
	});
};

const onLightDataReceived = async (lightData: Response): Promise<ITimeoutAPI<IIcon[]> | undefined> => {
	if (lightData.ok) {
		const { isDay, delayToUpdate }: LightData = await lightData.json();

		return {
			timeout: setTimeout(callLightAPI, Math.max(1000, delayToUpdate)),
			apiData: [
				{ name: IconName.Sun, disabled: !isDay },
				{ name: IconName.Moon, disabled: isDay },
			],
		};
	}
};

const listenToDoorData = (socket: Socket, callback: (icons: (IIcon | DualIcon)[]) => void): void => {
	socket.on(SocketChannel.NotifyDoorState, (doorStateStr) => {
		const { position }: DoorData = JSON.parse(doorStateStr);

		callback([
			{ name: IconName.DoorClosed, disabled: position !== DoorPosition.Down },
			[
				{ name: IconName.ArrowUp, disabled: position !== DoorPosition.MovingUp },
				{ name: IconName.ArrowDown, disabled: position !== DoorPosition.MovingDown },
			],
			{ name: IconName.DoorOpen, disabled: position !== DoorPosition.Up },
		]);
	});
};

export { callLightAPI, listenToDoorData };
