<script>
export default {
  name: 'NewEmailAccount'
}
</script>

<template>
  <section>

    <q-btn
      class="text-weight-bold"
      label="Registrar"
      color="black"
      no-caps
      flat
      size="md"
      @click="$router.push({ name: 'authNewEmailAccount' })"
   />

  </section>
</template>

<style scoped>
</style>
