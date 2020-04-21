const readline = require('readline');

const { stdin, stdout } = process; 

const io = readline.createInterface(stdin, stdout);

const getNextLine = async function* () {
    for await (const line of io) {
        yield line
    }
};

(async () => {
    //main loop
    const input = (await getNextLine().next()).value;
    console.log('Your input: ', input)
})()

