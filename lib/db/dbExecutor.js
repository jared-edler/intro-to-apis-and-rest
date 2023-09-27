const { Client } = require("pg")
const connectionString = "postgres://postgres:postgres@localhost:5432/gkkqy"

module.exports = {
  execute: async (sql, args = "") => {
    const client = new Client(connectionString)
    await client.connect()

    const result = await client.query(sql, args)
    console.log("db results", result.rows)

    await client.end()
    return result.rows
  }
}