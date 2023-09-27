const playersDb = require("../db/playersDb")

module.exports = {
  handler: async (req) => {
    try {
      const { firstName, lastName } = req.query
      console.log("received request to get player", firstName, lastName)
      const player = await playersDb.getPlayerByName(firstName, lastName)
      return {statusCode: 200, body: player}
    } catch (err) {
      console.error("Error fetching player by name", err)
      throw { statusCode: 500, body: err.message }
    }
  }
}