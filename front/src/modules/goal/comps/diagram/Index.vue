<script>
import { mapState } from 'vuex'

export default {
  name: 'Correlation',

  data () {
    return {
      dataArray: [15, 30, 50, 70, 100, 180],
      svgWidth: 200,
      svgHeight: 200,
      circle: null,
      radius: 50
    }
  },

  computed: {
    ...mapState('goal', ['stateFlag'])
  }

  // methods: {
  //   resizeCircle () {
  //     // .select(this.$el).select('svg')
  //     let canvas = this.$d3.select(this.$refs.resizeCircle)
  //       .append('svg')
  //       .attr('width', this.svgWidth)
  //       .attr('height', this.svgHeight)

  //     this.circle = canvas
  //       .append('circle')
  //       .attr('cx', '100')
  //       .attr('cy', '100')
  //       .attr('r', this.radius)
  //   },
  //   removeResizeCicles () {
  //     this.circle = null
  //     this.$d3
  //       .select(this.$refs.resizeCircle)
  //       .selectAll('svg')
  //       .remove()
  //   },

  //   createCircle () {
  //     let refEl = this.$d3.select(this.$refs.createCircle)

  //     let refSvg = refEl.append('svg')
  //       .attr('width', this.svgWidth)
  //       .attr('height', this.svgHeight)
  //       .style('background', 'gray')

  //     refSvg.append('circle')
  //       .attr('cx', '15')
  //       .attr('cy', '15')
  //       .attr('r', 10)

  //     refSvg.append('circle')
  //       .attr('cx', '15')
  //       .attr('cy', '40')
  //       .attr('r', 10)

  //     // let items = [30]
  //     let items = [10, 30, 70, 160]

  //     let refCircles = refSvg
  //       .selectAll('circle')
  //       .data(items)
  //       .attr('fill', 'blue')

  //     refCircles
  //       .enter()
  //       .append('circle')
  //       .attr('cx', d => d)
  //       .attr('cy', d => d)
  //       .attr('r', d => d / 3)
  //       .attr('fill', 'green')

  //     refCircles
  //       .exit()
  //       .attr('fill', 'red')
  //   },
  //   removeCicle () {
  //     this.$d3
  //       .select(this.$refs.createCircle)
  //       .selectAll('svg')
  //       .remove()
  //   },

  //   createCloud () {
  //     let refEl = this.$d3.select(this.$refs.createCloud)

  //     // viewBox="0 0 1280.000000 698.000000" preserveAspectRatio="xMidYMid meet"
  //     let refSvg = refEl.append('svg')
  //       .attr('width', '1280.000000pt')
  //       .attr('height', '698.000000pt')
  //       .style('background', 'gray')

  //     let g = `
  //       <g transform="translate(0.000000,698.000000) scale(0.100000,-0.100000)"
  //         fill="#607d8b" stroke="none">

  //         <path d="M6710 6973 c-74 -6 -239 -32 -330 -54 -439 -101 -861 -351 -1166
  //         -689 -42 -47 -79 -85 -83 -85 -3 0 -71 33 -151 72 -309 152 -576 218 -921 230
  //         -628 21 -1224 -214 -1675 -662 -283 -281 -494 -651 -590 -1033 -19 -75 -36
  //         -137 -38 -139 -1 -2 -50 -16 -108 -33 -378 -106 -726 -315 -1008 -606 -333
  //         -343 -541 -763 -616 -1244 -25 -161 -25 -502 0 -655 85 -518 312 -959 672
  //         -1305 433 -416 976 -634 1574 -634 276 0 525 42 770 129 112 40 341 155 456
  //         228 l101 65 119 -29 c359 -88 751 -85 1104 6 51 13 65 14 79 3 10 -7 65 -48
  //         122 -91 301 -226 660 -372 1054 -429 135 -19 474 -16 614 5 400 63 739 207
  //         1061 451 l104 79 41 -23 c22 -12 81 -44 131 -71 569 -305 1275 -342 1883 -100
  //         57 23 121 51 142 61 38 20 41 20 136 3 139 -25 556 -25 698 0 644 113 1186
  //         463 1540 996 408 616 488 1409 208 2096 -235 578 -700 1037 -1282 1264 -233
  //         91 -525 151 -733 151 l-81 0 -71 77 c-39 42 -120 119 -181 171 -361 309 -807
  //         496 -1285 537 l-76 7 -32 63 c-189 363 -537 713 -914 919 -377 205 -835 302
  //         -1268 269z"/>
  //       </g>
  //     `
  //     refSvg.append(g)
  //   },

  //   removeCloud () {
  //     this.$d3
  //       .select(this.$refs.createCloud)
  //       .selectAll('svg')
  //       .remove()
  //   },

  //   createBars () {
  //     let colorScale = this.$d3.scaleLinear().domain([0, this.svgWidth]).range(['red', 'blue'])
  //     let widthScale = this.$d3.scaleLinear().domain([0, this.svgWidth]).range([0, this.svgWidth])

  //     let canvas = this.$d3
  //       .select(this.$refs.bars)
  //       .append('svg')
  //       .attr('width', this.svgWidth)
  //       .attr('height', this.svgHeight)
  //       .style('background-color', 'dimgray')

  //     let bars = canvas
  //       .selectAll('rect')
  //       .data(this.dataArray)
  //       .enter()
  //       .append('rect')
  //       .attr('fill', e => colorScale(e * 4))
  //       .attr('width', e => this.svgWidth / 2)
  //       .attr('height', 20)
  //       .attr('y', 0)

  //     let t1 = bars
  //       .transition()
  //       .attr('y', (e, i) => i * 22)

  //     t1
  //       .transition()
  //       .duration(500)
  //       .attr('fill', e => colorScale(e))
  //       .attr('width', e => widthScale(e))
  //   },

  //   removeBars () {
  //     this.$d3
  //       .select(this.$refs.bars)
  //       .selectAll('svg')
  //       .remove()
  //   },

  //   addText () {
  //     this.$d3.select(this.$refs.text)
  //       .append('div')
  //       .text(this.$rString(50))
  //   },

  //   removeText () {
  //     this.$d3.select(this.$refs.text)
  //       .selectAll('div')
  //       .remove()
  //   }
  // },

  // watch: {
  //   radius (newValue) {
  //     this.circle.attr('r', this.radius)
  //   }
  // }
}
</script>

