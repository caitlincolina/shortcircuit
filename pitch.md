# Short Circuit

## Desciption

Short Circuit is 3D puzzle game based off a circuit board. You play as an electric current whose goal is to reach the CPU port; however, you have a limited supply of power! Find the optimal path and watch out for those darn bugs.

## Instructions

Controls:

- Use the arrow keys to move the player

## Current Features

Player has unlimited moves with the goal of finding the CPU Port amidst the dark maze. Player can move only where there is a wire path; meaning the player cannot move off the circuit board or into a wall. Once the player reaches the CPU Port, input controls will stop.

| Object           | Function                                | Animation                               |
| ---------------- | --------------------------------------- | --------------------------------------- |
| Electric Current | Object that player controls             | A ball of light that glows autonomously |
| Wires            | Shows path that the player can traverse | None                                    |
| CPU Port         | The end goal                            | Player will enter the port              |
| Fan              | Fun decoration, serves as a wall        | Blades spin autonomously                |
| Chips            | Fun decoration, serves as a wall        | None                                    |
| Capacitor        | Fun decoration, serves as a wall        | None                                    |

## Future Features

Player has a limited number of moves corresponding to their "power supply". Once the player reaches the CPU Port, they will enter a new level/ circuit board.

| Object          | Function                                                  | Animation                                          |
| --------------- | --------------------------------------------------------- | -------------------------------------------------- |
| Wires           | Shows path that the player can traverse                   | Will light up if player passes over                |
| Capacitor       | Power up station for the player to replenish their supply | Stops glowing when player passes over              |
| Switch (Button) | Activates the switch "bridge" when given power            | Active and Non-Active states                       |
| Switch (Bridge) | Connects wire paths so player can cross                   | Up and Down states                                 |
| Bug/ Virus      | Enemy that obstructs path; moves when player moves        | A growing and shrinking (spiky?) ball (autonomous) |
| Resistors       | Provide a possibly shorter path but requires power        | None                                               |
