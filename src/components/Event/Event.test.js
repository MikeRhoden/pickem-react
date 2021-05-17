import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import MockPropositions from './MockPropositions'
import Event from './Event'
import userEvent from '@testing-library/user-event'

describe('Event use cases (with all games selected and max units selected)', () => {
    // test save
    // test change by mocking current time
    //      can try to mock current time 
    //      by passing  get curren time as fn
    //      - past event start
    //      - past proposition start
    //      - test event-units
    // test group names and group length
    // test count of propositions

    // times to test based on MockPropositions
    const earliestLoadTime = new Date('September 1, 2020 10:00 AM')
    const earliestSaveTime = new Date('September 1, 2020 10:10 AM')
    const pastEarlierStartTime = new Date('September 4, 2020 19:31:00')
    const pastEarlyStartTime = new Date('September 5, 2020 19:31:00')
    const beforeEventStartTime = new Date('September 6, 2020 10:59:00')
    const pastEventStartTime = new Date('September 6, 2020 11:01:00')

    let event = {
        id: '2010-1',
        start: new Date('September 6, 2020 11:00:00'),
        name: 'Pickem 2010: Week 1',
        maxUnits: 200
    }

    test('Event loaded after event start should disable all matchups.', () => {

        const isToolateForEvent = true
        const propositions = MockPropositions(pastEventStartTime, isToolateForEvent)
        const dummyCurrentTime = () => { return new Date() }

        render(<Event
            event={event}
            propositions={propositions}
            getCurrentTime={() => dummyCurrentTime()} />)

        const someRadioButton = screen.getByRole('radio', { name: /washington/i })
        const allPropositionElements = someRadioButton.closest('.event').querySelectorAll('.proposition')
        allPropositionElements.forEach(propositionElement => {
            expectPropositionToBeDisabled(propositionElement)
        });
    })

    test('Event loaded before event start and saved after event start should alert and disable all matchups.', () => {
        //this isn't working as expected.
        const propositions = MockPropositions(beforeEventStartTime)
        const mockGetCurrentTimeAsPastEventStartTime = () => { return pastEventStartTime }

        render(<Event
            event={event}   
            propositions={propositions}
            getCurrentTime={() => mockGetCurrentTimeAsPastEventStartTime()} />)

        const homeRadioForLateGame = screen.getByRole('radio', { name: /duke/i })
        const enabledPropositionElement = homeRadioForLateGame.closest('.proposition')
        expectPropositionToBeEnabled(enabledPropositionElement)
        const saveButton = screen.queryAllByRole('button', {name: /save/i})[0]

        expect(saveButton).toBeDisabled()
        userEvent.click(homeRadioForLateGame)
        userEvent.click(saveButton)

        expect(screen.getByText('Event has already started.')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Event has already started.')).not.toBeInTheDocument()

        const someRadioButton = screen.getByRole('radio', { name: /duke/i })
        const allPropositionElements = someRadioButton.closest('.event').querySelectorAll('.proposition')
        allPropositionElements.forEach(propositionElement => {
            expectPropositionToBeDisabled(propositionElement)
        });

    })

    test('Event loaded before event start and changed after event start should alert and disable all matchups.', () => {

        const propositions = MockPropositions(beforeEventStartTime)
        const mockGetCurrentTimeAsPastEventStartTime = () => { return pastEventStartTime }

        render(<Event
            event={event}
            propositions={propositions}
            getCurrentTime={() => mockGetCurrentTimeAsPastEventStartTime()} />)

        const homeRadioForLateGame = screen.getByRole('radio', { name: /duke/i })
        const enabledPropositionElement = homeRadioForLateGame.closest('.proposition')
        expectPropositionToBeEnabled(enabledPropositionElement)

        userEvent.click(homeRadioForLateGame)

        expect(screen.getByText('Event has already started.')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Event has already started.')).not.toBeInTheDocument()

        const someRadioButton = screen.getByRole('radio', { name: /duke/i })
        const allPropositionElements = someRadioButton.closest('.event').querySelectorAll('.proposition')
        allPropositionElements.forEach(propositionElement => {
            expectPropositionToBeDisabled(propositionElement)
        });

    })

    test('Event loaded after matchup start and before event start should disable matchup change or selection.', () => {
        const propositions = MockPropositions(pastEarlyStartTime)
        const dummyCurrentTime = () => { return new Date() }

        render(<Event
            event={event}
            propositions={propositions}
            getCurrentTime={() => dummyCurrentTime()} />)

        const propositionElement = screen.getByRole('radio', { name: /washington/i }).closest('.proposition')
        expectPropositionToBeDisabled(propositionElement)        
    })
    
    test('Event loaded before matchup start and saved after matchup start should alert and disable change for matchup.', async () => {
        const propositions = MockPropositions(earliestLoadTime)
        const mockGetCurrentTimeAsPastMatchupStart = () => { return pastEarlierStartTime }

        render(<Event
            event={event}
            propositions={propositions}
            getCurrentTime={() => mockGetCurrentTimeAsPastMatchupStart()} />)

        const hoRadio = screen.getByRole('radio', {name: /washington/i})
        const enabledPropositionElement = screen.getByRole('radio', { name: /washington/i }).closest('.proposition')
        expectPropositionToBeEnabled(enabledPropositionElement)

        userEvent.click(hoRadio)

        expect(screen.getByText('Game 11 has already started.')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Game 11 has already started.')).not.toBeInTheDocument()

        const disabledPropositionElement = screen.getByRole('radio', { name: /washington/i }).closest('.proposition')
        expectPropositionToBeDisabled(disabledPropositionElement)
    })

    test('Event loaded at earliest time should show right number of controls and allow for changing.', () => {
        const propositions = MockPropositions(earliestLoadTime)
        const mockGetCurrentTimeAsEarliest = () => { return earliestSaveTime }

        render(<Event
            event={event}
            propositions={propositions}
            getCurrentTime={() => mockGetCurrentTimeAsEarliest()} />)

        const allRadioButtons = screen.queryAllByRole('radio')
        expect(allRadioButtons.length).toBe(40)
        
        const checkedRadioButtons = screen.queryAllByRole('radio', {checked: true})
        expect(checkedRadioButtons.length).toBe(20)
        
        const clearButtons = screen.queryAllByRole('button', {name: /clear/})
        expect(clearButtons.length).toBe(20)
        
        const unitSelectors = screen.queryAllByRole('combobox')
        expect(unitSelectors.length).toBe(20)
        
        const savedButtons = screen.queryAllByRole('button', {name: /saved/i})
        expect(savedButtons[0]).toHaveStyle('backgroundColor: #CCCCCC')
        expect(savedButtons[0]).toBeDisabled()

        const unitsToClear = screen.queryAllByRole('combobox')[10].value
        userEvent.click(screen.queryAllByRole('button', {name: /clear/})[10]) //clear first optoinal game
        expect(screen.queryAllByRole('radio', {checked: true}).length).toBe(19)

        const totalUnitsSelected = event.maxUnits - unitsToClear
        expect(screen.getAllByText(totalUnitsSelected + '/200').length).toBe(2)

        const saveButtons = screen.queryAllByRole('button', {name: /save/i})
        expect(saveButtons[0]).toHaveStyle('backgroundColor: #0099CC')
        expect(savedButtons[0]).not.toBeDisabled()

        const allPropositionElements = allRadioButtons[0].closest('.event').querySelectorAll('.proposition')
        allPropositionElements.forEach(propositionElement => {
            expectPropositionToBeEnabled(propositionElement)
        });
    })
})

function expectPropositionToBeDisabled(propositionElement) {
    const radioButtons = propositionElement.querySelectorAll('input[type=radio')
    expect(radioButtons[0]).toBeDisabled()
    expect(radioButtons[1]).toBeDisabled()

    const unitSelector = propositionElement.querySelector('select')
    expect(unitSelector).toBeDisabled()

    const clearButtonThatShoudntExist = propositionElement.querySelector('button')
    expect(clearButtonThatShoudntExist).toBeNull()
}

function expectPropositionToBeEnabled(propositionElement) {
    const radioButtons = propositionElement.querySelectorAll('input[type=radio')
    expect(radioButtons[0]).not.toBeDisabled()
    expect(radioButtons[1]).not.toBeDisabled()

    const unitSelector = propositionElement.querySelector('select')
    expect(unitSelector).not.toBeDisabled()

    const clearButtonThatShoudntExist = propositionElement.querySelector('button')
    expect(clearButtonThatShoudntExist).not.toBeNull()
}

