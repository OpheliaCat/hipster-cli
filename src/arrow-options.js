const options = ['option1', 'option2', 'option3']

module.exports = rl => {
  rl.question('Please, select one of the following options:', answer => console.log(answer))
}