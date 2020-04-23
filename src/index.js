const readline = require('readline');

const arrowOptions = require('./arrow-options')

const { stdin, stdout, exit } = process;

const io = readline.createInterface(stdin, stdout);

(async () => {
  io.on('SIGINT', () => exit(0))
  while (true) {
    io.prompt()
    const ask = (q) => new Promise((res, rej) => io.question(q, answer => res(answer)))
    const input = await ask('Q: ')
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