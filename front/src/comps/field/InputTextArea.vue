<script>
export default {
  name: 'InputTextArea',

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
    type="textarea"
    :disable="disable"
    autogrow
    dense
    filled
    flat
    v-model="lContent"
    @input="$emit('input', lContent)"
  />

</template>
