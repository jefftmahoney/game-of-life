const testit = (n, a, e) => {
    const passMsg =
        `
    -----------------------
    ${n}: PASS
    -----------------------
    `
    const failMsg =
        `
    ^^^^^^^^^^^^^^^^^^^^^^^
    ${n}: FAIL
      Actual:     ${a}
      Expected:   ${e}
    ^^^^^^^^^^^^^^^^^^^^^^^
    `
    return (a === e) ? passMsg : failMsg
}


class MatrixNewer {

    static generate() {
        let freshMatrix = []
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const iAmAlive = Math.random() > 0.7
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
                return valueToReturn === (undefined || valueToReturn.alive === false) ? 0 : 1
            } catch {
                return 0
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

        const vtr = arrayToReturn.filter(x => x === 1).length

        return arrayToReturn.filter(x => x === 1).length
    }

    static getLiveStatus(currentlyAlive, numberOfLivingNeighbors) {
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

    static advance(matrixToAdvance) { //}, isAliveFn, lifeCountFn) {
        const matrixCopy = matrixToAdvance.map(x => x)
        const matrixToReturn = matrixToAdvance.map((el, ix, ar) => {
            return {
                x: el.x,
                y: el.y,
                alive: Matrix.getLiveStatus(el.alive, Matrix.getLifeCount(ix, matrixCopy))
                // alive: Matrix.getLiveStatus(el.alive, Matrix.getLifeCount(ix, matrixToAdvance))
            }
        })
        return matrixToReturn
    }
}


class Matrix {

    static generate() {
        let freshMatrix = []
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const iAmAlive = Math.random() > 0.7
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

        if (currentlyAlive === false && canBecomeAlive)
            return true
        else if (currentlyAlive && canStayAlive)
            return true
        else
            return false
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



const matrixToProcess = [
    { x: 0, y: 0, alive: false },
    { x: 0, y: 1, alive: false },
    { x: 0, y: 2, alive: false },

    { x: 1, y: 0, alive: false },
    { x: 1, y: 1, alive: true },
    { x: 1, y: 2, alive: true },

    { x: 2, y: 0, alive: false },
    { x: 2, y: 1, alive: true },
    { x: 2, y: 2, alive: false },
]
const expected = `0,0,0,0,1,1,0,1,1`

console.log(
    testit(
        'Test 1',
        Matrix.advance(
            matrixToProcess,
            Matrix.getLiveStatus,
            Matrix.getLifeCount
        )
            .map(x => x.alive ? '1' : '0')
            .join(','),
        expected
    )
)
