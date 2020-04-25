const readline = require('readline');
const { exit } = process;

const TERMINATION_CODE = 'SIGINT';
const COLOR_CODE = '\x1b[32m';
const RESET_COLOR_CODE = '\x1b[0m';
const CLEAR_SCREEN_CODE = '\u001B[2J';
const CURSOR_ZERO_CODE = '\u001B[0;0f';
let io = null;

const renderOptions = (options, index) => {
  io.write(`${CLEAR_SCREEN_CODE}${CURSOR_ZERO_CODE}`);
  io.write('Please, choose one of the following options:\n');
  options
    .map((option, i) => i === index ? `${COLOR_CODE}${option}${RESET_COLOR_CODE}` : option)
    .forEach(option => io.write(`${option}\n`));
}

const handleOptionOnKeyPress = options => {
  let currentIndex = 0;
  return new Promise(resolve => {
    io.input.on('keypress', (_, { name }) => {
      switch (name) {
        case 'down':
          currentIndex++;
          if (currentIndex > options.length - 1)
            currentIndex = 0;
          renderOptions(options, currentIndex);
          break;
        case 'up':
          currentIndex--;
          if (currentIndex < 0)
            currentIndex = options.length - 1;
          renderOptions(options, currentIndex);
          break;
        case 'return':
          resolve();
          break;
        default:
          break;
      }
    });
  });
}

module.exports = Object.freeze({
  createIO: (readableStream, writableStream) => io = readline.createInterface({
    input: readableStream,
    output: writableStream
  }),
  getCurrentInput: prefix => new Promise(resolve => io.question(prefix, answer => resolve(answer))),
  exitOnTermination: () => io.on(TERMINATION_CODE, () => exit(0)),
  handleOptionsList: async options => {
    renderOptions(options, 0);
    await handleOptionOnKeyPress(options);
  }
})