export default {
  featureName: 'Menu',

  options: [
    { label: 'Início', icon: '', route: 'home' },
    { label: 'Projeto', icon: '', route: 'project', src: '' },
    { label: 'Catálogo', icon: '', route: 'goal', src: '' },
    { label: 'Requisito', icon: '', route: 'req', src: '' },
    // { label: 'Posicionamentos', icon: '', route: 'position', src: '' },
    { label: 'Mural', icon: '', route: 'mural', src: '' },
    { label: 'Relatórios', icon: '', route: 'report', src: '' },
    // { label: 'Usuário', icon: '', route: 'user', src: '' },
    // { label: 'Configuração', icon: '', route: 'configuration', src: '' },
    // { label: 'Local notification', icon: '', route: 'localNotification', src: '' },
    {
      label: 'Sair', icon: '', src: '',
      cmd: (context) => context.$store.dispatch('auth/signOut')
    }
  ],

  selected: {}
}
