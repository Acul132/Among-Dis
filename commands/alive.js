module.exports = {
    name: 'alive',
    description: 'Mark players as alive',
    hostPermission: true,
    async execute(msg, args){
        const { players, coloursById } = require('../bot')

        if(msg.mentions.users.size){
            for(let user in msg.mentions.members.entries()){
                const player = players.find(player => player.id === user.id)
                player.isAlive = true
            }
        }
        else{
            let validColours = Object.values(coloursById)
            for(let colour of args){
                if(validColours.includes(colour.toUpperCase())){
                    const player = players.find(player => player.colour === colour.toUpperCase())
                    player.isAlive = true
                }
            }
        }

        await require('./disc').execute(msg)
    }
}