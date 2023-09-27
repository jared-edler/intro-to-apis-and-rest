const { validate } = require("../../lib/validations/validatePlayer")
const randomString = require("random-string")
const randomNumber = require("random-number")

const createPayload = () => {
  return {
    shirtNumber: randomNumber(),
    firstName: randomString(),
    lastName: randomString(),
    country: randomString(),
    fieldPosition: "forward",
    goals: randomNumber(),
    assists: randomNumber()
  }
}

describe("validatePlayer", () => {

  let playerObj
  beforeEach(() => {
    playerObj = createPayload()
  })

  test("fails when no shirtNumber is provided", () => {
    playerObj.shirtNumber = undefined
    const results = validate(playerObj)
    expect(results).toEqual("\"shirtNumber\" is required")
  })

  test("fails when shirtNumber is not a number", () => {
    playerObj.shirtNumber = randomString()
    const results = validate(playerObj)
    expect(results).toEqual("\"shirtNumber\" must be a number")
  })

  test("fails when no firstName is provided", () => {
    playerObj.firstName = undefined
    const results = validate(playerObj)
    expect(results).toEqual("\"firstName\" is required")
  })

  test("fails when firstName is not a string", () => {
    playerObj.firstName = randomNumber()
    const results = validate(playerObj)
    expect(results).toEqual("\"firstName\" must be a string")
  })

  test("fails when no lastName is provided", () => {
    playerObj.lastName = undefined
    const results = validate(playerObj)
    expect(results).toEqual("\"lastName\" is required")
  })

  test("fails when lastName is not a string", () => {
    playerObj.lastName = randomNumber()
    const results = validate(playerObj)
    expect(results).toEqual("\"lastName\" must be a string")
  })

  test("fails when no country is provided", () => {
    playerObj.country = undefined
    const results = validate(playerObj)
    expect(results).toEqual("\"country\" is required")
  })

  test("fails when country is not a string", () => {
    playerObj.country = randomNumber()
    const results = validate(playerObj)
    expect(results).toEqual("\"country\" must be a string")
  })

  test("fails when no fieldPosition is provided", () => {
    playerObj.fieldPosition = undefined
    const results = validate(playerObj)
    expect(results).toEqual("\"fieldPosition\" is required")
  })

  test("fails when fieldPosition is not a string", () => {
    playerObj.fieldPosition = randomNumber()
    const results = validate(playerObj)
    expect(results).toEqual("\"fieldPosition\" must be one of [goalkeeper, defender, midfielder, forward]")
  })

  test("fails when fieldPosition is not part of the controlled vocabulary", () => {
    playerObj.fieldPosition = randomString()
    const results = validate(playerObj)
    expect(results).toEqual("\"fieldPosition\" must be one of [goalkeeper, defender, midfielder, forward]")
  })
  
  test("fails when no goals are provided", () => {
    playerObj.goals = undefined
    const results = validate(playerObj)
    expect(results).toEqual("\"goals\" is required")
  })

  test("fails when goals are not a number", () => {
    playerObj.goals = randomString()
    const results = validate(playerObj)
    expect(results).toEqual("\"goals\" must be a number")
  })

  test("fails when no assists are provided", () => {
    playerObj.assists = undefined
    const results = validate(playerObj)
    expect(results).toEqual("\"assists\" is required")
  })

  test("fails when assists are not a number", () => {
    playerObj.assists = randomString()
    const results = validate(playerObj)
    expect(results).toEqual("\"assists\" must be a number")
  })

  test("passes validation", () => {
    const results = validate(playerObj)
    expect(results).toEqual(undefined)
  })
})