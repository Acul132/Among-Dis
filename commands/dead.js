module.exports = {
    name: 'dead',
    description: 'Mark players as dead',
    hostPermission: true,
    execute(msg, args){
        const { players } = require('../bot')

        if(msg.mentions.users){
            for(let user in msg.mentions.members.entries()){
                const player = players.find(player => player.id === user.id)
                player.isAlive = false
            }
        }
        else{
            
        }
        console.log(players)
    }
}