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
  <div class="row bg-grey-3 q-px-sm text-subtitle1">

    <div class="text-bold">Refinamentos</div>

    <q-space/>

    <Btns class="text-center"/>

  </div>
</template>

<style scoped>
</style>
