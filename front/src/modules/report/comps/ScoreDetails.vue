<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ScoreDetails',

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

        <div class="row q-ma-sm q-gutter-sm">
          <Display class="col"
            label="Requisitos"
            :content="reqsFiltered.length"
          />
          <Display class="col-5"
            label="Catálogos"
            :content="summary.numberOfGoals"
          />
          <Display class="col"
            label="Correlações"
            :content="summary.numberOfCorrelations"
          />
        </div>

        <div class="row q-ma-sm q-gutter-sm">
          <Display class="col"
            label="Refinamentos"
            :content="summary.numberOfRefinements"
          />
          <Display class="col-5"
            label="Posicionamentos"
            :content="positionsFiltered.length"
          />
          <Display class="col"
            label="Argumentos"
            :content="positionsFiltered.filter(e => e.argument).length"
          />
        </div>

      </q-card>
    </q-dialog>

  </div>
</template>

<style scoped lang="stylus">
</style>
