const { stdin, stdout } = process;

const { createIO, exitOnTermination, getCurrentInput,
  handleOptionsList } = require('./adapters/console.adapter');

createIO(stdin, stdout);

(async () => {
  exitOnTermination();
  await handleOptionsList(['option1', 'casualOption2', 'specificOption3']);
  await getCurrentInput('> ');
})()