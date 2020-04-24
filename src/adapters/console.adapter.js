const readline = require('readline')
const { exit } = process

const TERMINATION_CODE = 'SIGINT'
let io = null

const renderOptionsChoice = (options, currentChoice = options.length) => {
  const { output } = io
  readline.moveCursor(output, 0, -options.length)
  const offset = options.length - currentChoice
  options.forEach((option, i) => {
    const filler = i === offset ? '-' : ' '
    io.write(`${filler}${option}\n`)
  })
}

module.exports = Object.freeze({
  createIO: (readableStream, writableStream) => io = readline.createInterface({
    input: readableStream,
    output: writableStream
  }),
  getCurrentInput: prefix => new Promise(resolve => io.question(prefix, answer => resolve(answer))),
  exitOnTermination: () => io.on(TERMINATION_CODE, () => exit(0)),
  handleOptions: options => {
    io.write('Please, choose one of the following options:\n')
    options.forEach(option => io.write(`${option}\n`))
    renderOptionsChoice(options)
    const currentChoice = options.length - 1
    renderOptionsChoice(options, currentChoice)
  }
})