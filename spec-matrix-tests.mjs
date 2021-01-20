import Matrix from './matrix-source.mjs'
import testit from './tester-source.mjs'

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
        'Test 1 -- basic advance',
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

console.log(
    testit(
        'Test 2 -- generate() without an argument',
        Matrix.generate().length,
        400
    )
)

console.log(
    testit(
        'Test 3 -- generate() with a parameter',
        Matrix.generate(90).length,
        400
    )
)