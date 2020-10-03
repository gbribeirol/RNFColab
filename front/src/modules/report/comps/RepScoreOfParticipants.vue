<script>
import { mapGetters } from 'vuex'
import Formulas from './Formulas'

export default {
  name: 'RepScoreOfParticipants',

  components: {
    Formulas
  },

  computed: {
    ...mapGetters('report', ['scoresOfParticipants'])
  },

  data () {
    return {
      showDialog: false,
      participant: {},
      pagination: {
        rowsPerPage: 0
      },
      columns: [{
        name: 'name', field: 'participantName', label: 'PARTICIPANTE',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'left',
        style: 'max-width: 250px'
      }, {
        name: 'abstainsRating', field: 'abstainsRating', label: 'ABSTENÇÃO',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'center',
        style: 'max-width: 250px'
      }, {
        name: 'positionsRating', field: 'positionsRating', label: 'POSICIONAMENTO',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'center'
      }, {
        name: 'argsRating', field: 'argsRating', label: 'ARGUMENTAÇÃO',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'center'
      }, {
        name: 'punctualityRating', field: 'punctualityRating', label: 'PONTUALIDADE',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'center'
      }, {
        name: 'positioningToConvergeRating', field: 'positioningToConvergeRating', label: 'CONVERGÊNCIA',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'center'
      }, {
        name: 'firmAndBlockRating', field: 'firmAndBlockRating', label: 'BLOCK/FIRM',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'center'
      }, {
        name: 'contributionArgsRating', field: 'contributionArgsRating', label: 'CONTRIB.ARGS',
        search: true,
        visible: true,
        required: true,
        sortable: true,
        align: 'center'
      }]
    }
  },

  methods: {
    selectParticipant (part) {
      this.participant = part
      this.showDialog = true
    },

    sendLowScoreWarning () {
      const url = 'https://us-central1-snc-rnf.cloudfunctions.net/participantScoringAlarm'
      // const url = 'http://localhost:5000/snc-rnf/us-central1/participantScoringAlarm'
      fetch(url, {
        method: 'post',
        body: JSON.stringify({ participant: this.participant, scoresOfParticipants: this.scoresOfParticipants })
      })
    }
  }
}
</script>

<template>
  <section>

    <!-- <div class="q-gutter-y-xs">

      <div class="row q-gutter-x-xs">
        <Display class="col"
          label="Nº dias do projeto"
          :content="scoresOfParticipants.numberOfProjectDays"
        />
        <Display class="col"
          label="Nº Requisitos"
          :content="scoresOfParticipants.totalNumberOfReqs"
        />
        <Display class="col"
          label="Nº Correlações"
          :content="scoresOfParticipants.totalNumberOfCorrs"
        />
      </div>

      <div class="row q-gutter-x-xs">
        <Display class="col"
          label="Nº Argumentos"
          :content="scoresOfParticipants.totalNumberOfArgs"
        />
        <Display class="col"
          label="Nº Firms e Blocks"
          :content="scoresOfParticipants.totalNumberOfFirmsAndBlocks"
        />
        <Display class="col"
          label="Nº Posicionamentos para convergir"
          :content="scoresOfParticipants.totalNumberOfPositioningToConverge"
        />
      </div>

    </div> -->

<!-- <pre>{{scoresOfParticipants.participants}}</pre> -->

    <q-table
      class="bg-grey-2 q-mt-xs"
      selection="single"
      dense
      flat
      square
      separator="cell"
      hide-bottom
      :pagination.sync="pagination"
      :columns="columns"
      :data="scoresOfParticipants.participants"
      @selection="e => selectParticipant(e.rows[0])"
    >

      <template v-slot:body-cell="props">
        <q-td :props="props" v-html="props.value"/>
      </template>

    </q-table>

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-bar>
          {{ participant.participantName}}

          <q-space />

          <q-btn
            label="Enviar aviso de pontuação baixa"
            flat
            size="sm"
            no-caps
            @click="sendLowScoreWarning"
          />

          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <div class="q-ma-sm q-gutter-y-xs">

          <div class="row q-gutter-x-xs">

            <Display class="col"
              label="Abstenções"
              :content="participant.percAbstains + '% (' + participant.numberOfAbstain + ' / ' + participant.numberOfPositions + ' * 100)'"

            />
            <Display class="col"
              label="Posicionamentos"
              :content="participant.percPositions + '% (' + participant.numberOfPositions + ' / ' + scoresOfParticipants.totalNumberOfReqsAndCorrs + ' * 100)'"
            />
          </div>

          <div class="row q-gutter-x-xs">
            <Display class="col"
              label="Argumentos"
              :content="participant.percArgs + '% (' + participant.numberOfArgs + ' / ' + scoresOfParticipants.totalNumberOfArgs + ' * 100)'"
            />
            <Display class="col"
              label="Pontualidade"
              :content="participant.percPunctuality + '% (' + participant.numberOfDaysFromFirstPositioning + ' / ' + scoresOfParticipants.numberOfProjectDays + ' * 100)'"
            />
          </div>

          <div class="row q-gutter-x-xs">
            <Display class="col"
              label="Firms e Blocks"
              :content="participant.percFirmAndBlock + '% (' + participant.numberOfFirmsAndBlocks + ' / ' + scoresOfParticipants.totalNumberOfFirmsAndBlocks + ' * 100)'"
            />
            <Display class="col"
              label="Posicionamentos Para Convergir"
              :content="participant.percPositioningToConverge + '% (' + participant.numberOfPositioningToConverge + ' / ' + scoresOfParticipants.totalNumberOfPositioningToConverge + ' * 100)'"
            />
          </div>

          <div class="row q-gutter-x-xs">
            <Display class="col"
              label="Argumentos Relevantes"
              :content="participant.numberOfRelevant"
            />
            <Display class="col"
              label="Argumentos Informativos"
              :content="participant.numberOfInformative"
            />
          </div>

          <div class="row q-gutter-x-xs">
            <Display class="col"
              label="Pontuação de Argumentos"
              :content="participant.argumentPunctuation + ' ((' + participant.numberOfRelevant + ' / ' + scoresOfParticipants.totalNumberOfRelevant + ' x 5) + (' + participant.numberOfInformative + ' / ' + scoresOfParticipants.totalNumberOfInformative + ' x 3))'"
            />

            <Display class="col"
              label="Contribuição de Argumentos"
              :content="participant.percContributionArgs + ' (' + participant.argumentPunctuation + ' / (5 + 3))'"
            />
          </div>

          <Formulas/>

        </div>

      </q-card>
    </q-dialog>

  </section>
</template>

<style scoped lang="stylus">
</style>
