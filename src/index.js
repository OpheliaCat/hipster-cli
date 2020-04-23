const readline = require('readline');

const arrowOptions = require('./arrow-options')

const { stdin, stdout } = process;

const io = readline.createInterface(stdin, stdout);


const getNextLine = async function* () {
  for await (const line of io) {
    yield line
  }
};

(async () => {
  while (true) {
    const input = (await getNextLine().next()).value;
    if (!input) break
    switch (input) {
      case 'choice':
        arrowOptions()
        break
      default:
        console.log('Your input: ', input)
    }
  }
})()