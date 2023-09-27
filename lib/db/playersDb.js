const dbExecutor = require("./dbExecutor")

module.exports = {
  getPlayers: async () => {
    console.log("fetching all players")
    const sql = `select * from stl_city_players`
    return await dbExecutor.execute(sql)
  },

  getPlayerByName: async (firstName, lastName) => {
    console.log("fetching player by name")
    const sql = `select * from stl_city_players where first_name = $1 and last_name = $2`
    return await dbExecutor.execute(sql, [firstName, lastName])
  },

  createPlayer: async (newPlayer) => {
    console.log("creating new player")
    const values = [
      `${newPlayer.shirtNumber}`,
      `${newPlayer.firstName}`,
      `${newPlayer.lastName}`,
      `${newPlayer.county}`,
      `${newPlayer.fieldPosition}`,
      `${newPlayer.goals}`,
      `${newPlayer.assists}`,
    ]
    const sql = `insert into stl_city_players (
          shirt_number,
          first_name,
          last_name,
          country,
          field_position,
          goals,
          assists
    ) values ($1, $2, $3, $4, $5, $6, $7) returning shirt_number`
    return await dbExecutor.execute(sql, values)
  },

  addGoal: async (shirtNumber) => {
    console.log("incrementing goal counter for shirt_number", shirtNumber)
    const sql = "update stl_city_players set goals = goals + 1 where shirt_number = $1 returning goals"
    return await dbExecutor.execute(sql, [shirtNumber])
  },

  addAssist: async (shirtNumber) => {
    console.log("incrementing assist counter for shirt_number", shirtNumber)
    const sql = "update stl_city_players set assists = assists + 1 where shirt_number = $1 returning assists"
    return await dbExecutor.execute(sql, [shirtNumber])
  }
}