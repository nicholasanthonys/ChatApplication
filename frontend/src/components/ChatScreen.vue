<template>


        <v-card class="pa-2" outlined tile>
          <h1>Username : {{user.username}}</h1>
          <h1>id : {{id}}</h1>
          <hr />
          <perfect-scrollbar id ="pfs">
          <div id="screen">
            <div v-for="log in conversation.logs" :key="log.id">
              <div class="my-chats" v-if="log.sender==username">
                <v-chip class="ma-2 chip-my-chat" text-color="black">
                  <v-avatar left v-if="log.status=='failed'">
                    <v-icon>mdi-reload</v-icon>
                  </v-avatar>
                  <v-avatar left v-else>
                    <v-icon>mdi-check</v-icon>
                  </v-avatar>
                  {{log.message}}
                </v-chip>
              </div>
              <div class="other-chats" v-else>
                <v-chip class="ma-2 chip-other-chat" text-color="black">{{log.message}}</v-chip>
              </div>

              <!-- <div class="my-chats" v-if="log.sender=='nicholas'">
              <div class="my-chat">{{log.message}}</div>
            </div>
            <div class="other-chats" v-else>
              <div class="other-chat">{{log.message}}</div>
              </div>-->
            </div>
          </div>
          </perfect-scrollbar>

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

</template>

<script>
import { getConversation, sendMessage } from "@/services";
import io from "socket.io-client";

export default {
  name: "Home",
  props : {
    user : Object,
    id : String
  },
  watch: {
    //whenever id change
    id : function(){
      console.log('id is changing');
      this.getConversation(this.id);
    }
  },
  data() {
    return {
      //misalkan untuk pengetesan pake id ini
   
      conversation: Object,
      messages: [],
      postedMessage: "",
      show: true,
      username: this.user.username,
      
    };
  },
  methods: {
    async getConversation() {
      try {
        console.log('from get conversation, id is ');
        console.log(this.id);
        let res = await getConversation(this.id);
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
    scrollToEnd() {
      var screen = document.getElementById("pfs");
      screen.scrollTop = screen.scrollHeight;
      console.log("screen scrollheight ");
      console.log( screen.scrollHeight);
    },
    async sendMessageToDatabase() {
      try {
        let receiver = this.conversation.members.filter((name)=>name!=this.username);
        console.log('receiver is');
        console.log(receiver);
        let res = await sendMessage(
          this.id,
          this.username,
          receiver,
          this.postedMessage
        );
        if (res.status >= 200 && res.status < 300) {
          console.log(res.data.newMessage);
          //send message to socket
          this.sendMessageToSocket(res.data.newMessage);
          //clear postedMessage
          this.postedMessage = "";
        }
      } catch (err) {
        console.log(err);
      }
    },
    sendMessageToSocket(newMessage) {
      this.$socket.emit("emitMessage", newMessage);
    },
    getMessageFromSocket() {
      var that = this;
      try {
        this.$socket.on("emitMessage", function(message) {
          console.log(
            "get message from socket message status " + message.status
          );
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
  },
  updated(){
    this.scrollToEnd();
  }
};
</script>
<style scoped>
.ps {
  height: 400px;
  overflow: auto;
}
#screen {
  /* overflow: auto;
  margin: 0 auto;
  margin-top: 37px;
  height: 100px;
  border-top-style: none; */
  height: 100px;
  /* overflow-y: auto; */
}
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
.v-chip {
  align-items: unset;
  cursor: default;
  /* display: block; */
  /* line-height:auto !important; */
  /* background-color: #76ff03 !important; */
  max-width: 300px;
  height: auto !important;
  outline: none;
  /* overflow:unset !important; */
  padding: 10px !important;
  position: relative;
  text-decoration: none;
  transition-duration: 0.28s;
  transition-property: box-shadow, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  /* vertical-align:0px; */
  white-space: normal !important;
}
.chip-my-chat {
  background-color: #76ff03 !important;
}
.chip-other-chat {
  background-color: #e0e0e0 !important;
}
</style>