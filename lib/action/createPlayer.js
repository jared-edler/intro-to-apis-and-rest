const playersDb = require("../db/playersDb")

//TODO: add validation on incoming data

module.exports = {
  handler: async (req) => {
    try {
      console.log("received request create new player")
      const newPlayer = req.body
      console.log("new player", newPlayer)
      const player = await playersDb.createPlayer(newPlayer)
      console.info("created player", player)
      return {statusCode: 200, body: player}
    } catch (err) {
      console.error("Error creating new player", err)
      throw { statusCode: 500, body: err.message }
    }
  }
}