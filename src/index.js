const { stdin, stdout } = process;

const { createIO, exitOnTermination, getCurrentInput,
  handleOptionsList } = require('./adapters/console.adapter');

createIO(stdin, stdout);

(async () => {
  exitOnTermination();
  while (true) {
    const input = await getCurrentInput('> ');
    switch (input) {
      case 'choose':
        await handleOptionsList(['option1', 'casualOption2', 'specificOption3']);
        break;
      default:
        console.log('Your input: ', input);
    }
  }
})()