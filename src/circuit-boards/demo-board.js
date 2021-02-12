/**
 * The scene-manager module serves as an entry point to all scene-related activities, from initialization
 * to access to objects to anything else.
 *
 * The starter version of the scene manager is adapted from the introductory code provided by three.js.
 */
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import Player from '../components/player'
import Chips from '../components/chips'
import Board from '../components/board'
import Capacitor from '../components/capacitor'
import Fan from '../components/fan'
import { Straight, ThreeWay, FourWay, Corner, DeadEnd } from '../components/wires'
import CPU from '../components/cpu'

const DEFAULT_ROTATION_RATE = 0.2
const DEFAULT_START_POSITION = [5,5] // [X, Z]
const DEFAULT_BOARD_UNITS = 2 // universe coordinate units
const DEFAULT_BOARD_WIDTH = 20
const DEFAULT_BOARD_DIMENSIONS = DEFAULT_BOARD_WIDTH / DEFAULT_BOARD_UNITS

const createDemoBoard = ({ fieldOfView, width, height, nearPlane, farPlane }) => {
  const scene = new Scene()
  const camera = new PerspectiveCamera(fieldOfView, width / height, nearPlane, farPlane)
  const playerLocation = DEFAULT_START_POSITION

  const fans = []
  // location of the tiles will be the indeces in this array
  const circuitBoard = [["cpu",  "T0",  "L0", "cap",  "L1",   "-",   "-",  "T0",   "-",  "L0"], 
                        [ "L2",  "T2",   "+",  "T0",  "L3", "cap",  "ch",   "|",  "ch",   "|"], 
                        ["cap", "fan",  "T1",  "L3", "fan",  "D1", "cap",   "|",  "ch",  "D3"],
                        [ "L1",   "-",  "T3",  "ch",  "D2",   "+",   "-",  "L3", "cap", "fan"],
                        [  "|",  "ch",  "L2",  "L0", "cap",   "|", "fan", "cap",  "ch",  "D1"],
                        [  "|", "cap", "fan",  "L2",   "-",   "+",   "-",  "T0",   "-",  "T3"],
                        [ "T1",  "L0", "cap",  "ch",  "ch",   "|",  "ch",   "|",  "ch",   "|"],
                        [ "T1",  "T2",  "T0",   "-",   "-",   "+",   "-",  "T2",   "-",  "T3"],
                        [  "|", "cap",   "|", "cap", "fan",   "|", "cap",  "ch", "cap",   "|"],
                        [ "L2",   "-",  "T2",   "-",   "-",  "T2",   "-",   "-",   "-",  "L3"]]

  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
       
  const repositionComponent = (component) => {
    component.position.x += component.location[0] * DEFAULT_BOARD_UNITS
    component.position.z += component.location[1] * DEFAULT_BOARD_UNITS
  }

  const player = new Player(0.5, playerLocation)
  const board = new Board(DEFAULT_BOARD_WIDTH)
  var cpu
  scene.add(board)
  scene.add(player)
                        
  // Component generation
  for (let z = 0; z < circuitBoard.length; z++) {
    for (let x = 0; x < circuitBoard[0].length; x++) {
      switch(circuitBoard[z][x]) {
        case "cpu": 
          circuitBoard[z][x] = new CPU([x, z])
          cpu = circuitBoard[z][x]
          break
        case "ch": circuitBoard[z][x] = new Chips(4, [x, z]); break
        case "cap": circuitBoard[z][x] = new Capacitor([x, z]); break
        case "fan": 
          circuitBoard[z][x] = new Fan([x, z]) 
          fans.push(circuitBoard[z][x])
          break
        case "D1": circuitBoard[z][x] = new DeadEnd(1, [x, z]); break
        case "D2": circuitBoard[z][x] = new DeadEnd(2, [x, z]); break
        case "D3": circuitBoard[z][x] = new DeadEnd(3, [x, z]); break
        case "L0": circuitBoard[z][x] = new Corner(0, [x, z]); break
        case "L1": circuitBoard[z][x] = new Corner(1, [x, z]); break
        case "L2": circuitBoard[z][x] = new Corner(2, [x, z]); break
        case "L3": circuitBoard[z][x] = new Corner(3, [x, z]); break
        case "T0": circuitBoard[z][x] = new ThreeWay(0, [x, z]); break
        case "T1": circuitBoard[z][x] = new ThreeWay(1, [x, z]); break
        case "T2": circuitBoard[z][x] = new ThreeWay(2, [x, z]); break
        case "T3": circuitBoard[z][x] = new ThreeWay(3, [x, z]); break
        case "-": circuitBoard[z][x] = new Straight(0, [x, z]); break
        case "|": circuitBoard[z][x] = new Straight(1, [x, z]); break
        case "+": circuitBoard[z][x] = new FourWay(0, [x, z]); break
      }
      scene.add(circuitBoard[z][x])
      repositionComponent(circuitBoard[z][x])
    }
  }

  // Player movement
  document.addEventListener("keydown", onDocumentKeyDown, false)
  function onDocumentKeyDown(event) {
    event.preventDefault()
    if (validMove(event.which)) player.move(event.which)
  }

  const validMove = (key) => {
    switch (key) {
      case 37: return lookAhead([player.location[0] - 1, player.location[1]])
      case 38: return lookAhead([player.location[0], player.location[1] - 1])
      case 39: return lookAhead([player.location[0] + 1, player.location[1]])
      case 40: return lookAhead([player.location[0], player.location[1] + 1])
    }
  }

  const lookAhead = (coordinate) => {
    if (coordinate[0] < 0 || coordinate[1] < 0 ||
        coordinate[0] >= DEFAULT_BOARD_DIMENSIONS ||
        coordinate[1] >= DEFAULT_BOARD_DIMENSIONS ||
        circuitBoard[coordinate[1]][coordinate[0]] instanceof Fan ||
        circuitBoard[coordinate[1]][coordinate[0]] instanceof Capacitor ||
        circuitBoard[coordinate[1]][coordinate[0]] instanceof Chips) return false
    return true
  }

  var winner = false

  const animate = () => {
    window.requestAnimationFrame(animate)
    // Player movement/animations
    if (!winner) {
      player.position.x = player.location[0] * DEFAULT_BOARD_UNITS
      player.position.z = player.location[1] * DEFAULT_BOARD_UNITS
      player.glow()
      fans.forEach(fan => {fan.center.rotation.y -= DEFAULT_ROTATION_RATE})
      if (player.position.x === cpu.position.x && 
        player.position.z === cpu.position.z) winner = true
    } else {
      winAnimation()
    }
    renderer.render(scene, camera)
  }

  var firstHalf = true
  const winAnimation = () => {
    if (player.position.y <= 0.5 && firstHalf) {
      player.position.y += 0.04
    } else {
      firstHalf = false
      player.body.position.y -= 0.05
    }
  }

  return {
    camera,
    renderer,
    animate,
    components: {
      player,
      board
    }
  }
}

export { createDemoBoard }
