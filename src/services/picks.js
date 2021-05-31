function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText)
  }
  return response
}

export function getUserPicksForEvent(eventWeek, eventYear, userId) {
  return fetch('http://big12pickem.com/rpc/pick/get/pick.asp?eventWeek=' + eventWeek + '&eventYear=' + eventYear + '&userId=' + userId)
  .then(handleErrors)
  .then(data => data.json())
  .catch(e => {
    if (e.message === 'Not Found')
      return []
    return Promise.reject()
  })
}