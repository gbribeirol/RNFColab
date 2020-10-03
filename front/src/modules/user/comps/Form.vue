<script>
// import { mapActions } from 'vuex'
import moment from 'moment'
import { uid } from 'quasar'
export default {
  name: 'Form',

  data: () => ({
    expense: {
      id: uid(),
      amount: '',
      description: '',
      date: moment().format('YYYY-MM-DD'),
      done: false
    }
  }),

  computed: {
    // ...mapState('post', ['posts'])
  },

  methods: {
    // ...mapActions('expense', ['addExpense_']),

    submit () {
      // this.$store.commit('expense/ADD', { ...this.expense })
      this.$firebaseDb.ref('expenses').push(this.expense)
      this.reset()
    },

    reset () {
      this.expense.id = uid()
      this.expense.amount = ''
      this.expense.description = ''
      this.expense.date = moment().format('YYYY-MM-DD')
      this.expense.done = false
      // this.$refs.amount.focus()
    }
  },

  created () {
    // this.loadPosts()
  }
}
</script>

<template>
  <div>

    <form @submit.prevent="submit">

      <div>
        <input ref="amount" class="my-input" type="number" v-model="expense.amount" placeholder="R$">
      </div>

      <div>
        <input class="my-input" type="text" v-model="expense.description" placeholder="Descrição">
      </div>

      <div>
        <input class="my-input" type="date" v-model="expense.date" placeholder="Data">
      </div>

      <div>
        <button class="primary my-buton">Salvar</button>
      </div>

    </form>

  </div>
</template>

<style>
  .my-input {
    width: 100%;
    margin-bottom: 20px;
  }
</style>
