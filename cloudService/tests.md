# Unit tests

#### src/api/api.ts

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

#### src/api/service.ts

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

#### src/models/daytimeData.ts

| Function    | Test ID | Name                                             | Additional Info                                                  |
| ----------- | ------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| constructor | DD-1    | Should correctly convert from ISO string to date | The used api returns data in this format                         |
|             | DD-2    | Should throw an error when the dates are invalid |                                                                  |
|             | DD-3    | Should add the correct offset to the sunset      | The delay is to give a margin for the chickens to enter at night |
