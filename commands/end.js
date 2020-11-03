module.exports = {
    name: 'end',
    description: 'End the game',
    hostPermission: true,
    async execute(msg, args){
        const { players } = require('../bot')
        const { guild } = msg

        for(let player of players){
            try{
                await guild.members.cache.get(player.id).edit({mute: false})
            }
            catch(err){
                console.log(err)
            }
        }
    }
}