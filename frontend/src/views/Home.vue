<template>
  <div>
    <h1>this is home</h1>
    <div v-for="log in conversation.logs" :key="log.timestamps">{{log.message}}</div>
    <hr />
    <v-chip class="ma-2" color="primary">Primary</v-chip>

    <ul id="chatbox">
      <li v-for="message in messages" :key="message.id">{{message}}</li>
    </ul>

    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Send message:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="postedMessage"
            type="text"
            required
            placeholder="Type your message here"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { getConversation } from "@/services";
import io from "socket.io-client";

export default {
  name: "Home",
  data() {
    return {
      //misalkan untuk pengetesan pake id ini
      id: "5eb827fbb46dcb43c0cee2d8",
      conversation: Object,
      messages: [],
      postedMessage: "",
      show: true
    };
  },
  methods: {
    async getConversation() {
      try {
        let res = await getConversation("5eb827fbb46dcb43c0cee2d8");
        if (res.status >= 200 && res.status < 300) {
          console.log("request berhasil");
          console.log(res.data);
          this.conversation = res.data;
        } else {
          console.log("request gagal");
        }
      } catch (err) {
        console.log("error is");
        console.log(err);
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      //send message to socket
      this.sendMessageToSocket();
      // this.getMessageFromSocket();
      this.postedMessage = "";
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.postedMessage = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    sendMessageToSocket() {
      //channel socket : emitMessage
      this.$socket.emit("emitMessage", this.postedMessage);
    },
    getMessageFromSocket() {
      var that = this;
      try {
        this.$socket.on("emitMessage", function(message) {
          console.log("from getMessageFromSocket function Home");
          console.log(message);
          that.messages.push(message);
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.$socket = io();
    this.getConversation();
  },
  mounted() {
    console.log("from mounted");
    this.getMessageFromSocket();
  }
};
</script>
<style scoped>
</style>