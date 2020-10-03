<script>
export default {
  name: 'InputInt',

  props: ['label', 'content', 'disable'],

  data () {
    return {
      lContent: ''
    }
  },

  methods: {
    getLContent () { this.lContent = this.content }
  },

  mounted () { this.getLContent() },

  watch: {
    content () { this.getLContent() }
  }
}
</script>

<template>

  <q-input
    :label="label"
    type="number"
    :disable="disable"
    dense
    filled
    flat
    v-model.number="lContent"
    @input="$emit('input', lContent)"
  />

</template>
