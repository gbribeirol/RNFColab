<script>
export default {
  name: 'Btn',

  props: {
    icon: { type: String },
    label: { type: String },
    to: { type: String }
  }
}
</script>

<template>
  <span>

      <!-- rounded -->
      <q-btn class="q-pa-none q-px-sm bg-blue-grey-1 text-indigo"
        flat
        no-caps
        no-ripple
        wait-for-ripple
        :label="label"
        :icon="icon"
        @click="$emit('click')">

        <!-- <q-icon
          size="25px"
          style="color: orangered"
          :name="icon"
       /> -->

      </q-btn>

      <!-- <q-btn class="bg-blue-grey-1 text-deep-orange"
        glossy rounded no-caps wait-for-ripple
        :icon="icon"
        :label="label"
        @click="$emit('click')"/> -->

      <slot/>

  </span>
</template>

<style>
</style>
