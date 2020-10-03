<script>
export default {
  name: 'InputDate',

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
  <span>
    <!-- {{ lContent ? '' : label }} -->
    <!-- :label="lContent ? label : ''" -->

    <q-input class="q-ma-none q-pa-none"
      :label="label"
      type="date"
      :disable="disable"
      dense
      filled
      flat
      v-model="lContent"
      @input="$emit('input', lContent)"
    />

  </span>
</template>
