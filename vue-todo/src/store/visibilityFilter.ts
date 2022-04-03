import { State, VisibilityFilter } from "./types"

export function setVisibilityFilter (state: State, filter: VisibilityFilter) {
  state.visibilityFilter = filter
}
