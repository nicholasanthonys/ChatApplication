<template>
  <div id="home">
    <ChatScreen v-bind:user = "user" />
  </div>
</template>

<script>
import ChatScreen from "@/components/ChatScreen";
export default {
  name: "Home",
  components: {
    ChatScreen
  },
  data(){
    return {
      user : this.$session.get("user")
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  }
};
</script>