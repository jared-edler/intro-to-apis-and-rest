const playersDb = require("../db/playersDb")

module.exports = {
  handler: async (req) => {
    try {
      console.log("received request to get all players")
      const players = await playersDb.getPlayers()
      return {statusCode: 200, body: players}
    } catch (err) {
      console.error("Error fetching all players", err)
      throw { statusCode: 500, body: err.message }
    }
  }
}