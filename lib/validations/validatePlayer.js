const Joi = require("joi")

module.exports = {
  validate: (playerObj) => {
    const schema = Joi.object({
      shirtNumber: Joi.number().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      country: Joi.string().required(),
      fieldPosition: Joi.string()
        .valid("goalkeeper", "defender", "midfielder", "forward")
        .required(),
      goals: Joi.number().required(),
      assists: Joi.number().required(),
    })

    try {
      const validationResult = schema.validate(playerObj)
      if (validationResult.error && validationResult.error.message) {
        return validationResult.error.message
      }
    } catch (err) {
      return err
    }
  },
}
