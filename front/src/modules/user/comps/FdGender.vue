<script>
import { mapState } from 'vuex'
export default {
  name: 'FdGender',

  data () {
    return {
      selected: ''
    }
  },

  computed: {
    ...mapState('user', ['genderTypes']),
    ...mapState('auth', ['gender'])
  },

  mounted () {
    this.selected = this.gender
  },

  watch: {
    gender () {
      this.selected = this.gender
    }
  }
}
</script>

<template>
  <div>

    <q-card class="q-px-sm q-pt-xs q-pb-sm bg-blue-7 text-left">
      <label class="q-pl-sm text-blue-grey-2">
        Gênero
      </label>

      <div class="row q-pl-xs justify-center">
        <q-btn-toggle
          glossy
          no-caps
          size="sm"
          color="blue-grey-4"
          toggle-color="blue-grey-7"
          v-model="selected"
          :options="genderTypes.map(el => ({ label: el, value: el }))"
          @input="$store.commit('auth/SET_GENDER', selected)"
        />
      </div>
    </q-card>

  </div>
</template>

<style scoped>
</style>
