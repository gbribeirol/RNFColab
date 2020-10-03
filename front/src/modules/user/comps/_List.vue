<script>
// import { mapState } from 'vuex'

export default {
  name: 'List',

  // computed: {
  //   ...mapState('expense', ['expenses'])
  // }

  methods: {
    // ...mapActions('post', ['loadPosts'])
    askRemove (el) {
      this.$q.dialog({
        title: 'Tem certeza?',
        // message: 'Tem certeza que deseja excluir?',
        ok: 'Sim',
        cancel: 'Não'
      }).then(() => {
        // this.$q.notify('Agreed!')
        this.$store.commit('expense/REMOVE', el)
      })
    },

    toggleDone (expense) {
      expense.done = !expense.done
      this.$store.commit('expense/SET', expense)
    }
  }

  // created () {
  //   // this.loadPosts()
  //   this.$store.commit('expense/LOAD')
  // }
}
</script>

<template>
  <div>

    <!-- <div class="expense" v-for="e in expenses.list" :key="e.id"> -->
    <div class="expense" :class="{ done: el.done }" v-for="(el, idx) in $store.state.expense.expenses.list" :key="idx" @click="toggleDone(el)">
      <p>{{ el.date}} - R${{ el.amount }}</p>
      <p>{{ el.description }}</p> - {{ el.done }}
      <a href="#" class="removeLink" @click.prevent="askRemove(el)">Remover</a>
    </div>
  </div>
</template>

<style>
  .expense {
    border-bottom: #999 1px solid;
    padding-top: 10px;
    position: relative;
    cursor: pointer;
  }
  .removeLink {
    color: #c00000;
    position: absolute;
    bottom: 10px;
    right: 0;
    font-size: 0.8em;
  }
  .done {
    text-decoration: line-through;
  }
</style>
