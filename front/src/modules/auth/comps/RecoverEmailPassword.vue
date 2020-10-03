<script>
import FdEmail from 'src/modules/user/comps/FdEmail'
import SendPassword from './buttons/SendPassword'
import CancelButton from './buttons/Cancel'

export default {
  name: 'RecoverEmailPassword',

  components: {
    FdEmail,
    SendPassword,
    CancelButton
  }

}
</script>

<template>
  <div class="login-app text-center" style="background: linear-gradient(147deg,rgba(157, 158, 156, 0.2) 44%, rgba(79, 79, 78, 0.4) 88%);">

    <div class="q-ma-lg">
      <!-- <img src="~assets/brazil-logo.png"> -->
    </div>

    <div class="q-mt-xl q-pt-xl">
      <label class="text-h6 text-weight-bold">
        Recuperar senha
      </label>
    </div>

    <div class="box-inputs q-mt-lg q-gutter-y-sm">

      <FdEmail/>

      <div class="row q-mt-xl justify-center q-gutter-x-xs">
        <div class="col-auto">
          <SendPassword/>
        </div>
        <div class="col-auto">
          <CancelButton/>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
</style>
