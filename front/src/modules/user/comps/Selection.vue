<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Selection',

  data () {
    return {
      id: ''
    }
  },

  computed: {
    ...mapState('sector', ['state', 'selected']),
    ...mapGetters('sector', ['listOptions'])
  },

  watch: {
    selected () {
      this.id = this.selected.id
    }
  },

  mounted () {
    this.$store.dispatch('user/load')
  }
}
</script>

<template>
  <q-select v-show="state === 'selection'"
    filter
    float-label="Seleção de usuário"
    color="yellow-2"
    inverted-light
    class="q-mt-md"
    :options="listOptions"
    v-model="id"
    @input="$store.dispatch('user/select', id)"
 />
</template>
