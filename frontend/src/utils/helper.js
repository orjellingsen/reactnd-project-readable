export const ID = function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1)
