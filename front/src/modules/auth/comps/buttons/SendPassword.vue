<script>
export default {
  name: 'SendPassword'
}
</script>

<template>
  <section>

    <q-btn
      label="Enviar senha por email"
      class="q-my-lg q-px-md ip-btn"
      size="md"
      @click="$store.dispatch('auth/sendPassword').then(() => $router.push({ name: 'authLoginForm' }))"
   />

  </section>
</template>

<style scoped>
</style>
