module.exports = {
    name: 'end',
    description: 'End the game',
    hostPermission: true,
    async execute(msg, args){
        const { players, updateLobbyPhase } = require('../bot')
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

        updateLobbyPhase("End of round lobby", msg)
    }
}