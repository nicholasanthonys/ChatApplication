<template>
<v-app>
  
  <div id="app">
    <router-view />
    <v-app><v-chip class="ma-2" color="green">tes</v-chip></v-app>
  </div>
</v-app>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "@/assets/custom.scss";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
