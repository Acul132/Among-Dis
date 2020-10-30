module.exports = {
    name: 'ping',
    description: 'Pinger Ponger',
    execute(msg, args){
        const {PREFIX} = require('../bot')
        msg.channel.send('pong')
    }
}