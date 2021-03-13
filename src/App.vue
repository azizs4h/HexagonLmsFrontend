<template>

  <v-app>
    <Header v-if="$store.getters.isAuthenticated"></Header>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
      <Footer v-if="$store.getters.isAuthenticated"></Footer>
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