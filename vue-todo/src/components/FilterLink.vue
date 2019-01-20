<template>
  <span v-if="active"><slot /></span>
  <a v-else @click.prevent="setVisibilityFilter(filterType)"><slot /></a>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'filter-link',
  props: {
    filterType: {
      type: String,
      required: true
    }
  },
  computed: mapState({
    active (state) {
      return state.visibilityFilter === this.filterType
    }
  }),
  methods: mapMutations([
    'setVisibilityFilter'
  ])
}
</script>
