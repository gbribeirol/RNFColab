<script>
export default {
  name: 'Formula'
}
</script>

<template>
  <section>

    <div class="q-mt-md text-center" style="font-weight: bold">FÓRMULAS</div>

    <div class="q-ml-sm" style="font-size: 12px; font-weight: bold">% Abstenções:</div>
    <div class="q-ml-sm" style="font-size: 10px">número de abstenções do participante / número de posicionamentos do participante</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">% Posicionamentos:</div>
    <div class="q-ml-sm" style="font-size: 10px">número de posicionamentos do participante / total de requisitos e correlações do projeto</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">% Argumentos:</div>
    <div class="q-ml-sm" style="font-size: 10px">número de argumentos do participante / total de argumentos do projeto</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">% Pontualidade:</div>
    <div class="q-ml-sm" style="font-size: 10px">número de dias do primeiro posicionamento do participante, em relação ao início do projeto / total de dias do projeto</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">% Firms e Blocks:</div>
    <div class="q-ml-sm" style="font-size: 10px">número de firms e blocks do participante / total de firms e blocks do projeto</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">% Posicionamentos Para Convergir:</div>
    <div class="q-ml-sm" style="font-size: 10px">número de posicionamentos para convergir do participante / total de posicionamentos para convergir do projeto</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">Argumentos relevantes:</div>
    <div class="q-ml-sm" style="font-size: 10px">número de argumentos do participante, com maioria de votos 'relevante'</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">Argumentos Informativos:</div>
    <div class="q-ml-sm" style="font-size: 10px">número de argumentos do participante, com maioria de votos 'informativo'</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">Pontuação de Argumentos:</div>
    <div class="q-ml-sm" style="font-size: 10px">(argumentos relevantes / total de argumentos, com maioria de votos 'relevante' x 5) + (argumentos informativos / total de argumentos, com maioria de votos 'informativo' x 3)</div>

    <div class="q-ml-sm q-mt-sm" style="font-size: 12px; font-weight: bold">Contribuição de Argumentos:</div>
    <div class="q-ml-sm" style="font-size: 10px">pontuação de argumentos / (peso do voto 'relevante' + peso do voto 'informativo')</div>

  </section>
</template>
