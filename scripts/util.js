exports.camelize = (str) => {
  str = String(str)
  return str.replace(/-(\w)/g, function (m, c) {
    return c ? c.toUpperCase() : ''
  })
}

exports.createApiName = (str) => {
  str = str.replace(str[0], str[0].toUpperCase())
  return exports.camelize(str)
}
