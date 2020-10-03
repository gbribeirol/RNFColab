<script>
export default {
  name: 'Btn'
}
</script>

<template>
  <div>

    <q-btn
      icon="share"
      color="blue-5"
      size="sm"
      round
      @click="$store.commit('goal/SET_STATE_FLAG', 'diagram')"
    />

  </div>
</template>

<style scoped>
</style>
