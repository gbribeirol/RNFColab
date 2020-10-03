<script>
import FdName from './FdName'
import FdEmail from './FdEmail'
import FdPassword from './FdPassword'
import FdGender from './FdGender'

export default {
  name: 'NewUserAccountForm',

  components: {
    FdName,
    FdEmail,
    FdPassword,
    FdGender
  }

}
</script>

<template>
  <div class="login-app text-center" style="background: linear-gradient(147deg,rgba(157, 158, 156, 0.2) 44%, rgba(79, 79, 78, 0.4) 88%);">

    <div class="q-ma-lg">
      <!-- <img src="~assets/brazil-logo.png"> -->
    </div>

    <label class="text-h6 text-weight-bold">
      Nova conta de email
    </label>

    <div class="box-inputs q-mt-md q-gutter-y-sm">

      <FdName/>
      <FdEmail/>
      <FdPassword/>
      <FdGender/>

      <div class="row q-mt-xl justify-center q-gutter-x-md">
        <div class="col-auto">
          <q-btn
            label="Criar"
            class="q-my-lg q-px-md ip-btn"
            size="md"
            @click="$store.dispatch('user/createUserWithEmail', $store.state.auth.userCredential).then(() => $router.push({ name: 'mural' }))"
          />
        </div>

        <div class="col-auto">
          <q-btn
            label="Cancelar"
            class="q-my-lg q-px-md ip-btn"
            size="md"
            @click="$router.push({ name: 'auth' })"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
</style>
