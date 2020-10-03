<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ReqSummaryBtn',

  data () {
    return {
      showDialog: false
    }
  },

  computed: {
    ...mapGetters('req', ['reqsFiltered', 'summary']),
    ...mapGetters('position', ['positionsFiltered'])
  }
}
</script>

<template>
  <div>

    <q-btn
      label="Exibir resumo"
      class="bg-grey-4"
      flat
      v-close-popup
      size="sm"
      @click="showDialog = true"
    />

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-bar>
          Resumo
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <div class="q-ma-sm q-my-md">

          <div class="row q-ma-xs q-gutter-x-xs">
            <Display class="col"
              label="Requisitos"
              :content="reqsFiltered.length"
            />
            <Display class="col"
              label="Catálogos"
              :content="summary.numberOfGoals"
            />
          </div>

          <div class="row q-ma-xs q-gutter-x-xs">
            <Display class="col"
              label="Correlações"
              :content="summary.numberOfCorrelations"
            />
            <Display class="col"
              label="Refinamentos"
              :content="summary.numberOfRefinements"
            />
          </div>

          <div class="row q-ma-xs q-gutter-x-xs">
            <Display class="col"
              label="Posicionamentos"
              :content="positionsFiltered.length"
            />
            <Display class="col"
              label="Argumentos"
              :content="positionsFiltered.filter(e => e.argument).length"
            />
          </div>

        </div>

      </q-card>
    </q-dialog>

  </div>
</template>

<style scoped lang="stylus">
</style>
