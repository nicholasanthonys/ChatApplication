<template>
  <div id="home">
    <p>{{id}}</p>
    <div class="row">
      <div class="col">
        <ListChat v-bind:user="user" v-on:chat-clicked="chatClicked" />
      </div>
      <div class="col">
        <ChatScreen v-bind:user="user" v-bind:id="id" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatScreen from "@/components/ChatScreen";
import ListChat from "@/components/ListChat";
export default {
  name: "Home",
  components: {
    ChatScreen,
    ListChat
  },
  data() {
    return {
      user: this.$session.get("user"),
      id: ""
    };
  },
  methods: {
    chatClicked(value) {
      this.id = value;
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#home {
  padding-left: 50px;
  padding-right: 50px;
}
</style>