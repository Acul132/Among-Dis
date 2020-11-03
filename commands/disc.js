module.exports = {
    name: 'disc',
    description: 'Enter the discussion phase',
    hostPermission: true,
    execute(msg, args){
        msg.channel.send('disc')
        //should send a message with the remianing colours that the host can click to mark as "dead"
    }
}