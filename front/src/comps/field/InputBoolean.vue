<script>
export default {
  name: 'InputBoolean',

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
  <section>

    <span class="text-grey">
      {{ label }}
    </span>

    <q-toggle
      checked-icon="check"
      unchecked-icon="clear"
      :disable="disable"
      color="green"
      dense
      filled
      flat
      v-model="lContent"
      @input="$emit('input', lContent)"
    />

  </section>
</template>
