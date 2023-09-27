const express = require("express")
const app = express()
const port = 3000
const routeBase = "/demo-api"

const getPlayers = require("./action/getPlayers")
const getPlayerByName = require("./action/getPlayerByName")
const createPlayer = require("./action/createPlayer")
const goalScored = require("./action/goalScored")

app.use(express.json())

app.get(routeBase, (req, res) => {
  res.send("Hello world!")
})

app.get(`${routeBase}/players`, async (req, res) => {
  try {
    const response = await getPlayers.handler(req)
    res.status(response.statusCode).json(response.body)
  } catch (err) {
    const errMessage = "Error executing route: failed to get all players"
    console.error(errMessage, err)
    res.status(500).send(errMessage)
  }
})

app.get(`${routeBase}/player`, async (req, res) => {
  try {
    const response = await getPlayerByName.handler(req)
    res.status(response.statusCode).json(response.body)
  } catch (err) {
    const errMessage = "Error executing route: failed to get player by name"
    console.error(errMessage, err)
    res.status(500).send(errMessage)
  }
})

app.post(`${routeBase}/player`, async (req, res) => {
  try {
    const response = await createPlayer.handler(req)
    res.status(response.statusCode).json(response.body)
  } catch (err) {
    const errMessage = "Error executing route: failed to create new player"
    console.error(errMessage, err)
    res.status(500).send(errMessage)
  }
})

app.patch(`${routeBase}/goal-scored`, async (req, res) => {
  try {
    const response = await goalScored.handler(req)
    res.status(response.statusCode).json(response.body)
  } catch (err) {
    const errMessage = "Error executing route: failed to increment goal value"
    console.error(errMessage, err)
    res.status(500).send(errMessage)
  }
})

app.listen(port, () => {
  console.info(`Starting app on port ${port}`)
})