<script>

export default {
  name: 'Index',

  props: ['keywords', 'readonly'],

  data () {
    return {
      keywords_: []
    }
  },

  // mounted () {
  //   if (this.keywords && this.keywords.length > 0) {
  //     this.keywords_ = this.keywords
  //   }
  // }
  watch: {
    keywords () {
      this.keywords_ = this.keywords
    }
  }
}
</script>

<template>

  <q-select
    label="Palavras chaves"
    standout="bg-green"
    dense
    use-input
    use-chips
    multiple
    hide-dropdown-icon
    input-debounce="0"
    new-value-mode="add-unique"
    :disable="readonly"
    v-model="keywords_"
    @input="$emit('change', keywords_)"
  />

</template>

<style scoped lang="stylus">
</style>
