const editing = {
  edit (state, index) {
    state.editing = index
  },

  cancel (state) {
    state.editing = null
  }
}

export default editing
