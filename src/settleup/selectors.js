import { selectDudesName } from '../dudes/selectors'

export function selectAmountsOwedByDude (state, dudeId) {
  return Object.keys(state.settleUp[dudeId])
    .map(owedToDudeId => ({
      dudeId: owedToDudeId,
      dudeName: selectDudesName(state, owedToDudeId),
      amount: state.settleUp[dudeId][owedToDudeId]
    }))
}

export function selectAmountsOwedToDude (state, dudeId) {
  const otherDudeIds = Object.keys(state.settleUp).filter(otherDudeId => otherDudeId !== dudeId)
  return otherDudeIds.reduce((acc, otherDudeId) => {
    return acc.concat(
      selectAmountsOwedByDude(state, otherDudeId)
      .filter(owedAmount => owedAmount.dudeId === dudeId)
      .map(owedAmount => ({
        dudeId: otherDudeId,
        dudeName: selectDudesName(state, otherDudeId),
        amount: owedAmount.amount
      }))
    )
  }, [])
}
