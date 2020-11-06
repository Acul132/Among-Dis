module.exports = {
    name: 'start',
    description: 'Start the game',
    hostPermission: true,
    async execute(msg, args){
        const { players, updateLobbyStatus } = require('../bot')
        const { guild } = msg

        for(let player of players){
            try{
                await guild.members.cache.get(player.id).edit({mute: true})
            }
            catch(err){
                console.log(err)
            }
        }

        updateLobbyStatus("Playing", msg)
    }
}