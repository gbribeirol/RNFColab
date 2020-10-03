
export default {
  featureName: 'Usuário',

  loading: false,

  users: [],

  selected: {},
  copy: {},

  state: 'selection',

  genderTypes: ['Masculino', 'Feminino', 'Outro'],
  // 'Não Binário'

  roleTypes: ['Moderator', 'Eng.Requisito', 'Cliente', 'Desenvolvedor', 'Arquiteto', 'Testador', 'Visitante'],

  columns: [
    { name: 'id', field: 'id', label: 'id', align: 'left', sortable: true },
    { name: 'name', field: 'name', label: 'Nome', required: true, align: 'left', sortable: true },
    { name: 'email', field: 'email', label: 'Email', align: 'left', sortable: true },
    { name: 'creation', field: 'creation', label: 'Criado', align: 'center', sortable: true },
    { name: 'update', field: 'update', label: 'Atualizado', align: 'center', sortable: true }
  ],

  userJoao: {
    name: 'João de Oliveira Frade',
    birthDate: '07/12/1967',
    gender: 'Masculino',
    email: 'joao.o.frade@gmail.com',
    password: '123456',
    address: 'Rua Dona Salvadora, 15/301, Serra, Belo Horizonte, MG, CEP: 30220-230'
  },

  userFernanda: {
    name: 'Fernanda Barbato',
    birthDate: '07/12/1967',
    gender: 'Feminino',
    email: 'fer.barbato@gmail.com',
    password: '123456',
    address: 'Rua Dona Salvadora, 15/301, Serra, Belo Horizonte, MG, CEP: 30220-230'
  },

  userGiovana: {
    name: 'Giovana Linhares',
    birthDate: '07/12/1967',
    gender: 'Feminino',
    email: 'gbribeirol@gmail.com',
    password: '123456',
    address: 'Rua Dona Salvadora, 15/301, Serra, Belo Horizonte, MG, CEP: 30220-230'
  },

  userFabiana: {
    name: 'Fabiana Mendonça',
    birthDate: '07/12/1967',
    gender: 'Feminino',
    email: 'fabiana.mendonca@gmail.com',
    password: '123456',
    address: 'Rua Dona Salvadora, 15/301, Serra, Belo Horizonte, MG, CEP: 30220-230'
  },

  userEdja: {
    name: 'Edja Mara',
    birthDate: '07/12/1967',
    gender: 'Feminino',
    email: 'edjamattar@gmail.com',
    password: '123456',
    address: 'Rua Dona Salvadora, 15/301, Serra, Belo Horizonte, MG, CEP: 30220-230'
  },

  userJuliana: {
    name: 'Juliana Araújo',
    birthDate: '07/12/1967',
    gender: 'Feminino',
    email: 'jaraujosouza@yahoo.com.br',
    password: '123456',
    address: 'Rua Dona Salvadora, 15/301, Serra, Belo Horizonte, MG, CEP: 30220-230'
  },

  userMunique: {
    name: 'Munique Graziele',
    birthDate: '07/12/1967',
    gender: 'Feminino',
    email: 'muniqueinfo@yahoo.com.br',
    password: '123456',
    address: 'Rua Dona Salvadora, 15/301, Serra, Belo Horizonte, MG, CEP: 30220-230'
  },

  userLeila: {
    name: 'Leila Negris',
    birthDate: '07/12/1967',
    gender: 'Feminino',
    email: 'leilanegris@yahoo.com.br',
    password: '123456',
    address: 'Rua Dona Salvadora, 15/301, Serra, Belo Horizonte, MG, CEP: 30220-230'
  },

  userAdmin: {
    name: 'admin',
    birthDate: '01/01/1900',
    gender: 'Masculino',
    email: 'admin@gmail.com',
    password: '123456',
    address: 'Rua Av. Das Américas, 25, Belo Horizonte, MG, CEP:30220-230',
    roles: ['admin']
  },

  userVisitante: {
    name: 'visitante',
    birthDate: '01/01/1900',
    gender: 'Masculino',
    email: 'visitante@gmail.com',
    password: '123456',
    address: '',
    roles: ['Visitante']
  }

}
