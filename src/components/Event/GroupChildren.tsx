import { IProposition } from "../../models/IProposition"
import { Proposition } from "../Proposition/Proposition"
import { MouseEventHandler, ChangeEventHandler } from 'react'
export
  const getGroupChildren = (propositions: IProposition[], handleClear: MouseEventHandler, handleChange: ChangeEventHandler) => {
    const requiredGames = propositions.filter(p => p.group.name === 'required')

    const requiredPivot = Math.floor(requiredGames.length / 2)
    const requiredGroup1 = requiredGames.slice(0, requiredPivot)
    const requiredGroup1Children = (
      requiredGroup1.map((proposition: IProposition) => {
        return <Proposition
          key={proposition.key}
          matchup={proposition.matchup}
          pick={proposition.pick}
          info={proposition.info}
          group={proposition.group}
          isTooLate={proposition.isTooLate}
          onClear={handleClear}
          onChange={handleChange}
          isBowl={false} />
      })
    )

    const requiredGroup2 = requiredGames.slice(requiredPivot)
    const requiredGroup2Children = (
      requiredGroup2.map((proposition: IProposition) => {
        return <Proposition
          key={proposition.key}
          matchup={proposition.matchup}
          pick={proposition.pick}
          info={proposition.info}
          group={proposition.group}
          isTooLate={proposition.isTooLate}
          onClear={handleClear}
          onChange={handleChange}
          isBowl={false} />
      })
    )

    const optionalGames = propositions.filter(p => p.group.name === 'optional')

    const optionalPivot = Math.floor(optionalGames.length / 2)
    const optionalGroup1 = optionalGames.slice(0, optionalPivot)
    const optionalGroup1Children = (
      optionalGroup1.map((proposition: IProposition) => {
        return <Proposition
          key={proposition.key}
          matchup={proposition.matchup}
          pick={proposition.pick}
          info={proposition.info}
          group={proposition.group}
          isTooLate={proposition.isTooLate}
          onClear={handleClear}
          onChange={handleChange}
          isBowl={false} />
      })
    )

    const optionalGroup2 = optionalGames.slice(optionalPivot)
    const optionalGroup2Children = (
      optionalGroup2.map((proposition: IProposition) => {
        return <Proposition
          key={proposition.key}
          matchup={proposition.matchup}
          pick={proposition.pick}
          info={proposition.info}
          group={proposition.group}
          isTooLate={proposition.isTooLate}
          onClear={handleClear}
          onChange={handleChange}
          isBowl={false} />
      })
    )
    return {
      requiredGroup1Children,
      requiredGroup2Children,
      optionalGroup1Children,
      optionalGroup2Children
    }
  }
