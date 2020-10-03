<script>
// import Map from 'src/modules/map/comps/Map'
export default {
  name: 'Index',

  data () {
    return {
      goals: `
        Suporte a construção de requisitos não funcionais (RNFs), promovendo a agilidade das negociações,
        fomentando a colaboração e redução de conflitos negativos.<br>
        <br>
        O intuito final é aumentar a qualidade da decisão acerca dos RNFs.
      `,
      negotiationCollaboration: `
        Durante a construção de requisitos de sistemas de software, o objetivo comum entre os engenheiros,
        arquitetos, projetistas, clientes, é produzir requisitos com qualidade e coerente com o que foi desejado,
        isto é, um produto que forneça a solução adequada para a necessidade do cliente. Porém, apesar deste objetivo comum a todos,
        são detectadas possibilidade de conflitos, pois existem perspectivas, diversidade dos perfis e posições diversas por parte
        dos interlocutores, o que desencadeia o processo de negociação-colaboração.
        O processo de construção de requisitos é permeado pelo processo de Negociação-Colaboração. <br><br>

        A definição prévia de critérios e o registro das alternativas de solução, dos diferentes pontos de vista ajudam a orientar
        a dinâmica em direção consenso, mas não são suficientes para resolver os conflitos. É necessário mover as posições dos
        membros da equipe para um mesmo ponto de consenso e para isso é necessário estimular ao mesmo tempo a negociação e a colaboração.

        O processo de Negociação-Colaboração pode ser dividido em <br><br>
        a).Apresentação de Propostas (onde as alternativas são apresentadas);<br>
        b).Argumentação (onde todos argumentam a favor ou contra as alternativas existentes);<br>
        c).Negociação (onde a dinâmica de negociação é iniciada, gerando um consenso acerca da melhor alternativa, no final de vários
        ciclos de discussão, onde os indivíduos colaboraram na construção de pontos de vista em comum);<br>
        d).Decisão (onde ocorre o consenso acerca da melhor alternativa e os próximos passos são listados).
        Para que o processo de negociação-colaboração se estabeleça é necessária a aplicação de alguns princípios. Estes princípios
        funcionam como premissas para o desencadeamento da dinâmica do processo.<br><br>

        São eles:<br>
        1.Imparcialidade: não fazer tender a uma determinada posição ou participante em detrimento de outro. Também deve-se eliminar
        o histórico do participante de processos anteriores, para que não sejam associados amo mesmo, perfis positivos ou negativos.<br>
        2.Transparência: não haver regras secretas. Se existe o registro de comportamento dos participantes, este deve ser anunciado a todos. <br>
        3.Eficácia ganha-ganha: direcionar o processo de negociação objetivando o consenso e procurando soluções que satisfaçam todas as partes.<br>
        4.Igualdade: todos os participantes possuem os mesmos direitos de participação no processo.<br>
        5.Confidencialidade: preservar os dados utilizados na negociação-colaboração.
      `,
      noFunctionalRequirements: `
        O Requisito Não Funcional (RNF), são requisitos gerais do software, como custo, performance, confiabilidade, acessibilidade,
        portabilidade, manutenabilidade, entre outros. Isso é, não está ligado diretamente ao que o sistema faz, mais também está ligado
        diretamente a sua complexidade, assim como o requisito funcional. Também pode ser visto como atributo de qualidade, que restringe
        as funcionalidades diretas do sistema. <br><br>
        Existem algumas classificações de RNF, entre elas duas abordagens: orientada a produto (o quanto um sistema satisfaz os RNFs
        que dele são requeridos e  propõem métodos quantitativos para medir o quanto um software satisfaz um dado RNF) e orientada ao
        processo (relacionada as decisões de desenho durante o processo de desenvolvimento de software e voltada para o aspecto qualitativo).
        Na abordagem orientada a processo, a inclusão de um RNF em uma especificação de requisitos, impacta outros RNFs já elicitados,
        esse impacto pode ser positivo ou negativo, isso é, por haver interdependências entre RNFs, a decisão da entrada de um novo RNF
        no conjunto já definido pode influenciar positivamente outro RNF contribuindo assim para sua satisfação, bem como pode influenciar
        negativamente, ou seja, contribuir para que um destes RNFs não seja satisfeito ou satisfeito apenas parcialmente.<br><br>
        A propósito, um RNF raramente pode ser considerado totalmente satisfeito. Porque são geralmente subjetivos, uma vez que podem ser
        vistos, interpretados e conceituados de forma diferente por diferentes pessoas. Os RNF abordam aspectos relacionados à qualidade
        de softwares. Qualidade é um conceito subjetivo, correto? Fora que os RNF são interdependentes, como já fora dito,
        interagem entre si, a tentativa de satisfazer um RNF pode prejudicar ou ajudar a satisfazer outros RNFs.
      `,
      parametersForEvaluatingParticipants: `
        <br><b>Abstenção (% de null)</b>: qtd de posição = "null" efetuados pelo participante / total de posicionamentos efetuados pelo participante.
        <br>
        <br><b>Participação</b>:
        <br> - posições preenchidas pelo participante / total de requisitos / correlações da construção.
        <br>
        <br> - argumento incluídos pelo participante / total argumentos cadastrados na construção.
        <br>
        <br><b>Pontualidade</b>: tempo para inicio do preenchimento dos posicionamentos e argumentos com relação ao prazo total da construção. Por exemplo: iniciou preenchimento 3 dias após o inicio da construção que possui o prazo total igual a 10 dias. 3/10 = 30%. É classificado como pontualidade média.
        <br>
        <br><b>Colaboração</b>: Relembrando, se em algum requisito, todos queriam uma posição e o participante votou em outra posição impedindo o consenso, é atitude "firm". Se, se absteve nesta mesma situação, é atitude "block".
        <br>
        <br> - qtd de atitudes block ou firm do participante / qtd de atitudes block ou firm do total de participantes.
        <br>
        <br> - qtd de atitudes para convergir com a maioria do participante / qtd de atitudes para convergir com a maioria do total de participantes.
        <br>
        <br><b>Contribuição de argumentos</b>: Contribuição do argumento = ((número de argumentos do participante com maioria votos<sup>[1]</sup> como contribuição relevante /total de argumentos que tiveram maioria votos como relevante) * 5 + (número de argumentos do participante com maioria votos como informativo /total de argumentos que tiveram maioria votos como informativo) * 3 + (número de argumentos do participante com maioria votos como inconsistente /total de argumentos que tiveram maioria votos como inconsistente) * 0) /8.  O argumento classificado como inconsistente não tem peso, isso é feito para não desestimular a inclusão de argumentos.
        <br>
        <br>[1] Um mesmo argumento poderá ser classificado por vários membros do grupo, então a classificação dele será a classificação que a maioria atribuiu. No caso de empate, a classificação de maior peso é a que pontua. Para estimular a prática de argumentação.
      `
    }
  },

  components: {
    // Map
  },

  methods: {
    vindiPayment () {
      // let privateKey = '6H4kA9uv8gJa4PFEjr1sGTeec6bglm84KAHIh3tkVH0'
      // let url = 'https://app.vindi.com.br/api/v1/customers?page=1&per_page=25&sort_by=created_at&sort_order=asc'

      const url = 'https://app.vindi.com.br/api/v1/public/payment_profiles'
      const profile = {
        holder_name: 'JOAO OLIVEIRA FRADE',
        card_expiration: '10/21',
        card_number: '5549066025156397',
        card_cvv: '550',
        payment_method_code: 'credit_card',
        payment_company_code: 'mastercard'
      }
      const publicKey = '4XqVLUKzmU1PaKIIGD3OnKEKZ-6uPc_kBtaPU-nC1Rw'
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(publicKey)
        }
      }
      this.$axios.post(url, profile, config)
        .then(res => {
          console.log('RESPONSE RECEIVED: ', res)
        }).catch(err => {
          console.log('AXIOS ERROR: ', err)
        })
    }
  },

  mounted () {
    this.$store.commit('SET_CURRENT_FEATURE', 'Início')
  }
}
</script>

