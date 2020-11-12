module.exports = {
    name: 'dead',
    description: 'Mark players as dead',
    hostPermission: true,
    async execute(msg, args){
        const { players, coloursById } = require('../bot')

        if(msg.mentions.users.size){
            for(let user in msg.mentions.members.entries()){
                const player = players.find(player => player.id === user.id)
                player.isAlive = false
            }
        }
        else{
            let validColours = Object.values(coloursById)
            for(let colour of args){
                if(validColours.includes(colour.toUpperCase())){
                    const player = players.find(player => player.colour === colour.toUpperCase())
                    player.isAlive = false
                }
            }
        }

        await require('./disc').execute(msg)
    }
}