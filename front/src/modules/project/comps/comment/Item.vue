<script>
import { mapState } from 'vuex'
import { date } from 'quasar'

// import Avatar from '../Avatar'
// import EraseButton from './buttons/Erase'
import EditButton from './buttons/Edit'

export default {
  name: 'Item',

  props: ['comment', 'index'],

  components: {
    // EraseButton,
    EditButton
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
      <div class="col-auto">
        <!-- <Avatar :url="comment.owner.avatarUrl"/> -->
      </div>

      <div class="col-auto text-body2 q-pl-sm" >
        <div class="text-subtitle3 text-weight-bold">
          {{ comment.owner.name.substring(0,25) }}
        </div>

        <!-- <div> -->
          {{ date.formatDate(comment.creationDate.toDate(), 'DD/MM HH:mm') }}

          <!-- <q-icon enable="comment.owner.id === user.id"
            name="delete"
            size="20px"
            @click="$store.dispatch('mural/eraseComment', index)"
          /> -->
          <!-- <EraseButton :comment="comment" :index="index"/> -->
        <!-- </div> -->
      </div>

      <div class="col-auto">
        <EditButton :comment="comment" :index="index"/>
      </div>
    </div>

    <div class="row">
      <div class="row q-mx-md text-subtitle3">
        {{ comment.content }}
      </div>
    </div>

  </div>
</template>

<style scoped lang="stylus">
</style>
