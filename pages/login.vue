<template>
  <v-col cols="12" sm="8" md="5">
    <v-card color="primary" outlined>
      <v-toolbar color="primary" dark flat>
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-h5"
          >Hello! What is your name?</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Your name"
            type="text"
            dark
            v-model="userName"
            @keypress.enter.prevent="goToChat"
          ></v-text-field>
        </v-form>
        <v-alert
          :value="error"
          color="pink"
          dark
          dense
          transition="scale-transition"
        >
          Your username should be at least 3 characters
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="goToChat" outlined color="white" block>Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data(context) {
    return { userName: '' }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  methods: {
    goToChat() {
      this.$store.commit('setLogin', this.userName)
      this.error ? '' : this.$router.push({ name: 'chat' })
    },
  },
}
</script>

<style lang="scss" scoped></style>
