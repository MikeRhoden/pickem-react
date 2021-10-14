export function getMatchupsForEvent(eventWeek: string, eventYear: string) {
  return fetch('http://big12pickem.com/rpc/matchup/get/matchup.asp?eventWeek=' + eventWeek + '&eventYear=' + eventYear)
    .then(data => data.json())
}