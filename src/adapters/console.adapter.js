const readline = require('readline')
const { stdin, exit } = process

const TERMINATION_CODE = 'SIGINT'
let io = null

const renderOptionsChoice = (options, currentChoice = 0) => {
  const { output } = io
  readline.moveCursor(output, -2, -options.length - 1) // -2 and -1 are smell code to counter main loop
  options.forEach((option, i) => {
    const filler = i === currentChoice ? '-' : ' '
    io.write(`${filler}${option}\n`)
  })
}

const handleKeystrokes = (options, currentChoice = 0) => {
  const { input } = io
  readline.emitKeypressEvents(input)
  stdin.setRawMode(true)
  stdin.on('keypress', (_, { name }) => {
    if (name === 'down'){
      currentChoice++
      if (currentChoice > options.length - 1)
        currentChoice = 0
      renderOptionsChoice(options, currentChoice)
    }
  })
}

module.exports = Object.freeze({
  createIO: (readableStream, writableStream) => io = readline.createInterface({
    input: readableStream,
    output: writableStream
  }),
  getCurrentInput: prefix => new Promise(resolve => io.question(prefix, answer => resolve(answer))),
  exitOnTermination: () => io.on(TERMINATION_CODE, () => exit(0)),
  handleOptionsList: options => {
    io.write('Please, choose one of the following options:\n\n\n') //multiple \n are smell code to counter main loop
    options.forEach(option => io.write(` ${option}\n`))
    renderOptionsChoice(options)
    handleKeystrokes(options)
  }
})