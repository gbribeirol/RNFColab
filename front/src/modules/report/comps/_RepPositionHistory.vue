<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RepPositionHistory',

  computed: {
    ...mapGetters('report', ['filteredReqs'])
  }
}
</script>

<template>
  <section>

    <div v-for="req in filteredReqs" :key="req.id">
      <span>
        {{ req.name }}
      </span>
    </div>

  </section>
</template>

<style scoped>
</style>
