<script>
import MyBtn from 'src/comps/Btn'
export default {
  name: 'Add',

  components: {
    MyBtn
  },

  methods: {
    new_ () {
      // alert('novo')
    }
  }
}
</script>

<template>
  <MyBtn
    icon="add"
    label="Novo"
    @click="new_"/>
</template>
