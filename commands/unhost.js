module.exports = {
    name: 'unhost',
    description: 'End the lobby',
    hostPermission: true,
    async execute(msg, args){
        const { lobbyMessageId, resetFields} = require('../bot')

        const message = await msg.channel.messages.fetch(lobbyMessageId)
        if(message){
            await message.delete()
            resetFields()
        }
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