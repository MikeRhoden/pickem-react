import { render, screen } from '@testing-library/react'
import MockPropositions from './MockPropositions'
import Event from './Event'
import userEvent from '@testing-library/user-event'
import ReactModal from 'react-modal'

describe('Event use cases (with all games selected and max units selected)', () => {
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

    beforeEach(() => {
        jest
            .spyOn(ReactModal, 'setAppElement')
            .mockImplementation(() =>
                ReactModal.setAppElement(document.createElement('div'))
        );
    })

    test('Going over the unit limit should alert and prevent saving.', () => {
        const propositions = MockPropositions(earliestLoadTime)

        render(<Event
            event={event}
            propositions={propositions} />)
                
        //earliestSaveTime = new Date('September 1, 2020 10:10 AM')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => earliestSaveTime.valueOf()
        )

        const unitSelector = screen.queryAllByRole('combobox')[10]
        const saveButton = screen.queryAllByRole('button', {name: /save/i})[1]
        
        userEvent.selectOptions(unitSelector, '30')
        userEvent.click(saveButton)

        expect(screen.getByText('Can\'t save. You are over 200 units.'))
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Can\'t save. You are over 200 units.')).not.toBeInTheDocument()
        expect(unitSelector).toHaveValue('30')

        userEvent.selectOptions(unitSelector, '4')
        userEvent.click(saveButton)
        expect(screen.queryByText('Can\'t save. You are over 200 units.')).not.toBeInTheDocument()
    })

    test('Matchup partially selected and saved should alert and prevent matchup save.', () => {
        const propositions = MockPropositions(earliestLoadTime)

        render(<Event
            event={event}
            propositions={propositions} />)
                
        //earliestSaveTime = new Date('September 1, 2020 10:10 AM')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => earliestSaveTime.valueOf()
        );

        const unitSelector = screen.queryAllByRole('combobox')[10]
        const washingtonRadio = screen.getByRole('radio', { name: /washington/i })
        const boiseStRadio = screen.getByRole('radio', { name: /boise st/i })

        const clearButton = screen.queryAllByRole('button', {name: /clear/})[10]
        userEvent.click(clearButton)
        expect(washingtonRadio).not.toBeChecked()
        expect(unitSelector).toHaveValue('0')
        expect(boiseStRadio).not.toBeChecked()

        userEvent.click(washingtonRadio)
        const saveButton = screen.queryAllByRole('button', {name: /save/i})[1]
        userEvent.click(saveButton)
        const proposition = propositions[10]
        expect(screen.getByText('Can\'t save. Please select units for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.'))
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Can\'t save. Please select units for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')).not.toBeInTheDocument()

        userEvent.click(boiseStRadio)
        userEvent.click(saveButton)
        expect(screen.getByText('Can\'t save. Please select units for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.'))
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Can\'t save. Please select units for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')).not.toBeInTheDocument()

        userEvent.click(clearButton)
        userEvent.selectOptions(unitSelector, '5')
        userEvent.click(saveButton)
        expect(screen.getByText('Can\'t save. Please make a pick for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.'))
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Can\'t save. Please make a pick for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')).not.toBeInTheDocument()
     })

    test('Matchup changed before matchup start and saved after matchup start should alert and prevent matchup changes from saving.', () => {
        const propositions = MockPropositions(earliestLoadTime)
        render(<Event
            event={event}
            propositions={propositions} />)

        const homeRadioForLateGame = screen.getByRole('radio', { name: /washington/i })
        expect(homeRadioForLateGame).not.toBeChecked()
        const enabledPropositionElement = homeRadioForLateGame.closest('.proposition')
        expectPropositionToBeEnabled(enabledPropositionElement)
        const saveButton = screen.queryAllByRole('button', {name: /save/i})[0]
        

        //earliestLoadTime = new Date('September 6, 2020 10:59:00')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementationOnce(() => earliestLoadTime.valueOf()
        );
        expect(saveButton).toBeDisabled() //because of no changes to save yet
        userEvent.click(homeRadioForLateGame) 
        expect(saveButton).not.toBeDisabled() //enabled because changed matchup radio selection

        //pastEarlierStartTime = new Date('September 6, 2020 11:01:00')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementationOnce(() => pastEarlierStartTime.valueOf()
        );
        userEvent.click(saveButton)

        const p = propositions[10]
        expect(screen.getByText(p.matchup.visitor + ' vs ' + p.matchup.home + ' game has already started.')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText(p.matchup.visitor + ' vs ' + p.matchup.home + ' game has already started.')).not.toBeInTheDocument()

        const disabledPropositionElement = homeRadioForLateGame.closest('.proposition')
        expectPropositionToBeDisabled(disabledPropositionElement)
        expect(homeRadioForLateGame).not.toBeChecked()
    })

    test('Event loaded after event start should disable all matchups.', () => {
        const isToolateForEvent = true
        const propositions = MockPropositions(pastEventStartTime, isToolateForEvent)
        render(<Event
            event={event}
            propositions={propositions} />)

        const someRadioButton = screen.getByRole('radio', { name: /washington/i })
        const allPropositionElements = someRadioButton.closest('.event').querySelectorAll('.proposition')
        allPropositionElements.forEach(propositionElement => {
            expectPropositionToBeDisabled(propositionElement)
        });
    })

    test('Event loaded before event start and saved after event start should alert, revert, and disable all matchups.', () => {
        const propositions = MockPropositions(beforeEventStartTime)
        render(<Event
            event={event}   
            propositions={propositions} />)

        const allUnitSelectors = screen.queryAllByRole('combobox')
        const visRadioForLateGameShouldntSave = screen.getByRole('radio', { name: 'Iowa' })
        const homeRadioForLateGameShouldntSave = screen.getByRole('radio', { name: /duke/i })
        const unitSelectorShouldntSave = allUnitSelectors[12]
        const visRadioForLateGameShouldSave = screen.getByRole('radio', { name: /San Diego St/i })
        const homeRadioForLateGameShouldSave = screen.getByRole('radio', { name: /Hawaii/i })
        const unitSelectorShouldSave = allUnitSelectors[13]
        const enabledPropositionElement = homeRadioForLateGameShouldntSave.closest('.proposition')
        expectPropositionToBeEnabled(enabledPropositionElement)
        const saveButton = screen.queryAllByRole('button', {name: /save/i})[0]

        //beforeEventStartTime = new Date('September 6, 2020 10:59:00')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => beforeEventStartTime.valueOf()
        );

        userEvent.click(visRadioForLateGameShouldSave)
        userEvent.selectOptions(unitSelectorShouldSave, '4')
        userEvent.click(saveButton) // should save these ^ selections

        userEvent.click(homeRadioForLateGameShouldntSave) 
        userEvent.selectOptions(unitSelectorShouldntSave, '4')
        //pastEventStartTime = new Date('September 6, 2020 11:01:00')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => pastEventStartTime.valueOf()
        );
        userEvent.click(saveButton) // should not save these selections ^

        expect(screen.getByText('Event has already started.')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Event has already started.')).not.toBeInTheDocument()

        expect(homeRadioForLateGameShouldSave).not.toBeChecked()
        expect(visRadioForLateGameShouldSave).toBeChecked()
        expect(unitSelectorShouldSave).toHaveValue('4')
        expect(visRadioForLateGameShouldntSave).toBeChecked()
        expect(unitSelectorShouldntSave).toHaveValue('5')
        const allPropositionElements = homeRadioForLateGameShouldntSave.closest('.event').querySelectorAll('.proposition')
        allPropositionElements.forEach(propositionElement => {
            expectPropositionToBeDisabled(propositionElement)
        });
        
    })

    test('Event loaded before event start and changed after event start should alert and disable all matchups.', () => {
        const propositions = MockPropositions(beforeEventStartTime)

        render(<Event
            event={event}
            propositions={propositions} />)

        const homeRadioForLateGame = screen.getByRole('radio', { name: /duke/i })
        const enabledPropositionElement = homeRadioForLateGame.closest('.proposition')
        expectPropositionToBeEnabled(enabledPropositionElement)

        //pastEventStartTime = new Date('September 6, 2020 11:01:00')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementationOnce(() => pastEventStartTime.valueOf()
        );
        userEvent.click(homeRadioForLateGame)

        expect(screen.getByText('Event has already started.')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Event has already started.')).not.toBeInTheDocument()

        const allPropositionElements = homeRadioForLateGame.closest('.event').querySelectorAll('.proposition')
        allPropositionElements.forEach(propositionElement => {
            expectPropositionToBeDisabled(propositionElement)
        });

    })

    test('Event loaded after matchup start and before event start should disable matchup change or selection.', () => {
        const propositions = MockPropositions(pastEarlyStartTime)
        const dummyCurrentTime = () => { return new Date(Date.now()) }
        render(<Event
            event={event}
            propositions={propositions}
            getCurrentTime={() => dummyCurrentTime()} />)

        const propositionElement = screen.getByRole('radio', { name: /washington/i }).closest('.proposition')
        expectPropositionToBeDisabled(propositionElement)        
    })
    
    test('Event loaded before matchup start and saved after matchup start should alert and disable change for matchup.', async () => {
        const propositions = MockPropositions(earliestLoadTime)
        render(<Event
            event={event}
            propositions={propositions} />)

        const hoRadio = screen.getByRole('radio', {name: /washington/i})
        const enabledPropositionElement = screen.getByRole('radio', { name: /washington/i }).closest('.proposition')
        expectPropositionToBeEnabled(enabledPropositionElement)

        //pastEarlierStartTime = new Date('September 4, 2020 19:31:00')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementationOnce(() => pastEarlierStartTime.valueOf()
        );
        userEvent.click(hoRadio)

        expect(screen.getByText('Game 11 has already started.')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', {name: /ok/i}))
        expect(screen.queryByText('Game 11 has already started.')).not.toBeInTheDocument()

        const disabledPropositionElement = hoRadio.closest('.proposition')
        expectPropositionToBeDisabled(disabledPropositionElement)
    })

    test('Event loaded at earliest time should show right number of controls and allow for changing.', () => {
        const propositions = MockPropositions(earliestLoadTime)
        render(<Event
            event={event}
            propositions={propositions} />)

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

        //earliestSaveTime = new Date('September 1, 2020 10:10 AM')
        jest
            .spyOn(global.Date, 'now')
            .mockImplementationOnce(() => earliestSaveTime.valueOf()
        );
        const unitsToClear = screen.queryAllByRole('combobox')[10].value
        userEvent.click(clearButtons[10]) //clear first optoinal game
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

