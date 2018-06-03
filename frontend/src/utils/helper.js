import moment from 'moment'

export function ID() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function dateFormat(timestamp) {
  return moment(timestamp).fromNow()
}
