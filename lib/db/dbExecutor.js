const { Client } = require("pg")
const conString = "postgres://postgres:postgres@localhost:5432/gkkqy"

module.exports = {
  execute: async (sql, args = "") => {
    const client = new Client(conString)
    await client.connect()

    const result = await client.query(sql, args)
    console.log("db results", result.rows)

    await client.end()
    return result.rows
  }
}