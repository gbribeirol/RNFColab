<script>
import Selection from 'src/comps/field/Selection'

export default {
  name: 'FdSelectProject',

  components: {
    Selection
  }
}
</script>

<template>
  <section>

    <Selection
      label="Projeto"
      :selected="$store.state.project.selected"
      :optionValue="opt => opt"
      :optionLabel="opt => opt.name"
      :options="$store.state.project.projects"
      @input="content => $store.commit('project/SET_SELECTED', content, { root: true })"
    />

  </section>
</template>

<style scoped>
</style>
