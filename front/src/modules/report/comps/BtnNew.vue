<script>

export default {
  name: 'BtnNew'
}
</script>

<template>
  <div>

    <q-btn
      icon="add"
      color="blue-5"
      size="sm"
      round
      @click="$store.dispatch('report/newReport')"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
