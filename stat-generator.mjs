import Matrix from './matrix-source.mjs'

function cycle(rate) {
    let currentMatrix = []
    let previousMatrix = Matrix.generate(rate)

    let currentPopulation = 0
    let previousPopulation = previousMatrix.filter(x => x.alive === true).length

    let iterations = 0
    let cyclingShouldStillHappen = true

    while (cyclingShouldStillHappen) {
        currentMatrix = Matrix.advance(previousMatrix, Matrix.getLiveStatus, Matrix.getLifeCount)
        currentPopulation = currentMatrix.filter(x => x.alive === true).length
        iterations++

        cyclingShouldStillHappen = previousPopulation !== currentPopulation

        previousMatrix = currentMatrix
        previousPopulation = currentPopulation
        currentMatrix = []
        currentPopulation = 0
    }
    return iterations
}

let total = 0
for (let i = 1; i <= 100; i++) {
    let currentTotal = cycle(5)
    total += currentTotal
    console.log(`iteration #${i}: ${currentTotal}`)
}
let avg = total / 100
console.log('avg')
console.log(avg)
