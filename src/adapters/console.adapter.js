const readline = require('readline');
const { exit } = process;

const TERMINATION_CODE = 'SIGINT';
const COLOR_CODE = '\x1b[32m'
const RESET_COLOR_CODE = '\x1b[0m'
let io = null;

const renderOptions = (options, index) => {
  readline.cursorTo(io.output, 0, 0)
  options
    .map((option, i) => i === index ? `${COLOR_CODE}${option}${RESET_COLOR_CODE}` : option)
    .forEach(option => io.write(`${option}\n`))
}

const handleOptionOnKeyPress = options => {
  let currentIndex = 0
  io.input.on('keypress', (_, { name }) => {
    if (name === 'down') {
      currentIndex++
      if (currentIndex > options.length - 1)
        currentIndex = 0
      renderOptions(options, currentIndex)
    }
    if (name === 'up') {
      currentIndex--
      if (currentIndex < 0)
        currentIndex = options.length - 1
      renderOptions(options, currentIndex)
    }
  });
}

module.exports = Object.freeze({
  createIO: (readableStream, writableStream) => io = readline.createInterface({
    input: readableStream,
    output: writableStream
  }),
  getCurrentInput: prefix => new Promise(resolve => io.question(prefix, answer => resolve(answer))),
  exitOnTermination: () => io.on(TERMINATION_CODE, () => exit(0)),
  handleOptionsList: options => {
    io.write('Please, choose one of the following options:\n');
    renderOptions(options, 0)
    handleOptionOnKeyPress(options)
  }
})