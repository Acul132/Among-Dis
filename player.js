module.exports = class Player{
    constructor(id, username, colour){
        this.id = id
        this.username = username
        this.colour = colour
        this.isAlive = true
        this.changingColour = false
    }

    toggleAlive(){
        isAlive = !isAlive
    }

    changeColour(newColour){
        this.colour = newColour
    }

    getColour(){
        return this.colour
    }

    isAlive(){
        return isAlive
    }
}