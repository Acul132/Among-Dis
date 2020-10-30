module.exports = {
    name: 'dead',
    description: 'Mark players as dead',
    execute(msg, args){
        msg.channel.send('dead')
    }
}