<template>
  <div v-show="stateFlag === 'diagram'">

    <q-card>
      <q-bar>
        Diagrama
        <q-space/>
        <q-btn icon="close" dense flat @click="$store.commit('goal/SET_STATE_FLAG', 'list')"/>
      </q-bar>

      <div class="q-pa-sm q-gutter-y-sm">

        <div class="q-ma-sm text-center">
          <q-img class="rounded-borders"
            src="statics/d1.jpeg" style="width: 100%"
            img-class="my-custom-image"
          />
          <q-img class="rounded-borders"
            src="statics/d2.jpeg" style="width: 100%"
            img-class="my-custom-image"
          />
          <q-img class="rounded-borders"
            src="statics/d3.jpeg" style="width: 100%"
            img-class="my-custom-image"
          />
          <q-img class="rounded-borders"
            src="statics/d4.jpeg" style="width: 100%"
            img-class="my-custom-image"
          />
        </div>

        <!--
        <div>
          <div class="q-gutter-y-sm">
            <q-btn size="xs" @click="resizeCircle">
              Redimensionar circulo
            </q-btn>
            <q-btn size="xs" @click="removeResizeCicles">
              Remover
            </q-btn>
            <br>
            <input v-show="circle"
              type="range"
              v-model="radius"
              min="1"
              max="100"
              step="1"
            >
          </div>
          <div ref="resizeCircle"/>
        </div>

        <q-separator/>

        <div>
          <q-btn size="xs" @click="createCircle">
            Criar circulos
          </q-btn>
          <q-btn size="xs" @click="removeCicle">
            Remover
          </q-btn>

          <div ref="createCircle"/>
        </div>

        <q-separator/>

        <div>
          <div>
            <q-btn size="xs" @click="createCloud">
              Criar Nuvens
            </q-btn>
            <q-btn size="xs" @click="removeCloud">
              Remover
            </q-btn>
          </div>

          <svg width="200" height="110" viewBox="0 0 1280 698">
            <g transform="translate(0, 698) scale(0.1, -0.1)" fill="#607d8b" stroke="none">
              <path d="M6710 6973 c-74 -6 -239 -32 -330 -54 -439 -101 -861 -351 -1166
              -689 -42 -47 -79 -85 -83 -85 -3 0 -71 33 -151 72 -309 152 -576 218 -921 230
              -628 21 -1224 -214 -1675 -662 -283 -281 -494 -651 -590 -1033 -19 -75 -36
              -137 -38 -139 -1 -2 -50 -16 -108 -33 -378 -106 -726 -315 -1008 -606 -333
              -343 -541 -763 -616 -1244 -25 -161 -25 -502 0 -655 85 -518 312 -959 672
              -1305 433 -416 976 -634 1574 -634 276 0 525 42 770 129 112 40 341 155 456
              228 l101 65 119 -29 c359 -88 751 -85 1104 6 51 13 65 14 79 3 10 -7 65 -48
              122 -91 301 -226 660 -372 1054 -429 135 -19 474 -16 614 5 400 63 739 207
              1061 451 l104 79 41 -23 c22 -12 81 -44 131 -71 569 -305 1275 -342 1883 -100
              57 23 121 51 142 61 38 20 41 20 136 3 139 -25 556 -25 698 0 644 113 1186
              463 1540 996 408 616 488 1409 208 2096 -235 578 -700 1037 -1282 1264 -233
              91 -525 151 -733 151 l-81 0 -71 77 c-39 42 -120 119 -181 171 -361 309 -807
              496 -1285 537 l-76 7 -32 63 c-189 363 -537 713 -914 919 -377 205 -835 302
              -1268 269z"/>
            </g>
          </svg>

          <div ref="createCloud"/>
        </div>

        <q-separator/>

        <div>
          <q-btn size="xs" @click="addText">
            adicionar texto
          </q-btn>
          <q-btn size="xs" @click="removeText">
            Remove
          </q-btn>
          <span ref="text"/>
        </div>

        <q-separator/>

        <div class="q-gutter-y-sm">
          <div>
            <q-btn size="xs" @click="createBars">
              Criar Bars
            </q-btn>

            <q-btn size="xs" @click="removeBars">
              Remover
            </q-btn>
          </div>

          <div ref="bars"/>
        </div>
        -->

      </div>

    </q-card>

  </div>
</template>

<style scoped>
</style>
