<script>
import LoginButton from './Login'
import ResetButton from './Reset'
// import RecoverEmailPasswordButton from './RecoverEmailPassword'
import FacebookButton from './Facebook'
import GoogleButton from './Google'
import TwitterButton from './Twitter'

export default {
  name: 'Index',

  components: {
    LoginButton,
    ResetButton,
    // RecoverEmailPasswordButton,
    FacebookButton,
    GoogleButton,
    TwitterButton
  }
}
</script>

<template>
  <section>

    <div class="row q-gutter-x-sm justify-center">
      <div class="col-auto">
        <LoginButton/>
      </div>
      <div class="col-auto">
        <ResetButton/>
      </div>
    </div>

    <!-- <q-btn
      class="text-weight-bold text-right"
      label="Registrar"
      color="black"
      no-caps
      flat
      size="md"
      @click="$router.push({ name: 'user.newUserAccountForm' })"
    /> -->

    <!-- <RecoverEmailPasswordButton class="q-mt-sm text-right"/> -->

    <div class="q-mt-xl text-bold text-blue-7 text-subtitle1">
    Acesse também através:
    </div>
    <div class="row q-mt-sm justify-center">
      <div class="col">
        <FacebookButton/>
      </div>
      <div class="col">
        <GoogleButton/>
      </div>
      <div class="col">
        <TwitterButton/>
      </div>
    </div>

  </section>
</template>

<style scoped>
</style>
