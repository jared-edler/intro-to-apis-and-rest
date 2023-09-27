const { validate } = require("../../lib/validations/validateGoalScored")
const randomNumber = require("random-number")
const randomString = require("random-string")

describe("validateGoalScored", () => {
  test("fails when scoredBy and assistedBy are not provided", () => {
    const scoredBy = undefined
    const assistedBy = undefined
    const results = validate(scoredBy, assistedBy)
    expect(results).toEqual("scoredBy,assistedBy")
  })

  test("fails when scoredBy is not provided", () => {
    const scoredBy = undefined
    const assistedBy = randomNumber()
    const results = validate(scoredBy, assistedBy)
    expect(results).toEqual("scoredBy")
  })

  test("fails when assistedBy is not provided", () => {
    const scoredBy = randomNumber()
    const assistedBy = undefined
    const results = validate(scoredBy, assistedBy)
    expect(results).toEqual("assistedBy")
  })

  test("fails when scoredBy is not a number", () => {
    const scoredBy = randomString()
    const assistedBy = randomNumber()
    const results = validate(scoredBy, assistedBy)
    expect(results).toEqual("scoredBy")
  })

  test("fails when assistedBy is not a number", () => {
    const scoredBy = randomNumber()
    const assistedBy = randomString()
    const results = validate(scoredBy, assistedBy)
    expect(results).toEqual("assistedBy")
  })

  test("passes validation when both values are provided and are numbers", () => {
    const scoredBy = randomNumber()
    const assistedBy = randomNumber()
    const results = validate(scoredBy, assistedBy)
    expect(results).toEqual("")
  })
})