const playersDb = require("../db/playersDb")

//TODO: add validation on incoming data

module.exports = {
  handler: async (req) => {
    try {
      console.log("received request add goal")
      const { scoredBy, assistedBy } = req.body
      
      console.log("goal scored by", scoredBy)
      const goals = await playersDb.addGoal(scoredBy)
      console.info("new goal amount", goals)

      console.log("goal assisted by", assistedBy)
      const assists = await playersDb.addAssist(assistedBy)
      console.log("new assists amount", assists)

      return {
        statusCode: 200,
        body: {
          scoredBy: {
            number: scoredBy,
            goals,
          },
          assistedBy: {
            number: assistedBy,
            assists,
          },
        },
      }
    } catch (err) {
      console.error("Error processing goal request", err)
      throw { statusCode: 500, body: err.message }
    }
  }
}