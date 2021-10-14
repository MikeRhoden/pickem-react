import React, { useState, useReducer, MouseEvent, ChangeEvent } from 'react'
import ReactModal from 'react-modal'
import Group from '../Group/Group'
import './Event.css'
import { savePick } from '../../services/picks'
import { IProposition } from '../../models/IProposition'
import { IEvent } from '../../models/IEvent'

interface IAction {
  index: number;
  value: any;
  type: string;
}

function propositionsReducer(propositions: IProposition[], action: IAction) {
  // action types: deadlinePassed, tooLate, units, selection, isChanged, resetAllPicks, resetPick, backupPick
  // action index tells which proposition has changed
  // action value tells us the new value of the proposition property
  const p = propositions.slice()
  let proposition: IProposition
  let index: number;
  let value: any;

  index = action.index
  proposition = p[index]
  value = action.value

  switch (action.type) {
    case 'deadlinePassed':
      p.forEach(proposition => proposition.isTooLate = true)
      return p
    case 'tooLate':
      proposition.isTooLate = true
      return p
    case 'units':
      proposition.pick.units = value
      return p
    case 'selection':
      proposition.pick.selection = value
      return p
    case 'isChanged':
      proposition.pick.isChanged = value
      return p
    case 'resetAllPicks':
      p.forEach(proposition => {
        const originalPick = Object.assign({}, proposition.originalPick);
        proposition.pick = originalPick
        proposition.isTooLate = true
      });
      return p
    case 'resetPick':
      const originalPick = Object.assign({}, proposition.originalPick);
      proposition.pick = originalPick
      return p
    case 'backupPick':
      proposition.pick.isChanged = false
      const pick = Object.assign({}, proposition.pick)
      proposition.originalPick = pick
      return p
    default:
      throw new Error('Unknown action type.')
  }
}

interface IEventProps {
  userId: string;
  event: IEvent;
  propositions: IProposition[];
}

