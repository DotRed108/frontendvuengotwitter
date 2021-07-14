<template>
  <textarea id="chatLog" contenteditable="true"></textarea>
<!--  <div class="chat-log" v-for="(message, index) in chatSocket.chatLog" :key="index">-->
<!--    <div class="chats">{{message}}</div>-->
<!--  </div>-->
  <br>
  <input v-model="message" type="text">
  <button v-on:click="sendMessage(message)">Send</button>
</template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      chatSocket: null,
      message: '',
      chatLog: []
    }
  },
  computed: {

  },
  methods: {
    sendMessage(message) {
      this.chatSocket.send(JSON.stringify({
        'message': message,
        'command': 'new_message'
      }))
      this.message = ';'
    }
  },
  created() {
    this.chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/message/hello/')

    this.chatSocket.onopen = function (event) {
      console.log(event)
      console.log("successful connection to websocket")
      this.chatLog = []
      this.i = 0
    }
    this.chatSocket.onmessage = function (event) {
      const data = JSON.parse(event.data)
      console.log(data)
      this.chatLog.push(data.message)
      document.getElementById('chatLog').value += this.chatLog[this.i] + '\n'
      this.i++
    }
    this.chatSocket.onclose = function (event) {
      console.log(event)
      console.log('connection to websocket closed')
    }
  },
 }
</script>

<style scoped>
#chatLog {
  text-align: left;
  width: 100%;
  height: 90vh;
  resize: none;
  border: none;
  outline: none;
}

</style>