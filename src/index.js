const readline = require('readline');

const arrowOptions = require('./arrow-options')

const { stdin, stdout, exit } = process;

const io = readline.createInterface(stdin, stdout);


const getNextLine = async function* () {
  for await (const line of io) {
    yield line
  }
};

(async () => {
  io.on('SIGINT', () => exit(0))
  while (true) {
    io.prompt()
    input = (await getNextLine().next()).value
    console.log(io.eventNames())
    switch (input) {
      case 'choice':
        arrowOptions(io)
        break
      default:
        console.log('Your input: ', input)
    }
  }
})()