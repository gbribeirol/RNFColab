<script>
export default {
  name: 'Cancel'
}
</script>

<template>
  <div>

    <q-btn
      label="Cancelar"
      class="q-my-lg q-px-md ip-btn"
      size="md"
      @click="$router.push({ name: 'auth' })"
   />

  </div>
</template>

<style scoped>
</style>
