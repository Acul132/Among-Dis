
const createLobbyMessage = (lobbyCode, map, currentPhase = "Creating Lobby") => {
    const bot = require('./bot')
    const phaseColours = {
        "Creating Lobby" : "#7FE4FF",
        "Playing" : "#26EC41",
        "Discussion" : "#FA4D3C",
        "End of round lobby" : "#7FE4FF"
    }

    const message = {
        title: "Among Us Lobby",
        description: `Current Phase: ${currentPhase}`,
        color: phaseColours[currentPhase],
        fields: [
            {
                name: `Lobby Code: ${lobbyCode.toUpperCase()}  |  Map: ${map.toUpperCase()}`,
                value: '\u200B'
            }
        ],
        thumbnail: {
            url: bot.mapImageUrls[map.toUpperCase()]
        },
        footer: {
            text: "Select a reaction to choose your colour!"
        }
    }

    for(let player of bot.players){
        message.fields.push(
        {
            name: '\u200B',
            value: `<@${player.id}> has chosen <:${player.colour}:${bot.coloursByName[player.colour]}>
            Current Status: ${player.isAlive ? "Alive" : "Dead"}`
        })
    }

    return message
}

exports.createLobbyMessage = createLobbyMessage