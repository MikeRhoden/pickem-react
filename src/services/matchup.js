export function getMatchupsForEvent(eventWeek, eventYear) {
    return fetch('http://big12pickem.com/rpc/matchup/get/matchup.asp?eventWeek=' + eventWeek + '&eventYear=' + eventYear)
      .then(data => data.json())
}