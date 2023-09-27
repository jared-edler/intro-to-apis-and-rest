module.exports = {
  validate: (scoredBy, assistedBy) => {
    let paramArr = []
    if (!scoredBy || typeof scoredBy !== "number") {
      paramArr.push("scoredBy")
    }
    if (!assistedBy || typeof assistedBy !== "number") {
      paramArr.push("assistedBy")
    }
    return paramArr.join()
  },
}
