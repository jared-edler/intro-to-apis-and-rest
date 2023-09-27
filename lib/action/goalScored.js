const playersDb = require("../db/playersDb")
const validateGoalScored = require("../validations/validateGoalScored")

//TODO: add validation on incoming data

module.exports = {
  handler: async (req) => {
    try {
      console.log("received request add goal")
      const { scoredBy, assistedBy } = req.body

      console.log("updating scoring info for #", scoredBy)
      console.log("updating assist info for #", assistedBy)

      const errors = validateGoalScored.validate(scoredBy, assistedBy)
      if (errors !== "" ) {
        console.error("update scoring values validation failed: ", errors)
        return { statusCode: 400, body: `Goal scored param(s): ${errors} are required` }
      }

      const goals = await playersDb.addGoal(scoredBy)
      const assists = await playersDb.addAssist(assistedBy)

      return {
        statusCode: 200,
        body: {
          scoredBy: {
            ...goals,
          },
          assistedBy: {
            ...assists,
          },
        },
      }
    } catch (err) {
      console.error("Error processing goal request", err)
      throw { statusCode: 500, body: err.message }
    }
  }
}