<script>
export default {
  name: 'Comment',

  props: ['post']
}
</script>

<template>
  <span>

      <!-- @click="$store.dispatch('mural/setCurPost', post.id); comment = ''; commentModal = true" -->
    <q-icon
      name="chat_bubble_outline"
      class="text-light-blue-6"
      @click="$store.commit('mural/SET_CUR_POST', post)"
    />

    {{ post.comments.length }}

  </span>
</template>

<style scoped lang="stylus">
</style>
