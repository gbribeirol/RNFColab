<script>
import { mapState, mapGetters } from 'vuex'
import DisplayPost from './DisplayPost'

export default {
  name: 'ListPosts',

  computed: {
    ...mapState('mural', ['postSearchTerm', 'postSortField', 'postOrderFields']),
    ...mapGetters('mural', ['filteredPosts'])
    // posts () { return this.$store.getters.mural.filteredPosts }
  },

  components: {
    DisplayPost
  },

  data () {
    return {
      lPostSortField: '',
      listCounter: 5,
      stopLoad: false
    }
  },

  methods: {
    onLoad (index, done) {
      // setTimeout(() => {
      //   this.$store.dispatch('mural/load')
      //     .then(posts => {
      //       if (posts.length > this.listCounter) {
      //         this.listCounter = posts.length
      //         done()
      //       } else {
      //         this.stopLoad = true
      //         stop()
      //       }
      //     })
      // }, 2000)
    }
  },

  watch: {
    postSortField () {
      this.lPostSortField = this.postSortField
    }
  },

  mounted () {
    this.$store.dispatch('mural/bindPosts')
    this.lPostSortField = this.postSortField
    // this.$store.dispatch('mural/load')
  }
}
</script>

<template>
  <section>

    <div class="row q-gutter-x-xs">
      <Search
        class="col-8"
        :content="postSearchTerm"
        @input="content => $store.commit('mural/SET_POST_SEARCH_TERM', content)"
      />

      <q-select
        label="Ordem"
        class="col"
        filled
        dense
        options-dense
        bg-color="grey-3"
        transition-show="scale"
        transition-hide="scale"
        behavior="menu"
        v-model="lPostSortField"
        :options="postOrderFields"
        @input="content => $store.commit('mural/SET_POST_SORT_FIELD', content)"
      />
    </div>

    <div v-for="post in filteredPosts" :key="post.id">

      <q-card class="q-mt-xs bg-grey-1" flat bordered>
        <DisplayPost :post="post"/>
      </q-card>

    </div>

  </section>
</template>

<style scoped lang="stylus">
</style>
