<script>
import Item from './Item'

export default {
  name: 'List',

  props: ['post'],

  components: {
    Item
  }
}
</script>

<template>
  <section>

    <div class="row q-pb-sm" v-for="(comment, index) in post.comments" :key="index">

      <Item :comment="comment" :index="index" v-show="comment"/>

    </div>

  </section>
</template>

<style scoped lang="stylus">
</style>
