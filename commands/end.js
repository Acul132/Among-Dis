module.exports = {
    name: 'end',
    description: 'End the game',
    hostPermission: true,
    async execute(msg, args){
        const { players, updateLobbyStatus } = require('../bot')
        const { guild } = msg

        for(let player of players){
            try{
                player.isAlive = true
                await guild.members.cache.get(player.id).edit({mute: false})
            }
            catch(err){
                console.log(err)
            }
        }

        updateLobbyStatus("End game lobby", msg)
    }
}