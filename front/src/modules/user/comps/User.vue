<script>

export default {
  name: 'User',

  props: ['user']
}
</script>

<template>
  <div class="row">
      <div class="col-auto q-pa-xs">
        <q-avatar
          class="q-ma-none q-pa-none q-mla-xm"
          size="30px"
          @click.native="$router.push({ name: 'showProfile', params: { user } })">

          <img :src="user && user.photoURL ? user.photoURL : 'statics/logo.png'">

        </q-avatar>
    </div>

    <div class="col-auto q-mt-sm q-ml-xs">
      {{ user.name }}
    </div>

  </div>
</template>
