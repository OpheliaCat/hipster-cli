const readline = require('readline');
const { exit } = process;

const TERMINATION_CODE = 'SIGINT';
const COLOR_CODE = '\u001B[32m';
const RESET_COLOR_CODE = '\u001B[0m';
const HIDE_CURSOR = '\u001B[?25l';
const SHOW_CURSOR = '\u001B[?25h';
let io = null;

const renderOptions = (options, index) => {
  const renderedOptions = [...options];
  renderedOptions[index] = `${COLOR_CODE}${renderedOptions[index]}${RESET_COLOR_CODE}`;
  console.clear();
  readline.cursorTo(io.output, 0, 0);
  io.write('Please, choose one of the following options:\n');
  io.write(renderedOptions.join('\n'));
}

const handleOptionOnKeyPress = options => {
  const { input, output } = io
  let currentIndex = 0;
  let isStreamBlocked = false
  const mainListener = input.listeners('keypress')[0]
  io.write(HIDE_CURSOR);
  return new Promise(resolve => {
    input.on('keypress', (_, { name }) => {
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
          input.off('keypress', input.listeners('keypress')[input.listenerCount('keypress') - 1]);
          input.prependListener('keypress', mainListener);
          io.write(_, { key: 'return' });
          io.write(SHOW_CURSOR);
          resolve();
          break;
        default:
          if (!isStreamBlocked) {
            readline.moveCursor(io.output, -1, 0, () => readline.clearLine(output, 1));
            input.off('keypress', mainListener);
            isStreamBlocked = true;
          }
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
  handleOptionsList: options => {
    renderOptions(options, 0);
    // We need to hide cursor during option interaction
    return handleOptionOnKeyPress(options);
  }
})