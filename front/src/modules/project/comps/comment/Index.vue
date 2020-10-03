<script>
import CommentList from './comment/List'

export default {
  name: 'Index',

  props: ['post'],

  components: {
    CommentList
  }
}
</script>

<template>

  <q-expansion-item class="q-ma-none q-pa-none shadow-1 overflow-hidden"
    :label="'Comentários: ' + post.comments.length"
    icon="chat_bubble_outline"
    style="border-radius: 30px"
    expand-separator
    expand-icon-class="text-white"
    dense>

    <CommentList :post="post"/>

  </q-expansion-item>

</template>

<style scoped lang="stylus">
</style>
