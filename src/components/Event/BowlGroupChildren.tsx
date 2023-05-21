import { IProposition } from "../../models/IProposition"
import { Proposition } from "../Proposition/Proposition"
import { MouseEventHandler, ChangeEventHandler } from 'react'
export const getGroupChildren = (
  propositions: IProposition[],
  handleClear: MouseEventHandler,
  handleChange: ChangeEventHandler) => {
  /*
  championship
  */
  const championshipGame = propositions.filter(p => p.group.name === 'Championship')
  const championshipChildren: JSX.Element[] = (
    championshipGame.map((proposition: IProposition) => {
      return (
        <div className="bowl-championship-group">
          <div className="group-area">
            <Proposition
              key={proposition.key}
              matchup={proposition.matchup}
              pick={proposition.pick}
              info={proposition.info}
              group={proposition.group}
              isTooLate={proposition.isTooLate}
              onClear={handleClear}
              onChange={handleChange}
              isBowl={true} />
          </div></div>
      )
    })
  )

  /*
  playoff
  */
  const playoffGames = propositions.filter(p => p.group.name === 'Playoff')
  const playoffChildren: JSX.Element[] = (
    playoffGames.map((proposition: IProposition) => {
      return <Proposition
        key={proposition.key}
        matchup={proposition.matchup}
        pick={proposition.pick}
        info={proposition.info}
        group={proposition.group}
        isTooLate={proposition.isTooLate}
        onClear={handleClear}
        onChange={handleChange}
        isBowl={true} />
    })
  )

  /*
  tier 1
  */
  const tier1Games = propositions.filter(p => p.group.name === 'Tier 1')
  const tier1Group1Children: JSX.Element[] = (
    tier1Games.map((proposition: IProposition) => {
      return <Proposition
        key={proposition.key}
        matchup={proposition.matchup}
        pick={proposition.pick}
        info={proposition.info}
        group={proposition.group}
        isTooLate={proposition.isTooLate}
        onClear={handleClear}
        onChange={handleChange}
        isBowl={true} />
    })
  )

  /*
  tier 2
  */

  const tier2Games = propositions.filter(p => p.group.name === 'Tier 2')
  const tier2Children: JSX.Element[] = (
    tier2Games.map((proposition: IProposition) => {
      return <Proposition
        key={proposition.key}
        matchup={proposition.matchup}
        pick={proposition.pick}
        info={proposition.info}
        group={proposition.group}
        isTooLate={proposition.isTooLate}
        onClear={handleClear}
        onChange={handleChange}
        isBowl={true} />
    })
  )
  /*
  tier 3
  */
  const tier3Games = propositions.filter(p => p.group.name === 'Tier 3')
  const tier3Children: JSX.Element[] = (
    tier3Games.map((proposition: IProposition) => {
      return <Proposition
        key={proposition.key}
        matchup={proposition.matchup}
        pick={proposition.pick}
        info={proposition.info}
        group={proposition.group}
        isTooLate={proposition.isTooLate}
        onClear={handleClear}
        onChange={handleChange}
        isBowl={true} />
    })
  )
  return {
    championshipChildren,
    playoffChildren,
    tier1Group1Children,
    tier2Children,
    tier3Children
  }
}
