<script>
export default {
  name: 'Selection',

  props: ['label', 'selected', 'options', 'optionValue', 'optionLabel', 'disable'],

  data () {
    return {
      lSelected: null
    }
  },

  methods: {
    setLSelected () { this.lSelected = this.selected }
  },

  mounted () {
    this.setLSelected()
  },

  watch: {
    content () { this.setLSelected() }
  }
}
</script>

<template>
  <section>

    <q-select
      :label="label"
      filled
      dense
      options-dense
      bg-color="grey-3"
      transition-show="scale"
      transition-hide="scale"
      v-model="lSelected"
      :disable="disable"
      :option-value="optionValue"
      :option-label="optionLabel"
      :options="options"
      @input="$emit('input', lSelected)"
    />

  </section>
</template>
