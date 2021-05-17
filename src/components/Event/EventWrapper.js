import { React, useEffect, useState } from 'react'
import Event from './Event'

import { getMatchupsForEvent } from '../../services/matchup'
import { getUserPicksForEvent } from '../../services/picks'

export default function EventWrapper(props) {
    const [ propositions, setPropositions ] = useState([])
    const eventId = props.event.id
    const eventStart = props.event.start
    const [eventYear, eventWeek] = eventId.split('-')
    const eventLoadTime = new Date('September 1, 2010 09:59:00') //todo: change this to new Date(Date.now())
    const isTooLate = eventLoadTime > eventStart

    useEffect(() => {
        let mounted = true
        getMatchupsForEvent(eventWeek, eventYear)
            .then(items => {
                if(mounted) {
                    const matchups = items
                    getUserPicksForEvent(eventWeek, eventYear, '00027')
                    .then(items => {
                        const picks = items;
                        const p = matchups.map( x => {               
                            const pick = picks.find( pick => pick.game === x.game )
                            let selection = '', units = 0
                            if (pick !== undefined) {
                                selection = pick.pick
                                units = pick.value
                        }
                
                        const y = {
                            'key': eventYear + '-' + eventWeek + '-' + x.game,
                            'isTooLate': new Date(x.start) < eventLoadTime || isTooLate,
                            'matchup': {
                                'number': x.game,
                                'home': x.home,
                                'ho': x.ho,
                                'visitor': x.visitor,
                                'vis': x.vis,
                                'favorite': x.favorite === 0 ? x.vis : x.ho,
                                'spread': x.line
                            },
                            'info': {
                                'start': new Date(x.start),
                                'note': x.note,
                                'pickEarly': new Date(x.start) < eventStart
                            },
                            'group': {
                                'name': x.game < 11 ? 'required' : 'optional',
                                'minUnitsAllowed': x.game < 11 ? 10 : 0,
                                'maxUnitsAllowed': 30
                            },
                            'pick':  { 
                                'selection': selection,
                                'units': units
                            }     
                        }
                        return y;
                        })
                        setPropositions(p)
                    })
                }
            })

        return () => { 
            mounted = false
        }
    })

    if (propositions.length === 0) {
        return (
            <div>LOADING ...</div>
        )
    }

    return (
        <Event
            event={props.event}
            propositions={propositions} />
    )

}