<template>
  <QPage>
    <!-- <q-btn
      label="vindi payment"
      @click="vindiPayment"
    /> -->
    <div class="q-ma-sm q-gutter-y-xs">

      <q-card flat bordered class="bg-grey-1 q-px-sm">
        <div class="text-h6">
          Objetivos:
        </div>

        <div v-html="goals"/>
        <br>

        <!-- <img class="q-px-sm q-pb-sm"
          src="statics/apresentacao.jpg" width="100%"
        /> -->

        <div class="q-ma-sm text-center">
          <q-img class="rounded-borders"
            src="statics/apresentacao.jpg" style="width: 350px"
            img-class="my-custom-image"
          />
        </div>

      </q-card>

      <q-card flat bordered class="bg-grey-1 q-px-sm">
        <div class="text-h6">
          Negociação-Colaboração
        </div>

        <div v-html="negotiationCollaboration"/>
      </q-card>

      <q-card flat bordered class="bg-grey-1 q-px-sm">
        <div class="text-h6">
          Requisitos Não Funcionais
        </div>

        <div v-html="noFunctionalRequirements"/>
      </q-card>

      <q-card flat bordered class="bg-grey-1 q-px-sm">
        <div class="text-h6">
          Diagrama do processo
        </div>
        <br>

        <div class="text-center">
          <q-img class="rounded-borders"
            src="statics/processo.jpg" style="width: 650px"
            img-class="my-custom-image"
          />
        </div>
        <br>

      </q-card>

      <q-card flat bordered class="bg-grey-1 q-px-sm">
        <div class="text-h6">
          Diagrama de transição de Estados
        </div>
        <br>

        <div class="text-center">
          <q-img class="rounded-borders"
            src="statics/DTE.jpeg" style="width: 500px"
            img-class="my-custom-image"
          />
        </div>
        <br>

      </q-card>

      <q-card flat bordered class="bg-grey-1 q-px-sm">
        <div class="text-h6">
          Parâmetros para avaliação dos Participantes
        </div>
        <br>

        <div class="text-center">
          <q-img class="rounded-borders"
            src="statics/parametersForEvaluatingParticipants.jpg" style="width: 500px"
            img-class="my-custom-image"
          />
        </div>

        <div v-html="parametersForEvaluatingParticipants"/>

      </q-card>

    </div>

  </QPage>
</template>

<style scoped lang="sass">
  .my-custom-image
    filter: blur(1px) sepia()
</style>
