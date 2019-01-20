export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const visibilityFilter = {
  setVisibilityFilter (state, filter) {
    state.visibilityFilter = filter
  }
}

export default visibilityFilter
