module.exports = {
    name: 'alive',
    description: 'Mark players as alive',
    execute(msg, args){
        msg.channel.send('alive')
    }
}