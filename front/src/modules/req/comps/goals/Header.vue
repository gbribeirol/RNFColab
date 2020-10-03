<script>
import Btns from './Btns'

export default {
  name: 'Header',

  components: {
    Btns
  }
}
</script>

<template>
  <div class="row q-px-sm bg-grey-3 text-subtitle1">

      <div class="text-bold">Catálogos associados</div>

      <q-space/>

      <Btns class="text-center"/>

  </div>
</template>

<style scoped>
</style>
