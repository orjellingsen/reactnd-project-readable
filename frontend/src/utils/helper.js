export const ID = function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)
