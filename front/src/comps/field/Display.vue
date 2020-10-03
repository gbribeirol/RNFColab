<script>
export default {
  name: 'Display',

  props: ['label', 'content']
}
</script>

<template>
  <div class="q-pa-xs"
    style="color: grey; line-height: 1.4; background-color: #E0E0E0; border-radius: 3px;"
  >

    <div class="q-pr-sm" style="font-size: 11px; color: #A8A8A8">
      {{ label }}<br>
    </div>

    <div style="font-size: 13.5px; color: #909090">
      {{ content }}
    </div>

  </div>
</template>
grey-4
