<script>
import { mapState } from 'vuex'
import Item from './Item'

export default {
  name: 'List',

  props: ['post'],

  computed: {
    ...mapState('mural', ['list'])
  },

  components: {
    Item
  }
}
</script>

<template>
  <div>

    <div class="row q-pb-sm" v-for="(comment, index) in post.comments" :key="index">

      <Item :comment="comment" :index="index" v-show="comment"/>

    </div>

  </div>
</template>

<style scoped lang="stylus">
</style>
