const getNodeValue = (x, y, matrix) => {
  try {
    const valueToReturn = matrix.find(node => node.x === x && node.y === y)
    return valueToReturn === undefined ? -1 : valueToReturn.isAlive
  } catch {
    return -1
  }
}

const getLifeCount = (index, matrix) => {
  let arrayToReturn = []
  const getDefaultNode = () => {
    return { x: -1, y: -1, isAlive: 0 }
  }
  const getNodeValue = (x, y, matrix) => {
    try {
      const valueToReturn = matrix.find(node => node.x === x && node.y === y)
      return valueToReturn === undefined ? -1 : valueToReturn.isAlive
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

const getIsAliveDetermination = (currentlyAlive, numberOfLivingNeighbors) => {
  // 1) A dead cell with exactly three living neighbours becomes alive.
  // 2) A living cell with two or three living neighbours remains alive.
  // 3) In all other cases, the cell becomes (or remains) dead.

  const canBecomeAlive = numberOfLivingNeighbors === 3
  const canStayAlive = (numberOfLivingNeighbors >= 2 && numberOfLivingNeighbors <= 3)

  if (currentlyAlive === false && canBecomeAlive)
    return true
  else if (currentlyAlive && canStayAlive)
    return true
  else
    return false
}

function advance() {
  const ourNewMatrix = getCurrentMatrix().map((el, ix, ar) => {
    return {
      x: el.x,
      y: el.y,
      isAlive: getIsAliveDetermination(ar[ix].isAlive, getLifeCount(ix, ar))
    }
  })

  const currentCount = ourNewMatrix.filter(x => x.isAlive === true).length
  document.getElementById('population').innerHTML = currentCount

  let lifeCycles = parseInt(document.getElementById('lifeCycles').innerText, 10)
  lifeCycles++
  document.getElementById('lifeCycles').innerHTML = lifeCycles

  currentMatrix = ourNewMatrix
  populateMatrix(ourNewMatrix)
}

function getNewMatrix() {
  let freshMatrix = []
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      const iAmAlive = Math.random() > 0.9
      const nooNode = { x: i, y: j, isAlive: iAmAlive }
      freshMatrix.push(nooNode)
    }
  }
  return freshMatrix
}

let currentMatrix = []

const getCurrentMatrix = () => {
  return currentMatrix.length === 0 ? getNewMatrix() : currentMatrix
}

const getFreshMatrix = () => {
  let freshMatrix = []
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      const iAmAlive = false
      const nooNode = { x: i, y: j, isAlive: iAmAlive }
      freshMatrix.push(nooNode)
    }
  }
  return freshMatrix
}

function processKeyDown(kde) {
  switch (kde.code) {
    case 'ArrowRight':
      advance()
      break
    case 'Space':

      fillContainer()
      break
    default:
      return
  }
}

const populateMatrix = (matrixToUse) => {
  const matrixContainer = document.getElementById('matrix-container')
  const theVirtualMatrix = matrixToUse === undefined ? ourMatrix : matrixToUse

  for (let i = 0; i < matrixContainer.children.length; i++) {
    matrixContainer.children[i].className = theVirtualMatrix[i].isAlive === true ? 'alive' : ''
  }
}

const fillContainer = () => {

  document.getElementById('population').innerHTML = 0
  document.getElementById('lifeCycles').innerHTML = 0

  let freshNodes = []
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      const iAmAlive = Math.random() > 0.9
      const nooNode = { x: i, y: j, isAlive: iAmAlive }
      freshNodes.push(nooNode)
    }
  }
  currentMatrix = freshNodes

  const theNodes = freshNodes.map(x => {
    return `<div class="${x.isAlive ? 'alive' : ''}"></div>`
  })
  document.getElementById('matrix-container').innerHTML = theNodes
}

document.addEventListener('keydown', processKeyDown)
