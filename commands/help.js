module.exports = {
    name: 'help',
    description: 'Display a help dialogue with all available commands',
    execute(msg, args){
        msg.channel.send('help')
    }
}