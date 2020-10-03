<script>
import { mapState } from 'vuex'

export default {
  name: 'Like',

  props: ['post'],

  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<template>
  <span>

    <q-icon v-if="post.likes.findIndex(el => el.owner.id === user.id) === -1"
      name="favorite_border"
      class="text-red-6"
      @click="$store.dispatch('mural/addLike', post.id)"
    />

    <q-icon v-if="post.likes.findIndex(el => el.owner.id === user.id) !== -1"
      name="img:statics/icons/muralHeart.svg"
      class="text-blue-grey-4"
      @click="$store.dispatch('mural/addLike', post.id)"
    />

    {{ post.likes.length }}

  </span>
</template>

<style scoped lang="stylus">
</style>
