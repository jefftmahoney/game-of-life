import Matrix from './matrix-source.mjs'

let rateToUse = process.argv[2] // a number from 0 - 100
const ceiling = process.argv[3] // max number of times to do comparison check
const iterations = process.argv[4] // the number of times you want to run the experiment for a certain rate

function cycle(rateParam, ceilingParam) {
    let currentMatrix = Matrix.generate(rateParam)
    let representations = []
    let currentRepresentation = currentMatrix.map(x => `${x.alive.toString()}`).join(',')
    let iterations = 0
    let cyclingShouldStillHappen = true

    while (cyclingShouldStillHappen) {

        const everybodysDead = currentRepresentation.includes('true') === false

        // have we hit the wall?
        if (iterations > ceilingParam){
            return iterations 
        }

        // can we start doing a comparison check?
        if (iterations > 3){

            if (everybodysDead){
                return iterations
            }

            cyclingShouldStillHappen = representations[representations.length - 1] !== representations[representations.length - 3]
            
            if (cyclingShouldStillHappen === false){
                return iterations
            }
        }

        // move ahead
        currentMatrix = Matrix.advance(currentMatrix, Matrix.getLiveStatus, Matrix.getLifeCount)
        currentRepresentation = currentMatrix.map(x => `${x.alive.toString()}`).join(',')
        representations.push(currentRepresentation)

        iterations++
    }
    return iterations
}

let total = 0
let prefatoryMsg = ''
let exceptions = 0
for (let i = 1; i <= iterations; i++) {
    let currentTotal = cycle(rateToUse, ceiling)
    total += currentTotal > ceiling ? 0 : currentTotal
    exceptions += currentTotal > ceiling ? 1 : 0
    prefatoryMsg = currentTotal > ceiling ? '>>>>>>>>>' : ''
    console.log(`iteration #${i}: ${prefatoryMsg}${currentTotal}`)
}
let avg = total / (iterations - exceptions)
console.log('avg')
console.log(avg)
