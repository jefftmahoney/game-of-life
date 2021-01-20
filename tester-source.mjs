export default function testit(n, a, e) {
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
