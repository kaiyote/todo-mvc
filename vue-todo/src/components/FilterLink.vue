<template>
  <span v-if="active"><slot /></span>
  <a v-else @click.prevent="setVisibilityFilter(filterType)"><slot /></a>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import { State } from '../store/types'

export default defineComponent({
  name: 'filter-link',
  props: {
    filterType: {
      type: String,
      required: true
    }
  },
  computed: mapState<State>({
    active (state: State) {
      return state.visibilityFilter === (this as any).filterType
    }
  }),
  methods: mapMutations([
    'setVisibilityFilter'
  ])
})
</script>
