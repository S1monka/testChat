<template>
  <v-app>
    <v-main :style="{ background: $vuetify.theme.themes['light'].primary }">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <nuxt />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
