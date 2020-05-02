const { exec } = require('child_process');
const run = require('util').promisify(exec);

const repoBaseURI = 'git@github.com:HatsuneMikuLab/node-auth-template.git';

const execCommand = async command => 
    run(command)
    .catch(err => {
        console.log('<ERROR>: ', err);
        process.exit(0)
    });

module.exports = {
    async cloneSingleBranch (branch) {
        execCommand(`git clone -b ${branch} --single-branch ${repoBaseURI}`)
    }
}