const { stdin, stdout } = process;

const { createIO, exitOnTermination, getCurrentInput,
  handleOptions } = require('./adapters/console.adapter');

createIO(stdin, stdout);

(async () => {
  exitOnTermination();
  while (true) {
    const input = await getCurrentInput('> ');
    switch (input) {
      case 'choose':
        handleOptions(['option1', 'option2', 'option3']);
        break;
      default:
        console.log('Your input: ', input);
    }
  }
})()