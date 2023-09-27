module.exports = {
  validate: (firstName, lastName) => {
    let paramArr = []
    if (!firstName || firstName.length === 0) {
      paramArr.push("firstName")
    }
    if (!lastName || lastName.length === 0) {
      paramArr.push("lastName")
    }
    return paramArr.join()
  }
}