export default function Event(props: IEventProps) {
  const [isSaved, setIsSaved] = useState(true)
  const [propositions, dispatch] = useReducer(propositionsReducer, props.propositions)
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [modalContentLabel, setModalContentLabel] = useState('')
  const [modalContentElement, setModalContentElement] = useState(<> </>)

  const userId = props.userId
  const eventStart = props.event.start
  const eventId = props.event.id
  const [eventYear, eventWeek] = eventId.split('-')

  const maxUnits = props.event.maxUnits

  const requiredGames = propositions.filter(p => p.group.name === 'required')
  const optionalGames = propositions.filter(p => p.group.name === 'optional')

  const deadLine = setDeadLine(eventStart, eventYear, eventWeek)

  const sumTotalUnits = () => {
    const units = propositions.map((p) => {
      return Number(p.pick.units)
    })
    return units.reduce((sum, value) => {
      return sum + value
    })
  }
  const totalUnits = sumTotalUnits()

  const showModal = ((contenLabel: string, messages: string[]) => {
    setModalContentLabel(contenLabel)
    setModalContentElement(
      <div className="modal-content-container">
        <div className="modal-content">
          {messages.map((message) => {
            return <p key={message}>{message}</p>
          })}
          <button onClick={() => handleCloseModal()}>Ok</button>
        </div>
      </div>
    )
    setShouldShowModal(true)
  })

  const handleCloseModal = () => {
    setShouldShowModal(false)
  }

  const getPropositionProperties = (t: HTMLInputElement) => {
    const name = t.name.split('-')[0]
    const index = Number(t.name.split('-')[1]) - 1
    const value = t.value
    return {
      name,
      index,
      value
    }
  }

  const hasEventStarted = (): boolean => {
    const currentTime = new Date(Date.now())
    return currentTime > eventStart;
  }

  const dispatchEventHasStarted = (): void => {
    dispatch({ type: 'deadlinePassed', index: undefined, value: undefined })
  }

  const showModalForEventHasStarted = (): void => {
    showModal('Event has already started.', ['Event has already started.'])
  }

  const hasGameStarted = (start: Date): boolean => {
    const currentTime = new Date(Date.now())
    return currentTime > start
  }

  const dispatchGameHasStarted = (index: number): void => {
    dispatch({ type: 'tooLate', index: index, value: undefined })
  }

  const showModalForGameHasStarted = (index: number): void => {
    showModal('Can\'t change game.', ['Game ' + (index + 1) + ' has already started.'])
  }

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    const target: HTMLButtonElement = event.currentTarget
    const index = Number(target.name.split('-')[1]) - 1;

    if (hasEventStarted()) {
      dispatchEventHasStarted()
      showModalForEventHasStarted()
      return
    }

    const p = propositions.slice()
    const proposition = p[index]
    if (hasGameStarted(proposition.info.start)) {
      dispatchGameHasStarted(index)
      showModalForGameHasStarted(index)
      return
    }

    if (proposition.group.name === 'required') {
      dispatch({ type: 'selection', index: index, value: proposition.matchup.vis })
      dispatch({ type: 'units', index: index, value: proposition.group.minUnitsAllowed })
    }
    if (proposition.group.name === 'optional') {
      dispatch({ type: 'selection', index: index, value: '' })
      dispatch({ type: 'units', index: index, value: proposition.group.minUnitsAllowed })
    }
    dispatch({ type: 'isChanged', index: index, value: true })
    setIsSaved(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, index, value } = getPropositionProperties(e.target as HTMLInputElement)

    // event start new Date('September 4, 2010 10:00 AM')
    // const currentTime = new Date('September 1, 2010 10:00 AM')
    if (hasEventStarted()) {
      dispatchEventHasStarted()
      showModalForEventHasStarted()
      return
    }

    const p = propositions.slice()
    const proposition = p[index]
    if (hasGameStarted(proposition.info.start)) {
      dispatchGameHasStarted(index);
      showModalForGameHasStarted(index);
      return
    }

    if (name === 'units') {
      dispatch({ type: 'units', index: index, value: value })
    }

    if (name === 'matchup') {
      dispatch({ type: 'selection', index: index, value: value })
    }

    dispatch({ type: 'isChanged', index: index, value: true })
    setIsSaved(false)
  }

  const handleSave = () => {
    //event start new Date('September 4, 2010 10:00 AM')
    //const currentTime = new Date('September 1, 2010 10:00 AM')
    const currentTime: Date = new Date(Date.now())
    if (currentTime > eventStart) {
      dispatch({ type: 'resetAllPicks', index: undefined, value: undefined })
      showModal('Event has already started.', ['Event has already started.'])
      return
    }

    let messages = [];
    let invalid = false
    const p = propositions.slice()
    let index = 0;
    for (let proposition of p) {
      if (proposition.pick.isChanged && (currentTime > proposition.info.start)) {
        messages.push(proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game has already started.')
        dispatch({ type: 'resetPick', index: index, value: undefined })
        dispatch({ type: 'tooLate', index: index, value: undefined })
        invalid = true
      }

      if (proposition.pick.selection === '' && proposition.pick.units > 0) {
        messages.push('Can\'t save. Please make a pick for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')
        invalid = true
      }

      if (proposition.pick.selection !== '' && proposition.pick.units === 0) {
        messages.push('Can\'t save. Please select units for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')
        invalid = true
      }
      index++;
    }

    if (totalUnits > maxUnits) {
      messages.push('Can\'t save. You are over 200 units.')
      invalid = true
    }

    if (invalid) {
      showModal('Can\'t save.', messages)
      return
    }

    index = 0;
    for (let proposition of p) {
      if (proposition.pick.isChanged) {
        dispatch({ type: 'backupPick', index: index, value: undefined })
        savePick({
          userId: userId,
          week: parseInt(eventWeek),
          game: proposition.matchup.number,
          pick: proposition.pick.selection,
          value: proposition.pick.units,
          year: Number(eventYear)
        })
      }
      index++;
    }
    setIsSaved(true)
  }

  return (
    <div className="event">
      {deadLine}
      <div className="group1">
        <Group
          isSaved={isSaved}
          groupName={'Required Games'}
          propositions={requiredGames}
          maxUnits={maxUnits}
          totalUnits={totalUnits}
          onClear={(e: MouseEvent<HTMLButtonElement>) => handleClear(e)}
          onChange={(e: ChangeEvent<HTMLElement>) => handleChange(e)}
          onSave={() => handleSave()} />
      </div>
      <div className="group2">
        <Group
          isSaved={isSaved}
          groupName={'Optional Games'}
          propositions={optionalGames}
          maxUnits={maxUnits}
          totalUnits={totalUnits}
          onClear={(e: MouseEvent<HTMLButtonElement>) => handleClear(e)}
          onChange={(e: ChangeEvent<HTMLElement>) => handleChange(e)}
          onSave={() => handleSave()} />
      </div>
      <ReactModal
        appElement={document.querySelector('.event')}
        isOpen={shouldShowModal}
        contentLabel={modalContentLabel}
        contentElement={() => modalContentElement} >
      </ReactModal>
    </div>
  )
}

function setDeadLine(eventStart: Date, eventYear: string, eventWeek: string) {
  const gridLink = (
    <a href={'http://big12pickem.com/results_grid_' + eventYear + '.asp?w=' + eventWeek}
      target="_blank" rel="noreferrer">View Grid</a>
  )
  const currentTime = new Date(Date.now())
  const tooLate = currentTime > eventStart
  const user = sessionStorage.getItem('user')
  const userString = JSON.parse(user)
  const firstName = userString?.FirstName
  if (tooLate) {
    return (
      <div className="deadline">Hi {firstName}! The pick deadline has passed: {gridLink}</div>
    )
  }
  const dateEventStart = new Date(eventStart)
  const deadlineDayTime = getDayOfWeekEn(dateEventStart) + ' ' + dateEventStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className="deadline">Hi {firstName}! Make picks by {deadlineDayTime}</div>
  )

  function getDayOfWeekEn(date: Date) {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }
}
