<script>
// import Media from '@dongido/vue-viaudio'

export default {
  name: 'MediaList',

  props: ['files'],

  components: {
    // Media
  },

  data () {
    return {
      slide: 0
    }
  }
}
</script>

<template>
      <!-- autoplay -->
      <q-carousel
        swipeable
        animated
        v-model="slide"
        height="100%"
        navigation
        transition-prev="slide-right"
        transition-next="slide-left"
        arrows
        infinite
        control-color="primary"
      >

        <q-carousel-slide v-for="(file, index) in files" :key="file.name" :name="index" class="q-ma-none q-pa-none">

          <!-- <Media v-if="file.type.includes('video')"
            :kind="'video'"
            :controls="true"
            :autoplay="false"
            :style="{ width: '100%' }"
            :src="[file.url]"
          /> -->

          <!-- <q-video v-if="file.type.includes('video')"
            style="height: 100;"
            :src="file.url"
          /> -->

          <!--
            <q-video v-if="file.type.value === 'video'"
              class="absolute-full"
              frameborder="0"
              allowfullscreen
              :src="file.url"
            /> -->

            <!-- @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @loadeddata="onPlayerLoadeddata($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"

            @statechanged="playerStateChanged($event)"
            @ready="playerReadied" -->

            <img v-if="file.type.includes('image')"
              v-viewer="{ navbar: false, title: false, toolbar: false, keyboard: false }"
              style="width: 100%;"
              :src="file.url"
            />

        </q-carousel-slide>
      </q-carousel>

</template>

<style scoped lang="stylus">
</style>
