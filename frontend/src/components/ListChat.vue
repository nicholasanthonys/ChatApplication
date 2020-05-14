<template>
  <v-card class="mx-auto">
    <v-toolbar color="cyan" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Inbox</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <perfect-scrollbar>
      <v-list three-line>
        <template>
          <div v-for="(item,index) in items" :key="item.id">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-item v-else :key="item.title" @click="chatclicked(item.id)">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-card>
</template>


<script>
import { loadListChat, getOtherUser } from "@/services";

export default {
  props: {
    user: Object
  },
  data: () => ({
    items: [
      // { header: "Today" },
      // {
      //  avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      //   title: "Nicholas",
      //   subtitle:
      //     " I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      // },
      // { divider: true, inset: true }
    ]
  }),
  methods: {
    chatclicked(id) {
      this.$emit('chat-clicked',id);
    },
    async loadListChat() {
      try {
        let username = this.user.username;
        let res = await loadListChat(username);
        if (res.status >= 200 && res.status < 300) {
          console.log("load list chat berhasil");
          console.log(res.data);

          for (const element of res.data) {
            let id = element.id;
            let profilePicture = "";
            let otherName = "";
            let lastMessage = element.lastChat.message;
            for (const other of element.others) {
              let res = await getOtherUser(other);
              profilePicture = res.data.picture;
              if (otherName == "") {
                otherName += other;
              } else {
                otherName += ", " + other;
              }
            }
            let item = {
              id : id,
              avatar: profilePicture,
              title: otherName,
              subtitle: lastMessage
            };
            this.items.push(item);
            this.items.push({ divider: true, inset: true });
          }
        }
      } catch (err) {
        console.log("load list chat error");
        console.log(err);
      }
    }
  },
  mounted() {
    let that = this;
    this.loadListChat().then(()=>{
      //automatic open items at index 0;
      that.chatclicked(that.items[0].id);
    });
  }
};
</script>

<style scoped>
.ps {
  height: 570px;
  overflow: auto;
}
</style>