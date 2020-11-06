module.exports = {
    name: 'disc',
    description: 'Enter the discussion phase',
    hostPermission: true,
    async execute(msg, args){
        //should send a message with the remaining colours that the host can click to mark as "dead"

        const { players, lobbyStatus, updateLobbyStatus } = require('../bot')
        const { guild } = msg

        for(let player of players){
            try{
                if(player.isAlive)
                    await guild.members.cache.get(player.id).edit({mute: false})
                else
                    await guild.members.cache.get(player.id).edit({mute: true})
            }
            catch(err){
                console.log(err)
            }
        }

        if(lobbyStatus !== 'Discussion')
            updateLobbyStatus('Discussion', msg)
    }
}