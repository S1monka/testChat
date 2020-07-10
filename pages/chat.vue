<template>
  <v-col sm="12" md="10" class="flex-grow-1 flex-shrink-0">
    <v-responsive
      class="overflow-y-hidden fill-height"
      min-height="200"
      max-height="550"
    >
      <v-card flat class="d-flex flex-column fill-height">
        <v-toolbar flat>
          <v-toolbar-title class="text-h5">Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title @click="logout"
            ><v-btn icon color="primary">
              <v-icon>mdi-logout</v-icon>
            </v-btn></v-toolbar-title
          >
        </v-toolbar>
        <v-card-text ref="window" class="flex-grow-1 overflow-y-auto">
          <chat-window
            v-for="(msg, index) in messages"
            :key="`message_${index}`"
            :msg="msg"
          />
        </v-card-text>
        <v-card-text class="flex-shrink-1 d-flex">
          <v-text-field
            label="Type a message"
            type="text"
            outlined
            dense
            hide-details
            @keypress.enter="postMessage"
            v-model="message"
          />
          <v-btn
            @click="postMessage"
            class="ml-2"
            fab
            dark
            small
            color="primary"
          >
            <v-icon dark>mdi-send</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-col>
</template>

<script>
import axios from 'axios'
import auth from '@/middleware/auth'
export default {
  async fetch({ store }) {
    await store.dispatch('getMessages')
  },
  middleware: auth,
  data: () => ({
    message: '',
    polling: null,
  }),
  computed: {
    messages() {
      return this.$store.state.messages
    },
  },
  components: {
    chatWindow: () => import('@/components/chat/chatMessage'),
  },
  methods: {
    async postMessage() {
      await this.$store.dispatch('postMessage', this.message)
      this.message = ''
      setTimeout(() => {
        this.scrollBottom()
      }, 705)
    },
    pollData() {
      this.polling = setInterval(() => {
        this.$store.dispatch('getMessages')
      }, 1000)
    },
    scrollBottom() {
      const container = this.$refs.window

      container.scrollTop = container.scrollHeight
    },
    logout() {
      this.$store.commit('setLogout')
      this.$router.push('/')
    },
  },
  mounted() {
    this.scrollBottom()
    this.pollData()
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
}
</script>

<style lang="scss" scoped></style>
