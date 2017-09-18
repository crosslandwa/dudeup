import { selectNumberOfDudes } from '../dudes/selectors'

const rounded = amount => Math.round(amount * 1e2) / 1e2

const items = state => state.entities.items

export function selectItemIdsForDude (state, dudeId) {
  return items(state).allIds.map(id => items(state).byId[id]).filter(item => item.dudeId === dudeId).map(item => item.id)
}

export function selectItemDescription (state, itemId) {
  return items(state).byId[itemId].description
}

export function selectItemPrice (state, itemId) {
  return rounded(items(state).byId[itemId].price || 0)
}

export function selectTotalItemCost (state) {
  return state.settleUp.groupTotal
}

export function selectTotalItemCostForDude (state, dudeId) {
  return state.settleUp.totalPaidPerGroupMember[dudeId]
}

export function selectAverageCostPerDude (state) {
  return state.settleUp.averageAmountPerGroupMember
}
