# Unit tests

<details>
<summary><b>src/api</b></summary>

#### <b>./api.ts</b>

| Function               | Test ID | Name                                                      | Additional Info                              |
| ---------------------- | ------- | --------------------------------------------------------- | -------------------------------------------- |
| nextMove               | API-1   | Should return undefined when no daytime data is found     |                                              |
|                        | API-2   | Should calculate the next move when daytime data is found |                                              |
| daylight               | API-3   | Should return undefined when no daytime data is found     |                                              |
|                        | API-4   | Should calculate the next move when daytime data is found |                                              |
| getDaytimeData         | API-5   | Should call API                                           |                                              |
|                        | API-6   | Should return undefined when the API fails                | Fails whenever it does not return "OK"       |
| fetchDaytimeAPIResults | API-7   | Should return undefined when the fetch request fails      |                                              |
|                        | API-8   | Should return json data upon api request                  | Confirm the provided structure by node-fetch |
|                        | API-9   | Should response contain the correct interface             | Validate planned behavior for the api        |

#### <b>./service.ts</b>

| Function          | Test ID | Name                                                       | Additional Info |
| ----------------- | ------- | ---------------------------------------------------------- | --------------- |
| calculateNextMove | API-S-1 | Should request UP before sunrise                           |                 |
|                   | API-S-2 | Should request UP after sunset                             |                 |
|                   | API-S-3 | Should request DOWN after sunrise and before sunset        |                 |
|                   | API-S-4 | Should correctly request update delays                     |                 |
| calculateDaylight | API-S-5 | Should not flag as DAY before the sunrise                  |                 |
|                   | API-S-6 | Should flag as DAY after the sunrise and before the sunset |                 |
|                   | API-S-7 | Should not flag as DAY after the sunset                    |                 |
|                   | API-S-8 | Should calculate corect delays for next update             |                 |

</details>

<details>
<summary><b>src/models/daytimeData.ts</b></summary>

| Function    | Test ID | Name                                             | Additional Info                                                  |
| ----------- | ------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| constructor | DD-1    | Should correctly convert from ISO string to date | The used api returns data in this format                         |
|             | DD-2    | Should throw an error when the dates are invalid |                                                                  |
|             | DD-3    | Should add the correct offset to the sunset      | The delay is to give a margin for the chickens to enter at night |

</details>

<details>
<summary><b>src/storage</b></summary>

#### <b>./storage.ts</b>

| Function       | Test ID | Name                                                                                      | Additional Info |
| -------------- | ------- | ----------------------------------------------------------------------------------------- | --------------- |
| writeToFile    | STO-1   | Should add data to a file in the "new" section and move the old data in the "old" section |                 |
|                | STO-2   | Should set the "old" section to "{}" if there was no prior data                           |                 |
|                | STO-3   | Should validate the file path before writing                                              |                 |
|                | STO-4   | Should throw an error if there was an error when parsing the data                         |
| readFileAsJSON | STO-5   | Should validate the file path before reading                                              |                 |
|                | STO-6   | Should return undefined if there is no data or no file                                    |                 |
|                | STO-7   | Should return the correct data as JSON upon read                                          |                 |

#### <b>./service.ts</b>

| Function                    | Test ID | Name                                                    | Additional Info                                 |
| --------------------------- | ------- | ------------------------------------------------------- | ----------------------------------------------- |
| createStorageDirIfNecessary | STO-S-1 | Should create the storage directory if it is missing    |                                                 |
|                             | STO-S-2 | Should skip directory creation if it is already created |                                                 |
| validateFilePath            | STO-S-3 | Should accept file from the white list                  | Files need to be registered in the "Files" enum |
|                             | STO-S-4 | Should throw an error when a random filepath is passed  |                                                 |

</details>

<details>
<summary><b>src/sockets/client/service.ts</b></summary>

| Function             | Test ID  | Name                                                                                | Additional Info                                               |
| -------------------- | -------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| updateClientDoorData | SOCC-S-1 | Should not send data if the received data is not defined                            | The data is directly read from a file and should be validated |
|                      | SOCC-S-2 | Should not send data if the received data is not the correct format                 |                                                               |
|                      | SOCC-S-3 | Should notify all client sockets of a change                                        |                                                               |
| requestNewDoorData   | SOCC-S-4 | Should request a data update if the previous data is invalid                        | Invalid means that it was not properly saved; let's try again |
|                      | SOCC-S-5 | Should not request an update if the last update was made before or on the set delay |                                                               |
|                      | SOCC-S-6 | Should request an update if the last update was made after the set delay            |                                                               |

</details>

<details>
<summary><b>src/sockets/door/service.ts</b></summary>

| Function        | Test ID  | Name                                             | Additional Info |
| --------------- | -------- | ------------------------------------------------ | --------------- |
| saveNewDoorData | SOCD-S-1 | Should sanitize the provided data                |                 |
|                 | SOCD-S-2 | Should print an error when the data is not valid |                 |
|                 | SOCD-S-3 | Sould write to file and notify all clients       |                 |

</details>

<details>
<summary><b>src/sockets</b></summary>

#### <b>./sockets.ts</b>

| Function            | Test ID | Name                                                                     | Additional Info |
| ------------------- | ------- | ------------------------------------------------------------------------ | --------------- |
| sendToDoorSockets   | SOC-1   | Should call `sendToSocketList()` with only the registered door sockets   |                 |
| sendToClientSockets | SOC-2   | Should call `sendToSocketList()` with only the registered client sockets |                 |

#### <b>./service.ts</b>

| Function              | Test ID  | Name                                                                             | Additional Info |
| --------------------- | -------- | -------------------------------------------------------------------------------- | --------------- |
| addNewSocketWithType  | SOC-S-1  | Should throw an error if the provided socket is undefined                        |                 |
|                       | SOC-S-2  | Should register the new socket in the sockets list                               |                 |
|                       | SOC-S-3  | Should request a door state notification                                         |                 |
|                       | SOC-S-4  | Should call the proper socket type onConnect method                              |                 |
|                       | SOC-S-5  | Should bind the client socket to door notifications                              |                 |
| onDisconnect          | SOC-S-6  | Should not modify the socket list if the socket cannot be found                  |                 |
|                       | SOC-S-7  | Should remove the socket from the list if it was found                           |                 |
|                       | SOC-S-8  | Should trigger a door event if the socket is a door socket                       |                 |
|                       | SOC-S-9  | Should not trigger a door event if the socket is a client socket                 |                 |
| sendToSocketList      | SOC-S-10 | Should emit the provided data to all the provided sockets on the correct channel |                 |
|                       | SOC-S-11 | Should not emit anything if no sockets are provided                              |                 |
| notifyRegisteredDoors | SOC-S-12 | Should correctly determine if a door is registered                               |                 |
|                       | SOC-S-13 | Should notify all clients                                                        |                 |

</details>
