<script>
import { mapState } from 'vuex'
import { date } from 'quasar'

// import Avatar from '../Avatar'
import EraseButton from './buttons/Erase'

export default {
  name: 'Item',

  props: ['comment', 'index'],

  components: {
    EraseButton
    // Avatar
  },

  data () {
    return {
      date
    }
  },

  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<template>
  <div>

    <div class="row">
      <!-- <div class="col-auto"> -->
        <!-- <Avatar :url="comment.owner.avatarUrl"/> -->
      <!-- </div> -->

      <div class="col-auto text-body2 q-pl-sm" >
        <!-- <div class="text-subtitle3 text-weight-bold">
        </div> -->

        <!-- <div> -->
          {{ date.formatDate(comment.creationDate.toDate(), 'DD/MM HH:mm') }}
          {{ comment.owner.name.substring(0,25) }}

          <EraseButton :comment="comment" :index="index"/>
        <!-- </div> -->
      </div>
    </div>

    <div class="row">
      <div class="row q-mx-md text-caption">
        {{ comment.content }}
      </div>
    </div>

  </div>
</template>

<style scoped lang="stylus">
</style>
