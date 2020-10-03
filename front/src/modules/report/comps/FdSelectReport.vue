<script>
import Selection from 'src/comps/field/Selection'

export default {
  name: 'FdSelectReport',

  components: {
    Selection
  }
}
</script>

<template>
  <section>

    <Selection
      label="Resultado"
      :selected="$store.state.report.selectedReport"
      :options="$store.state.report.reports"
      @input="content => $store.commit('report/SET_SELECTED_REPORT', content, { root: true })"
    />

  </section>
</template>

<style scoped>
</style>
