import { render, screen } from '@testing-library/react'
import Proposition from './Proposition'

describe('Proposition use cases', () => {
    const key = '2010-1-1'
    const matchup = {
        'number': 1,
        'home': 'Kansas St',
        'ho': 'KSU',
        'visitor': 'Kansas',
        'vis': 'KU',
        'favorite': 'KSU',
        'spread': 18.5
    }

    const pick = {
        'selection': 'KSU',
        'units': 20
    }

    const info = {
        'start': new Date('September 4, 2010 13:00'),
        'note': 'Sunflower Showdown',
        'pickEarly': true
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

        screen.debug()
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
})