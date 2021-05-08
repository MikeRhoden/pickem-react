export function getUserPicksForEvent(eventWeek, eventYear, userId) {
    return fetch('http://big12pickem.com/rpc/pick/get/pick.asp?eventWeek=' + eventWeek + '&eventYear=' + eventYear + '&userId=' + userId)
      .then(data => data.json())
}