const playersDb = require("../db/playersDb")
const validateNames = require("../validations/validateNames")

module.exports = {
  handler: async (req) => {
    try {
      const { firstName, lastName } = req.query

      const errors = validateNames.validate(firstName, lastName)
      if (errors !== "") {
        console.error("get players by name validation failed: ", errors)
        return { statusCode: 400, body: `Query param(s): ${errors} are required` }
      }

      const player = await playersDb.getPlayerByName(firstName, lastName)
      return { statusCode: 200, body: player }
    } catch (err) {
      console.error("Error fetching player by name", err)
      throw { statusCode: 500, body: err.message }
    }
  },
}
