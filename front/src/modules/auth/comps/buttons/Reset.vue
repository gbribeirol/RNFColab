<script>
export default {
  name: 'Reset',

  methods: {
    mReset () {
      this.$store.commit('auth/SET_EMAIL', '')
      this.$store.commit('auth/SET_PASSWORD', '')
    }
  }
}
</script>

<template>
  <div>

    <q-btn
      color="blue-7"
      label="Limpar"
      class="q-my-lg q-px-md"
      size="md"
      @click="mReset"
   />

  </div>
</template>

<style scoped>
</style>
