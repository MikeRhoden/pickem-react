export default function MockPropositions(mockLoadEventTimeStamp, isTooLate? = false) {
    const p = [
        {
            'visitor': 'Auburn',
            'vis': 'AUB',
            'home': 'Alabama',
            'ho': 'BAMA',
            'favorite': 'BAMA',
            'spread': 19.5,
            'note': '',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 1
        },        
        {
            'visitor': 'Ohio St',
            'vis': 'OHSU',
            'home': 'Michigan',
            'ho': 'MICH',
            'favorite': 'OHSU',
            'spread': 9.5,
            'note': '',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 2
        },
        {
            'visitor': 'Clemson',
            'vis': 'CLEM',
            'home': 'Miami',
            'ho': 'MIA',
            'favorite': 'CLEM',
            'spread': 13.5,
            'note': '',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 3
        },
        {
            'visitor': 'Southern California',
            'vis': 'USC',
            'home': 'UCLA',
            'ho': 'UBLA',
            'favorite': 'USC',
            'spread': 8.5,
            'note': '',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 4
        },        
        {
            'visitor': 'Georgia',
            'vis': 'UGA',
            'home': 'Florida',
            'ho': 'FLA',
            'favorite': 'FLA',
            'spread': 5.5,
            'note': 'Jacksonville, FL',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 5
        },
        {
            'visitor': 'Texas Tech',
            'vis': 'TXTC',
            'home': 'Baylor',
            'ho': 'BAY',
            'favorite': 'BAY',
            'spread': 0.5,
            'note': '',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 6
        },
        {
            'visitor': 'West Virginia',
            'vis': 'WV',
            'home': 'Texas Christian',
            'ho': 'TCU',
            'favorite': 'TCU',
            'spread': 4.5,
            'note': '',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 7
        },        
        {
            'visitor': 'Iowa St',
            'vis': 'ISU',
            'home': 'Oklahoma St',
            'ho': 'OKSU',
            'favorite': 'ISU',
            'spread': 2.5,
            'note': '',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 8
        },        
        {
            'visitor': 'Texas',
            'vis': 'UT',
            'home': 'Oklahoma',
            'ho': 'OU',
            'favorite': 'OU',
            'spread': 2.5,
            'note': 'Dallas, TX',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 9
        },
        {
            'visitor': 'Kansas St',
            'vis': 'KSU',
            'home': 'Kansas',
            'ho': 'KU',
            'favorite': 'KSU',
            'spread': 16.5,
            'note': 'Sunflower Showdown',
            'start': '',
            'min': 10,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 10
        },
        {
            'visitor': 'Boise St',
            'vis': 'BSU',
            'home': 'Washington',
            'ho': 'WAZ',
            'favorite': 'BSU',
            'spread': 2.5,
            'note': '',
            'start': 'pick by 9/3 7:00 PM',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 11
        },        
        {
            'visitor': 'Louisiana St',
            'vis': 'LSU',
            'home': 'Wisconsin',
            'ho': 'WIS',
            'favorite': 'LSU',
            'spread': 7.5,
            'note': 'Houston, TX',
            'start': 'pick by 9/4 7:00 PM',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 12
        },
        {
            'visitor': 'Iowa',
            'vis': 'IOWA',
            'home': 'Duke',
            'ho': 'DUKE',
            'favorite': 'IOWA',
            'spread': 3.5,
            'note': '',
            'start': '',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 13
        },
        {
            'visitor': 'San Diego St',
            'vis': 'SDSU',
            'home': 'Hawaii',
            'ho': 'HAW',
            'favorite': 'SDSU',
            'spread': 18.5,
            'note': '',
            'start': '',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 14
        },        
        {
            'visitor': 'Central Florida',
            'vis': 'UCF',
            'home': 'South Florida',
            'ho': 'USF',
            'favorite': 'UCF',
            'spread': 25.5,
            'note': '',
            'start': '',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 15
        },
        {
            'visitor': 'Colorado',
            'vis': 'CU',
            'home': 'Colorado St',
            'ho': 'CSU',
            'favorite': 'CU',
            'spread': 3.5,
            'note': 'Denver, CO',
            'start': '',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 16
        },
        {
            'visitor': 'Arizona',
            'vis': 'ZONA',
            'home': 'Houston',
            'ho': 'HOU',
            'favorite': 'HOU',
            'spread': 9.5,
            'note': '',
            'start': '',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 17
        },        
        {
            'visitor': 'Missouri',
            'vis': 'MIZ',
            'home': 'Kentucky',
            'ho': 'UK',
            'favorite': 'MIZ',
            'spread': 12.5,
            'note': '',
            'start': '',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 18
        },        
        {
            'visitor': 'Virginia Tech',
            'vis': 'VATC',
            'home': 'Maryland',
            'ho': 'UMD',
            'favorite': 'VATC',
            'spread': 6.5,
            'note': '',
            'start': '',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 19
        },
        {
            'visitor': 'Appalachain St',
            'vis': 'APP',
            'home': 'Marshall',
            'ho': 'MAR',
            'favorite': 'APP',
            'spread': 6.5,
            'note': '',
            'start': '',
            'min': 0,
            'max': 30,
            'year': 2020,
            'week': 1,
            'game': 20
        }
    ]

    return p.map( (x) => {
        const y = {
            'key': x.year + '-' + x.week + '-' + x.game,
            'isTooLate': setStart(x.game) < mockLoadEventTimeStamp || isTooLate,
            'matchup': {
                'number': x.game,
                'home': x.home,
                'ho': x.ho,
                'visitor': x.visitor,
                'vis': x.vis,
                'favorite': x.favorite,
                'spread': x.spread
            },
            'pick':  { 
                'selection': x.game % 2 === 0 ? x.ho : x.vis,
                'units': x.game < 11 ? 15 : 5,
                'isChanged': false
            },
            'info': {
                'start': setStart(x.game),
                'note': x.note,
                'pickEarly': setPickEarly(x.game)
            },
            'group': {
                'name': x.game < 11 ? 'required' : 'optional',
                'minUnitsAllowed': x.min,
                'maxUnitsAllowed': x.max
            }
        }
        return { ...x, ...y }
    })
}

const earlierStart = new Date('September 4, 2020 19:30:00')
const earlyStart = new Date('September 5, 2020 19:30:00')
const eventStart = new Date('September 6, 2020 11:00:00')
const lateStart = new Date('September 6, 2020 12:00:00')

function setStart(game) {
    if (game < 6)
        return eventStart
    else if (game < 11)
        return lateStart
    else if (game === 11)
        return earlierStart
    else if (game === 12)
        return earlyStart
    else
        return lateStart
}

function setPickEarly(game) {
    const start = setStart(game)
    if (start < eventStart)
        return true
    return false
}