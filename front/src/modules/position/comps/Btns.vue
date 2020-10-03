<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Btns',

  computed: {
    ...mapState('position', ['positionFlag']),
    ...mapGetters('position', ['positionChanged', 'validPosition', 'canErasePosition']),
    ...mapGetters('auth', ['isAdmin'])
  }
}
</script>

<template>
  <div class="q-gutter-x-sm">

    <q-btn v-show="positionFlag === 'added' || (positionFlag !== 'new' && !positionChanged)"
      label="Voltar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$router.push({ name: 'position' })"
    />

    <q-btn v-show="positionFlag === 'new' || positionChanged"
      label="Cancelar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      v-close-popup
      @click="$router.push({ name: 'position' })"
    />

    <q-btn v-show="positionFlag === 'new' && validPosition"
      label="Adicionar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      @click="$store.dispatch('position/addPosition')"
    />

    <q-btn v-show="positionFlag === 'update' && positionChanged"
      label="Salvar"
      class="ip-btn bg-grey-4"
      flat
      size="sm"
      @click="$store.dispatch('position/justUpdatePosition')"
    />

    <q-btn v-show="canErasePosition"
      label="Apagar"
      class="ip-btn bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="$store.dispatch('position/erasePosition')"
    />

  </div>
</template>

<style scoped lang="stylus">
</style>
