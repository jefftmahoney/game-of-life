class Matrix {

  /**
   * Create a brand-new Matrix.
   * @param rate The percentage of cells which should begin 
   * the simulation in a non-alive (dead) state, expressed as an 
   * integer (e.g. 70 for 70 percent)
   */
  static generate(rate) {

      const rateToUse = rate ? (rate/100) : 0
      let freshMatrix = []
      for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 20; j++) {
              const iAmAlive = Math.random() > rateToUse
              const nooNode = { x: i, y: j, alive: iAmAlive }
              freshMatrix.push(nooNode)
          }
      }
      return freshMatrix
  }

  static getLifeCount(index, matrix) {
      let arrayToReturn = []
      const getDefaultNode = () => {
          return { x: -1, y: -1, alive: 0 }
      }
      const getNodeValue = (x, y, matrix) => {
          try {
              const valueToReturn = matrix.find(node => node.x === x && node.y === y)
              return valueToReturn === undefined ? -1 : valueToReturn.alive
          } catch {
              return -1
          }
      }
      const node = matrix[index] === undefined ? getDefaultNode() : matrix[index]

      arrayToReturn.push(getNodeValue(node.x - 1, node.y - 1, matrix))
      arrayToReturn.push(getNodeValue(node.x, node.y - 1, matrix))
      arrayToReturn.push(getNodeValue(node.x + 1, node.y - 1, matrix))
      arrayToReturn.push(getNodeValue(node.x - 1, node.y, matrix))
      arrayToReturn.push(getNodeValue(node.x + 1, node.y, matrix))
      arrayToReturn.push(getNodeValue(node.x - 1, node.y + 1, matrix))
      arrayToReturn.push(getNodeValue(node.x, node.y + 1, matrix))
      arrayToReturn.push(getNodeValue(node.x + 1, node.y + 1, matrix))

      return arrayToReturn.filter(x => x == 1).length
  }

  static getLiveStatus(currentlyAlive, numberOfLivingNeighbors) {
      // 1) A dead cell with exactly three living neighbours becomes alive.
      // 2) A living cell with two or three living neighbours remains alive.
      // 3) In all other cases, the cell becomes (or remains) dead.

      const canBecomeAlive = numberOfLivingNeighbors === 3
      const canStayAlive = (numberOfLivingNeighbors >= 2 && numberOfLivingNeighbors <= 3)

      return canBecomeAlive || (currentlyAlive && canStayAlive)
  }

  static getUpdated(matrixToExamine, nodeToAdjust) {
      return matrixToExamine.map(node => {
          const thisIsTheNodeWePicked = (node.x === nodeToAdjust.x && node.y === nodeToAdjust.y)
          node.alive = thisIsTheNodeWePicked ? nodeToAdjust.alive : node.alive
          return node
      })
  }

  static advance(matrixToAdvance, isAliveFn, lifeCountFn) {
      return matrixToAdvance.map((el, ix, ar) => {
          return {
              x: el.x,
              y: el.y,
              alive: isAliveFn(el.alive, lifeCountFn(ix, ar))
          }
      })
  }
}

function moveForward() {
  const existingMatrix = matrixFromGrid()
  const updatedMatrix = Matrix.advance(existingMatrix, Matrix.getLiveStatus, Matrix.getLifeCount)

  matrixBackToGrid(updatedMatrix)
}

function regulate(receivedEvent){
  const theValue = receivedEvent.target.value
  const regulatedValue = (theValue < 0) ? (0) : (theValue > 100 ? 100 : theValue)

  document.getElementById('rateSetter').value = regulatedValue
}

function getRate(){
  const rateFromControl = document.getElementById('rateSetter').value
  return rateFromControl ? rateFromControl : 70
}

function processKeyDown(kde) {
  switch (kde.code) {
    case 'ArrowRight':
      moveForward()
      break
    case 'Space':
      matrixToGrid()
      break
    case 'Enter':
      matrixToGrid(getRate())
      break
    default:
      return
  }
}

function processNodeClick(xParam,yParam,aliveParam) {

  // get the current matrix
  const currentMatrix = matrixFromGrid()

  // generate a new one with the node values
  const theNode = {x:xParam, y:yParam, alive:!aliveParam}
  const newerMatrix = Matrix.getUpdated(currentMatrix, theNode)

  // populate the grid
  matrixBackToGrid(newerMatrix)
}

function markupFromNode(node) {
  return `<div data-x="${node.x}" 
    data-y="${node.y}" 
    data-alive="${node.alive}" 
    class="${node.alive === true ? 'alive' : 'dead'}" 
    onclick="processNodeClick(${node.x},${node.y},${node.alive})">
  </div>` 
}

function matrixToGrid(rate) {
  const NOT_INITIALLY_ALIVE_PERCENTAGE = rate ? rate : 100
  const theNodes = Matrix.generate(NOT_INITIALLY_ALIVE_PERCENTAGE).map((node) => {
    return markupFromNode(node)
  }).join('')
  document.getElementById('matrix-container').innerHTML = theNodes
}

function matrixBackToGrid(matrixToUse) {
  const theNodes = matrixToUse.map((node) => {
    return markupFromNode(node)
  }).join('')
  document.getElementById('matrix-container').innerHTML = theNodes
}

function matrixFromGrid() {
  const theNodes = Array.from(document.getElementById('matrix-container').children)
  return theNodes.map((el, ix, ar) => {
    return {
      x: parseInt(el.dataset.x, 10),
      y: parseInt(el.dataset.y, 10),
      alive: el.dataset.alive === 'true' ? true : false
    }
  })
}

document.addEventListener('keydown', processKeyDown)
document.getElementById('rateSetter').addEventListener('change', regulate)
