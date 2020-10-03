<script>

export default {
  name: 'MediaType',

  props: ['selected'],

  data () {
    return {
      selected_: '',
      sourceTypes: [
        {
          label: 'Link',
          value: 'Link',
          icon: 'link'
        }, {
          label: 'Arquivo',
          value: 'Arquivo',
          icon: 'attachment'
        }
      ]
    }
  },

  watch: {
    selected () {
      this.selected_ = this.selected
    }
  }
}
</script>

<template>
  <q-card flat class="q-px-sm q-py-xs text-body2 text-grey-7 bg-grey-4">

    <div>
      Tipo de origem {{ selected_ }}
    </div>

    <q-btn-toggle
      no-caps
      unelevated
      rounded
      size="sm"

      color="grey-4"
      toggle-color="green"

      text-color="grey-7"
      toggle-text-color="white"

      :options="sourceTypes"
      v-model="selected_"
      @input="$emit('select', selected_)"
    />

  </q-card>
</template>

<style scoped lang="stylus">
</style>
