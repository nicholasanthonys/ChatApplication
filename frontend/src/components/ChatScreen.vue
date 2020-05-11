<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col md="6" offset-md="3">
        <v-card class="pa-2" outlined tile>
          <h1>this is homes</h1>

          <hr />
          <div v-for="log in conversation.logs" :key="log.timestamps">
            <div class="my-chats" v-if="log.sender=='nicholas'">
              <div class="my-chat">{{log.message}}</div>
            </div>
            <div class="other-chats" v-else>
              <div class="other-chat">{{log.message}}</div>
            </div>
          </div>

          <!-- <ul id="chatbox">
            <li v-for="message in messages" :key="message.id">{{message}}</li>
          </ul>-->

          <div id="form">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getConversation, sendMessage } from "@/services";
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
      show: true,
      username: "nicholas"
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
        }
      } catch (err) {
        console.log("error is");
        console.log(err);
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      //send message to database
      this.sendMessageToDatabase();
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
    async sendMessageToDatabase() {
      try {
        let res = await sendMessage(
          this.id,
          this.username,
          "jeje",
          this.postedMessage
        );
        if (res.status >= 200 && res.status < 300) {
          console.log("send message ke database berhasil");
          //send message to socket
          this.sendMessageToSocket();
          //clear postedMessage
          this.postedMessage = "";

          // console.log(res.data);
          // this.conversation = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    sendMessageToSocket() {
      //channel socket : emitMessage
      let log = {
        conversation_id: this.id,
        sender: this.username,
        receiver: "jeje",
        // timestamps: "2020-03-03",
        message: this.postedMessage
      };
      this.$socket.emit("emitMessage", log);
    },
    getMessageFromSocket() {
      var that = this;
      try {
        this.$socket.on("emitMessage", function(message) {
          console.log("from getMessageFromSocket function Home");
          console.log(message);
          that.conversation.logs.push(message);
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
.other-chats {
  display: flex;
  flex-wrap: wrap;
}
.my-chats {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}
.my-chat {
  /* display: inline-flex;*/
  background-color: #76ff03;
  margin-bottom: 10px;
  max-width: 300px;
  border-radius: 10px;
  padding: 10px;
}

.other-chat {
  background-color: #e0e0e0;
  margin-bottom: 10px;
  max-width: 300px;
  border-radius: 10px;
  padding: 10px;
}
</style>