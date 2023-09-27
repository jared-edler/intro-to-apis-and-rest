const playersDb = require("../db/playersDb")
const validatePlayer = require("../validations/validatePlayer")

module.exports = {
  handler: async (req) => {
    try {
      console.log("received request create new player")
      const newPlayer = req.body

      const validationErrors = validatePlayer.validate(newPlayer)
      if (validationErrors && validationErrors.length > 0) {
        return { statusCode: 400, body: `New player schema validation failed: ${validationErrors}` }
      }

      const player = await playersDb.createPlayer(newPlayer)
      return { statusCode: 200, body: player }
    } catch (err) {
      console.error("Error creating new player", err)
      throw { statusCode: 500, body: err.message }
    }
  }
}