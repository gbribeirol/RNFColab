<script>
import { mapState, mapGetters } from 'vuex'
import Classification from 'src/modules/position/comps/classification/Index2'

// import Goals from './goals/List2'
// import Correlations from './correlation'
// import Ascendent from './ascendent/List2'
// import Descendent from './descendent/List2'
// import Positions from './positions/List2'

export default {
  name: 'Fields',

  props: ['position'],

  components: {
    Classification
    // Goals,
    // Ascendent,
    // Descendent,
    // Positions
  },

  computed: {
    ...mapState('req', ['reqStateFlag', 'types', 'states']),
    ...mapGetters('req', ['nonModerationgUsers', 'nonReqEngineerUsers']),
    ...mapState('position', ['positionTypes']),
    ...mapGetters('project', ['isModerator']),
    ...mapGetters('auth', ['isAdmin'])
  },

  methods: {
  }
}
</script>

<template>
  <section>

    <div class="row">
      <Display class="col-3"
        label="Data"
        :content="position.creationDateF"
      />

      <Display class="col-3"
        label="Tipo"
        :content="position.type"
      />
      <Display class="col-2"
        label="POSIÇÃO"
        :content="position.position.label"
      />
      <Display class="col"
        label="POSICIONADOR"
        :content="position.participant.name"
      />
    </div>

    <div class="row" v-show="position.associatedCorrelation">

      <Display class="col"
        label="CORRELAÇÃO"
        :content="position.associatedCorrelation ? position.associatedCorrelation.label : ''"
      />

      <!-- <q-item>
        <q-item-label>ARGUMENTO</q-item-label>
        <q-item-label caption lines="2">{{ position.argument }}</q-item-label>
      </q-item> -->

    </div>

    <div class="row" v-show="position.argument">
      <Display class="col-12"
        label="ARGUMENTO"
        :content="position.argument"
      />

      <Classification class="col-12" v-show="position.classifications.length"
        :classifications="position.classifications"
      />
    </div>

    <!-- <Goals class="q-mt-sm q-mx-sm" :req="req"/> -->
    <!-- <Ascendent class="q-mt-sm q-mx-sm" :req="req"/> -->
    <!-- <Descendent class="q-mt-sm q-mx-sm" :req="req"/> -->
    <!-- <Positions class="q-mt-sm q-mx-sm" :req="req"/> -->

  </section>
</template>

<style scoped lang="stylus">
  .resp-container {
    position: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
