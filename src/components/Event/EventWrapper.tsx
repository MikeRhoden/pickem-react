import React, { useEffect, useState } from 'react'
import Event from './Event'

import { getMatchupsForEvent } from '../../services/matchup'
import { getUserPicksForEvent } from '../../services/picks'
import { IProposition } from '../../models/IProposition'
import { IEvent } from '../../models/IEvent'
import { IUserPicksForEvent } from '../../models/IUserPicksForEvent'

interface IEventWrapperProps {
  event: IEvent;
  userId: string;
}

interface IMatchupForEvents {
  game: number
  home: string
  ho: string;
  visitor: string;
  vis: string;
  favorite: number;
  line: number;
  start: Date;
  note: string;
  winner: number;
  priority: number;
}

export default function EventWrapper(props: IEventWrapperProps) {
  const [propositions, setPropositions] = useState<IProposition[]>([])
  const eventId = props.event.id
  const [eventYear, eventWeek] = eventId.split('-')
  const eventStart = props.event.start
  const eventLoadTime = new Date(Date.now())
  const userId = props.userId
  const isTooLate = eventLoadTime > eventStart

  useEffect(() => {
    let mounted = true
    getMatchupsForEvent(eventWeek, eventYear)
      .then(items => {
        if (mounted) {
          const matchups: IMatchupForEvents[] = items
          getUserPicksForEvent(eventWeek, eventYear, userId)
            .then(items => {
              const picks: IUserPicksForEvent[] = items;
              const p = matchups.map((x: IMatchupForEvents) => {
                let selection = '', units = 0
                if (picks.length > 0) {
                  const pick = picks.find(pick => pick.game === x.game)
                  if (pick !== undefined) {
                    selection = pick.pick
                    units = pick.value
                  }
                }
                const minUnitsAllowed = x.game < 11 ? 10 : 0
                const utcStart = new Date(x.start)
                const localStart = new Date(utcStart.getTime() - (utcStart.getTimezoneOffset() * 60000));
                const required = x.game < 11
                let isChanged = false
                if (selection === '' && required) {
                  selection = x.vis
                  isChanged = true
                }

                const currentTime = new Date(Date.now())

                const y = {
                  'key': eventYear + '-' + eventWeek + '-' + x.game,
                  'isTooLate': localStart < currentTime || isTooLate,
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
                    'start': localStart,
                    'note': x.note,
                    'pickEarly': localStart < eventStart
                  },
                  'group': {
                    'name': required ? 'required' : 'optional',
                    'minUnitsAllowed': minUnitsAllowed,
                    'maxUnitsAllowed': 30
                  },
                  'pick': {
                    'selection': selection,
                    'units': units >= minUnitsAllowed ? units : minUnitsAllowed,
                    'isChanged': isChanged
                  },
                  'originalPick': {
                    'selection': selection,
                    'units': units >= minUnitsAllowed ? units : minUnitsAllowed,
                    'isChanged': isChanged
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
  }, [eventStart, eventWeek, eventYear, isTooLate, userId])

  if (propositions.length === 0) {
    return (
      <div>LOADING ...</div>
    )
  }

  return (
    <Event
      userId={userId}
      event={props.event}
      propositions={propositions} />
  )

}