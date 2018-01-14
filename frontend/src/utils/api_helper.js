const baseUrl = 'http://localhost:3001'

export function api( url, method ) {
  fetch(
    (baseUrl + url),
    {
      method: 'GET',
      headers: { 'Authorization': 'whatever' },
    }
  )
}

export default api