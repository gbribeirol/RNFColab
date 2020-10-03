<script>
export default {
  name: 'FdName',

  data () {
    return {
      name
    }
  }
}
</script>

<template>
  <div>

    <q-input
      label="Nome"
      class="text-indigo bg-blue-1"
      color="blue-11"
      bg-color="blue-7"
      inverted
      standout
      dense dark
      v-model="name"
      @input="$store.commit('auth/SET_NAME', name)"
    />

  </div>
</template>
