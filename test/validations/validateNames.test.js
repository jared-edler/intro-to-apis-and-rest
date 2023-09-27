const { validate } = require("../../lib/validations/validateNames")
const randomString = require("random-string")

describe("validateNames", () => {
  test("fails when no names are provided", () => {
    const firstName = undefined
    const lastName = undefined
    const results = validate(firstName, lastName)
    expect(results).toEqual("firstName,lastName")
  })

  test("fails when no firstName is provided", () => {
    const firstName = undefined
    const lastName = randomString()
    const results = validate(firstName, lastName)
    expect(results).toEqual("firstName")
  })

  test("fails when no lastName is provided", () => {
    const firstName = randomString()
    const lastName = undefined
    const results = validate(firstName, lastName)
    expect(results).toEqual("lastName")
  })

  test("passes validation when both values are provided", () => {
    const firstName = randomString()
    const lastName = randomString()
    const results = validate(firstName, lastName)
    expect(results).toEqual("")
  })})