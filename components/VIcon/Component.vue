<template>
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    @click="$emit('click')"
  >
    <use :xlink:href="`/icons.svg#${name}`"/>
  </svg>
</template>

<script>
export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      required: true
    },
  },
}
</script>
