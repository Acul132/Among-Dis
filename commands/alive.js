module.exports = {
    name: 'alive',
    description: 'Mark players as alive',
    hostPermission: true,
    execute(msg, args){
        msg.channel.send('alive')
    }
}