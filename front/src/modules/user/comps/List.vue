<script>
import User from './User'

export default {
  name: 'List',

  props: ['list'],

  components: {
    User
  }
}
</script>

<template>
  <q-card>

    <div v-for="(user, idx) in list.filter(el => el.roles[0] === undefined)" :key="idx"
      clickable
      v-ripple
      @click="$router.push({ name: 'showProfile', params: { user } })">
      <q-separator/>

      <User :user="user"/>

    </div>

  </q-card>
</template>
