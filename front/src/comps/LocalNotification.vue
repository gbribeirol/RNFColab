<script>
export default {
  name: 'LocalNotification',

  data: () => ({
    permission: null
  }),

  mounted () {
    this.permission = Notification.permission
  },
  methods: {
    request () {
      Notification.requestPermission(() => {
        this.permission = Notification.permission
      })
    },

    sendNotification (msg, body, icon) {
      this.$messaging.requestPermission()
        .then(() => this.$messaging.getToken())
        .then(token => {
          if (token) {
            console.log('Enviar isso para um servidor:', token)
            return token
          }
          console.warn('Nenhum token disponível, solicite permissão para gerar um.')
        })

      // if ('serviceWorker' in navigator) {
      //   navigator.serviceWorker.register('./static/firebase-messaging-sw.js')
      //     .then(registration => {
      //       let getToken = () => {
      //         this.$messaging.getToken()
      //           .then(currentToken => {
      //             if (currentToken) {
      //               console.log('Enviar isso para um servidor:', currentToken)
      //               return currentToken
      //             }
      //             console.warn('Nenhum is disponível, solicite permissão para gerar um')
      //           })
      //       }

      //       this.$messaging.useServiceWorker(registration)

      //       this.$messaging.requestPermission()
      //         .then(() => {
      //           getToken()
      //         })
      //     })
      //     .catch(err => console.warn('Erro', err))
      // }

      // // if (!navigator.serviceWorker) {
      // if (!('serviceWorker' in navigator)) {
      //   alert('Esse browser não suporta serviceWorker!')
      // } else {
      //   navigator.serviceWorker.register('./sw.js')
      //     .then(r => {

      //     })
      // }

      // let notification

      // // if (!window.Notification) {
      // if (!('Notification' in window)) {
      //   alert('Esse browser não suporta notificações!')
      // } else if (window.Notification.permission === 'granted') {
      //   notification = new window.Notification(msg, { body }, icon)
      // } else {
      //   Notification.requestPermission(permission => {
      //     if (permission === 'granted') {
      //       notification = new window.Notification('Hi there!', { body: 'fddsfadfasfafads asdf afda fad fadfds fdsf a' })
      //     }
      //   })
      // }
      // console.log(notification)
    }
  }
}
</script>

<template>
  <div class="q-ma-md">

    <h3>Notificações Locais</h3>
    <br>
    <p>Permissão: {{ permission }}</p>

    <br>

    <a v-show="permission !== 'granted'"
      href=""
      @click.prevent="request()"
    >
      Solicitar

    </a>

    <a v-show="permission === 'granted'"
      href=""
      @click.prevent="sendNotification('Mensagem da notificação')"
    >
      Enviar notificação

    </a>

  </div>
</template>

<style>
</style>
