<script>
// import Media from '@dongido/vue-viaudio'

export default {
  name: 'ListImage',

  props: ['post'],

  components: {
    // Media
  },

  data () {
    return {
      slide: 1
    }
  }
}
</script>

<template>
  <div class="q-ma-none q-pa-none">
      <!-- navigation -->
      <!-- autoplay -->
      <q-carousel class="q-ma-none q-pa-none"
        swipeable
        animated
        v-model="slide"
        navigation
        transition-prev="slide-right"
        transition-next="slide-left">

        <q-carousel-slide v-for="(file, index) in post.files" :key="file.fullPath" :name="index"
          class="q-ma-none q-pa-none">

          <!-- <Media v-if="file.type.value === 'video'"
            :kind="'video'"
            :controls="true"
            :autoplay="false"
            :style="{ width: '100%' }"
            :src="[file.url]"
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

            <img v-if="file.type.value === 'image'" style="height: 100%"
              :src="file.url"
            />

        </q-carousel-slide>
      </q-carousel>

  </div>
</template>

<style scoped lang="stylus">
</style>
