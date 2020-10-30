module.exports = {
    name: 'host',
    description: 'Initialize a game',
    async execute(msg, args){
        const bot = require('../bot')
        const Player = require('../player')
        
        bot.host = msg.author.id

        const playerSelect = await msg.channel.send('Please react to select your colour!')
        Object.keys(bot.colours).map(async emoji => await playerSelect.react(emoji))
        
        const playerColourFilter = (reaction, user) => Object.keys(bot.colours).includes(reaction.emoji.name) && !user.bot
        const playerColourCollector = playerSelect.createReactionCollector(playerColourFilter)
        playerColourCollector.on('collect', async (r,user) => {
            const playerColour = bot.colours[r.emoji.name]

            //Check if player object has already been created
            // if yes: change current colour
            // if no: create player object with reacted colour
            const player = bot.players.find(player => player.id === user.id)
            if(player){
                player.changeColour(playerColour)
                let playerReaction = playerSelect.reactions.cache.filter(reaction => reaction.users.cache.has(player.id) && reaction.emoji.name !== r.emoji.name)
                console.log(playerReaction.size)
                if (playerReaction.size) await playerReaction.first().users.remove(player.id)
            } else{
                bot.players.push(new Player(user.id, user.username, playerColour))
            }

            let messageContent = 'Please react to select your colour! \n\n'
            bot.players.map(player => messageContent += `${player.username} has selected -> ${player.colour}\n`)
            await playerSelect.edit(messageContent)
        })

        const invalidEmojiFilter = (reaction, user) => !Object.keys(bot.colours).includes(reaction.emoji.name) && !user.bot
        const invalidEmojiCollector = playerSelect.createReactionCollector(invalidEmojiFilter)
        invalidEmojiCollector.on('collect', r => {
            r.remove()
        })
    }
}