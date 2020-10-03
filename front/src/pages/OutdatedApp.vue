<script>
export default {
  name: 'OutdatedApp'
}
</script>

<template>
  <section>

    <div class="login-app text-blue-8 q-pt-xl">

      <div class="text-center text-h2 text-weight-bold q-pt-lg">
        RNF Colab
      </div>

      <div class="text-left text-h5 q-pt-xl q-gutter-y-md">
        <div class="">
          Existe uma nova versão ({{ this.$store.state.app.firestore[0].version }}) da aplicação.
        </div>

        <div class="">
          A sua versão ({{ this.$store.state.app.version }}) já esta defasada.
        </div>

        <div class="">
          Reinicie a aplicação/browser para obter a nova versão.
        </div>

        <div class="">
          Caso isto não funcione, limpe o seu cache através do comando <b>CTRL + SHIFT + DEL</b>.
        </div>
      </div>

    </div>

  </section>
</template>

<style scoped>
</style>
