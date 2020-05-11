<template>
  <div id="app">
    <router-view />
  </div>
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

<style scoped>
#app {
  margin-left: auto;
  margin-right: auto;
}
</style>
