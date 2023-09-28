const express = require("express")
const app = express()
const port = 3000

const getPlayers = require("./action/getPlayers")
const getPlayerByName = require("./action/getPlayerByName")
const createPlayer = require("./action/createPlayer")
const goalScored = require("./action/goalScored")

app.use(express.json())

const executeRoute = async (req, res, handlerFunc, errorMessage) => {
  try {
    const response = await handlerFunc(req)
    res.status(response.statusCode).json(response.body)
  } catch (err) {
    console.error(`Error executing route: ${errorMessage}`, err)
    res.status(500).send({ error: err.body ? err.body : err.message })
  }
}

app.get("/scorecard-api", (req, res) => {
  res.send("Hello world!")
})

app.get("/scorecard-api/players", async (req, res) => {
  await executeRoute(
    req,
    res,
    getPlayers.handler,
    "Error executing route: failed to get all players"
  )
})

app.get("/scorecard-api/player", async (req, res) => {
  await executeRoute(
    req,
    res,
    getPlayerByName.handler,
    "Error executing route: failed to get player by name"
  )
})

app.post("/scorecard-api/player", async (req, res) => {
  await executeRoute(
    req,
    res,
    createPlayer.handler,
    "Error executing route: failed to create new player"
  )
})

app.patch("/scorecard-api/goal-scored", async (req, res) => {
  await executeRoute(
    req,
    res,
    goalScored.handler,
    "Error executing route: failed to increment goal value"
  )
})

app.listen(port, () => {
  console.info(`Starting app on port ${port}`)
})
