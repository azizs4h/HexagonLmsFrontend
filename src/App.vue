<template>
  <v-app>
      <Header v-if="$store.getters.isAuthenticated"></Header>
      <v-main>
        <v-container class="pa-16">
          <router-view></router-view>
        </v-container>
      </v-main>
      <Footer v-if="$store.getters.isAuthenticated !== '/login'"></Footer>

  </v-app>
</template>

<script>

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },
  created() {
    this.$store.dispatch("initAuth");
  },
  data: () => ({
    //
  }),
};
</script>
