function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText)
  }
  return response
}

export async function getUserPicksForEvent(eventWeek, eventYear, userId) {
  return fetch('http://big12pickem.com/rpc/pick/get/pick.asp?eventWeek=' + eventWeek + '&eventYear=' + eventYear + '&userId=' + userId)
  .then(handleErrors)
  .then(data => data.json())
  .catch(e => {
    if (e.message === 'Not Found')
      return []
    return Promise.reject()
  })
}

export async function savePick(pick) {
  let qs = 'userID=' + pick.userId
  qs += '&week=' + pick.week
  qs += '&year=' + pick.year
  qs += '&game=' + pick.game
  qs += '&pick=' + pick.pick 
  qs += '&value=' + pick.value
  return fetch('http://big12pickem.com/rpc/pick/put/pick.asp?' + qs)
  .then(handleErrors)
  .then(data => data.json())
}