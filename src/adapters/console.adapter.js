const readline = require('readline')
const { exit } = process

const TERMINATION_CODE = 'SIGINT'
let io = null

module.exports = Object.freeze({
  createIO: (readableStream, writableStream) => io = readline.createInterface({
    input: readableStream,
    output: writableStream
  }),
  getCurrentInput: prefix => new Promise(resolve => io.question(prefix, answer => resolve(answer))),
  exitOnTermination: () => io.on(TERMINATION_CODE, () => exit(0)),
  handleOptions: options => {
    const { output } = io
    options.forEach(option => {
      io.write(` ${option}\n`)
    })
    readline.moveCursor(output, 0, -2)
    console.log('-')
  }
})