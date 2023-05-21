import React, { useEffect, useState } from 'react'
import BowlEvent from './BowlEvent'

import { getMatchupsForEvent } from '../../services/matchup'
import { getUserPicksForEvent } from '../../services/picks'
import { IProposition } from '../../models/IProposition'
import { IEvent } from '../../models/IEvent'
import { IUserPicksForEvent } from '../../models/IUserPicksForEvent'
import { IMatchupForEvents } from '../../models/IMatchupForEvents'

interface IEventWrapperProps {
  event: IEvent;
  userId: string;
}

type BowlTierProperties = {
  group: string;
  tier: number;
  minUnitsAllowed: number;
  maxUnitsAllowed: number;
  required: boolean;
}

function GetBowlTierProperties(priority: number): BowlTierProperties {
  switch (priority) {
    case 1: return {
      group: "Tier 3",
      tier: 5,
      minUnitsAllowed: 0,
      maxUnitsAllowed: 30,
      required: false,
    }
    case 2: return {
      group: "Tier 2",
      tier: 4,
      minUnitsAllowed: 10,
      maxUnitsAllowed: 30,
      required: true,
    }
    case 3: return {
      group: "Tier 1",
      tier: 3,
      minUnitsAllowed: 30,
      maxUnitsAllowed: 50,
      required: true,
    }
    case 4: return {
      group: "Playoff",
      tier: 2,
      minUnitsAllowed: 50,
      maxUnitsAllowed: 50,
      required: true,
    }
    case 5: return {
      group: "Championship",
      tier: 1,
      minUnitsAllowed: 100,
      maxUnitsAllowed: 100,
      required: true,
    }
  }
}

export default function BowlEventWrapper(props: IEventWrapperProps) {
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
                const bowlTierProperties: BowlTierProperties = GetBowlTierProperties(x.priority)
                const minUnitsAllowed = bowlTierProperties.minUnitsAllowed
                const maxUnitsAllowed = bowlTierProperties.maxUnitsAllowed
                const group = bowlTierProperties.group
                const required = bowlTierProperties.required

                const utcStart = new Date(x.start)
                const localStart = new Date(utcStart.getTime() - (utcStart.getTimezoneOffset() * 60000))

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
                    'name': group,
                    'minUnitsAllowed': minUnitsAllowed,
                    'maxUnitsAllowed': maxUnitsAllowed
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
    <BowlEvent
      userId={userId}
      event={props.event}
      propositions={propositions} />
  )

}