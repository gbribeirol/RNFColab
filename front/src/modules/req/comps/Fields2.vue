<script>
import { mapState, mapGetters } from 'vuex'

import Goals from './goals/List2'
// import Correlations from './correlation'
import Ascendent from './ascendent/List2'
import Descendent from './descendent/List2'
import Positions from './positions/List2'

export default {
  name: 'Fields',

  props: ['req'],

  components: {
    Goals,
    Ascendent,
    Descendent,
    Positions
  },

  data () {
    return {
      showing: false
    }
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

    <!-- <q-btn class="q-ma-none q-pa-none"
      :label="req.name"
      :icon="showing ? 'remove' : 'add'"
      flat
      @click="showing = !showing"
    /> -->

    <q-btn
      :label="req.name"
      :icon="showing ? 'remove' : 'add'"
      flat
      v-close-popup
      size="sm"
      @click="showing = !showing"
    />

    <transition name="slide-fade">
      <div class="q-px-sm" v-show="showing">
        <div class="q-pl-sm">Dados gerais</div>

          <!-- <Display style="background-color: #E0E0E0;"
            label="Nome"
            :content="req.name"
          /> -->

          <Display
            label="Sentença"
            disable
            :content="req.sentence"
          />

          <div class="row">
            <Display class="col"
              label="Tipo"
              disable
              :content="req.type"
            />

            <Display class="col"
              label="Estado"
              disable
              :content="req.state"
            />

            <Display class="col"
              label="Eng.criador"
              disable
              :content="req.engineerCreator.name"
            />

            <Display class="col"
              label="Posição Final"
              disable
              :content="req.finalPosition"
            />
          </div>

          <Goals class="q-mt-sm" :req="req"/>
          <Ascendent class="q-mt-sm" :req="req"/>
          <Descendent class="q-mt-sm" :req="req"/>
          <Positions class="q-mt-sm" :req="req"/>

          <!-- <span v-for="position in positionsOfAReq" :key="position.id">
              <PositionFields class="q-pt-xs" :position="position"/>
          </span> -->

      </div>
    </transition>

  </section>
</template>

<style scoped lang="stylus">
  .resp-container {
    position: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
