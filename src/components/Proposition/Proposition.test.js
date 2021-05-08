import { render, screen } from '@testing-library/react'
import Proposition from './Proposition'

describe('Proposition use cases', () => {
    const key = '2010-1-1'

    let matchup = {
        'number': 1,
        'home': 'Kansas St',
        'ho': 'KSU',
        'visitor': 'Kansas',
        'vis': 'KU',
        'favorite': 'KSU',
        'spread': 18.5
    }
    
    let info = {
        'start': new Date('September 4, 2010 13:00'),
        'note': 'Sunflower Showdown',
        'pickEarly': true
    }
    const pick = {
        'selection': 'KSU',
        'units': 20
    }

    const group = {
        'name': 'required',
        'minUnitsAllowed': 10,
        'maxUnitsAllowed': 30
    }

    const mockOnChange = jest.fn()

    test('Loading a standard proposition should render correctly.', () => {

        render(<Proposition
                    key={key}
                    matchup={matchup}
                    pick={pick}
                    info={info}
                    group={group}
                    onChange={mockOnChange} />)

        expect(screen.getByLabelText('Kansas')).toBeInTheDocument()
        expect(screen.getByLabelText('Kansas')).toHaveAttribute('id', 'KU-radio')
        expect(screen.getByLabelText('Kansas').parentElement.parentElement).toHaveClass('proposition-visitor')
        expect(screen.getByLabelText(/kansas st/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/kansas st/i)).toHaveAttribute('id', 'KSU-radio')
        expect(screen.getByLabelText(/kansas st/i).parentElement.parentElement).toHaveClass('proposition-home')
        expect(screen.getByLabelText(/kansas st/i)).toBeChecked()

        expect(screen.getByText('(-18.5)').parentElement).toHaveClass('spread')
        expect(screen.getByText('(-18.5)').parentElement.previousSibling).toHaveClass('proposition-home')

        expect(screen.getByText(/sunflower showdown/i)).toHaveClass('proposition-note')
        expect(screen.getByText(/pick by: 9\/4\/2010 13:00/i)).toHaveClass('proposition-start')

        expect(screen.getByRole('combobox')).toHaveValue('20')
    })

    test('Proposition that does not need to be picked early should not show pick by time', () => {

        info.pickEarly = false

        render(<Proposition
            key={key}
            matchup={matchup}
            pick={pick}
            info={info}
            group={group}
            onChange={mockOnChange} />)

        expect(screen.queryByText(/pick by/i)).toBeNull()
    })

    test('Proposition with visitor favorite should show spread along side visitor.', () => {
        matchup.favorite = 'KU'
 
        render(<Proposition
            key={key}
            matchup={matchup}
            pick={pick}
            info={info}
            group={group}
            onChange={mockOnChange} />)

            expect(screen.getByText('(-18.5)').parentElement).toHaveClass('spread')
            expect(screen.getByText('(-18.5)').parentElement.previousSibling).toHaveClass('proposition-visitor')
    })

    // test too late
    // test unit options
})