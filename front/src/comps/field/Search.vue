<script>
export default {
  name: 'Search',

  props: ['label', 'content'],

  data () {
    return {
      lContent: '',
      lLabel: ''
    }
  },

  methods: {
    setLocal () {
      this.lContent = this.content
    }
  },

  mounted () {
    this.setLocal()
    this.lLabel = this.label ? this.label : 'Busca'
  },

  watch: {
    content () {
      this.setLocal()
    }
  }
}
</script>

<template>

  <q-input
    :label="lLabel"
    filled
    bg-color="grey-3"
    borderless
    dense
    v-model="lContent"
    @input="$emit('input', lContent)">

    <!-- <template v-slot:prepend>
      <q-icon
        name="search"
        color="orange-7"
      />
    </template> -->

    <!-- <template v-slot:append>
      <q-icon v-show="lContent"
        name="cancel"
        @click.stop="$emit('input', '')"
      />
    </template> -->

  </q-input>
</template>
