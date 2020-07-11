<template>
  <div
    class="d-flex align-center mb-2"
    :class="{ 'justify-end': msg.userName == user }"
  >
    {{ msg.userName }}:
    <v-chip
      :color="msg.userName == user ? 'primary' : ''"
      dark
      style="height: auto; white-space: normal;"
      class="pa-2 mx-1"
    >
      {{ msg.text }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    msg: Object,
  },
  computed: {
    user() {
      return this.$store.state.userName
    },
  },
}
</script>

<style lang="scss" scoped></style>
