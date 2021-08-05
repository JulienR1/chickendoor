# Unit tests

#### src/api/api.ts

| Function               | Test ID | Name                                                 | Additional Info                              |
| ---------------------- | ------- | ---------------------------------------------------- | -------------------------------------------- |
| nextMove               | API-1   | Should call API                                      |                                              |
|                        | API-2   | Should return undefined when the API fails           | Fails whenever it does not return "OK"       |
|                        | API-3   | Should calculate the next move upon API reponse      |                                              |
| fetchDaytimeAPIResults | API-4   | Should return undefined when the fetch request fails |                                              |
|                        | API-5   | Should return json data upon api request             | Confirm the provided structure by node-fetch |
|                        | API-6   | Should response contain the correct interface        | Validate planned behavior for the api        |
| calculateNextMove      | API-7   | Should request UP before sunrise                     |                                              |
|                        | API-8   | Should request UP after sunset                       |                                              |
|                        | API-9   | Should request DOWN after sunrise and before sunset  |                                              |
|                        | API-10  | Should correctly request update delays               |                                              |

#### src/models/daytimeData.ts

| Function    | Test ID | Name                                             | Additional Info                          |
| ----------- | ------- | ------------------------------------------------ | ---------------------------------------- |
| constructor | DD-1    | Should correctly convert from ISO string to date | The used api returns data in this format |
|             | DD-2    | Should throw an error when the dates are invalid |                                          |
