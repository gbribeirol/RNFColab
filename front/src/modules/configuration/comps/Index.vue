<script>
import { mapState } from 'vuex'
import InputText from 'src/comps/field/InputText'

export default {
  name: 'Index',

  components: {
    InputText
  },

  data () {
    return {
      name: ''
    }
  },

  computed: {
    ...mapState(['app']),
    ...mapState('configuration', ['featureName', 'evaluationParameters'])
  },

  mounted () {
    this.$store.commit('SET_CURRENT_FEATURE', this.featureName, { root: true })
  }
}
</script>

<template>
  <div>

    <q-expansion-item
      label="Parametros de Avaliação de Participantes"
      switch-toggle-side
      expand-separator>

      <q-btn
        label="Criar coleção 'evaluationParameters'"
        class="bg-grey-4"
        flat
        size="sm"
        @click="$store.dispatch('configuration/createEvaluationParameters')"
      />

      <div v-for="(item, idx1) in evaluationParameters" :key="idx1">
        <div class="row text-weight-bold">
          <div class="col-12">
            {{ item.group }}
          </div>
        </div>

        <div class="row text-center">
          <div class="col-4">
            Parametro
          </div>
          <div class="col">
            Peso
          </div>
          <div class="col">
            Fraca
          </div>
          <div class="col">
            Moderada
          </div>
          <div class="col">
            Forte
          </div>
        </div>

        <div class="row inline" v-for="(param, idx2) in item.parameters" :key="idx2">
          <div class="col-4">
            {{ param.name }}
          </div>
          <div class="col text-center">
            -
          </div>
          <div class="col inline">
            <InputText
              label="de"
              :content="param.weakOf"
              @input="content => $store.commit('configuration/SET_WEAK_OF', content)"
            />
            <InputText
              label="ate"
              :content="param.weakUntil"
              @input="content => $store.commit('configuration/SET_WEAK_UNTIL', content)"
            />
          </div>
          <div class="col">
            <InputText
              label="de"
              :content="param.moderateOf"
              @input="content => $store.commit('configuration/SET_MODERATE_OF', content)"
            />
            <InputText
              label="ate"
              :content="param.moderateUntil"
              @input="content => $store.commit('configuration/SET_MODERATE_UNTIL', content)"
            />
          </div>
          <div class="col">
            <InputText
              label="de"
              :content="param.strongOf"
              @input="content => $store.commit('configuration/SET_STRONGE_OF', content)"
            />
            <InputText
              label="ate"
              :content="param.strongUntil"
              @input="content => $store.commit('configuration/SET_STRONGE_UNTIL', content)"
            />
          </div>
        </div>

      </div>

    </q-expansion-item>

  </div>
</template>

<style scoped lang="stylus">
</style>
