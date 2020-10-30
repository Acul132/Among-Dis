module.exports = {
    name: 'end',
    description: 'End the game',
    execute(msg, args){
        msg.channel.send('end')
    }
}