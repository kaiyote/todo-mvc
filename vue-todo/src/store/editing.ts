import { State } from "./types"

export function edit (state: State, index: number) {
  state.editing = index
}

export function cancel (state: State) {
  state.editing = undefined
}
