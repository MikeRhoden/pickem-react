import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MockPropositions from '../Event/MockPropositions'
import Group from './Group'

describe('Group use cases.', () => {
  const propositions = MockPropositions(new Date('September 4, 2020 22:30:00'))
  const requiredGames = propositions.filter(p => p.group.name === 'required')
  let maxUnits = 200
  let totalUnits = 200
  const mockOnClear = jest.fn()
  const mockOnChange = jest.fn()
  const mockOnSave = jest.fn()

  beforeEach(() => {
    maxUnits = 200
    totalUnits = 200
  })

  test('Standard group should render and behave correctly.', () => {
    const { container } = render(<Group
      groupName={'Required Games'}
      propositions={requiredGames}
      maxUnits={maxUnits}
      totalUnits={totalUnits}
      onChange={e => mockOnChange(e)}
      onSave={() => mockOnSave()}
      isSaved={false}
      onClear={mockOnClear} />)

    expect(container.querySelectorAll('.proposition').length).toBe(10)
    expect(container.querySelector('.event-units')).toHaveStyle('color: lightgreen')
    expect(container.querySelector('.group-name')).toHaveTextContent('Required Games')
    userEvent.click(container.querySelector('.save-event'))
    expect(mockOnSave).toBeCalled()
  })

  test('Changing proposition selections should trigger on change event.', () => {
    render(<Group
      groupName={'Required Games'}
      propositions={requiredGames}
      maxUnits={maxUnits}
      totalUnits={totalUnits}
      onClear={e => mockOnClear(e)}
      onChange={e => mockOnChange(e)}
      onSave={() => mockOnSave()}
      isSaved={false} />)

    const radioKu = screen.getByLabelText('Alabama')
    userEvent.click(radioKu)
    expect(mockOnChange).toBeCalled()

    const buttonClear = screen.queryAllByRole(/button/i, { name: /clear/i })[0]
    userEvent.click(buttonClear)
    expect(mockOnClear).toBeCalledTimes(1)

    const selectUnits = screen.queryAllByRole('combobox')[0]
    userEvent.selectOptions(selectUnits, '15')
    expect(mockOnChange).toBeCalledTimes(2)
  })

  test('Max units exceeded should render event units as red.', () => {
    render(<Group
      groupName={'Required Games'}
      propositions={requiredGames}
      maxUnits={200}
      totalUnits={210}
      onChange={e => mockOnChange(e)}
      onSave={() => mockOnSave()}
      isSaved={false}
      onClear={mockOnClear} />)
    expect(screen.getByText('210/200')).toHaveStyle('color: indianred')
  })

})