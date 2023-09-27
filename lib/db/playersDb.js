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
    const results = await dbExecutor.execute(sql, [firstName, lastName])
    return results[0]
  },

  createPlayer: async (newPlayer) => {
    console.log("creating new player")
    const values = [
      `${newPlayer.shirtNumber}`,
      `${newPlayer.firstName}`,
      `${newPlayer.lastName}`,
      `${newPlayer.country}`,
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
    const results = await dbExecutor.execute(sql, values)
    return results[0]
  },

  addGoal: async (shirtNumber) => {
    console.log("incrementing goal counter for shirt_number", shirtNumber)
    const sql = "update stl_city_players set goals = goals + 1 where shirt_number = $1 returning goals, first_name, last_name, shirt_number"
    const results = await dbExecutor.execute(sql, [shirtNumber])
    return results[0]
  },

  addAssist: async (shirtNumber) => {
    console.log("incrementing assist counter for shirt_number", shirtNumber)
    const sql = "update stl_city_players set assists = assists + 1 where shirt_number = $1 returning assists, first_name, last_name, shirt_number"
    const results = await dbExecutor.execute(sql, [shirtNumber])
    return results[0]
  }
}