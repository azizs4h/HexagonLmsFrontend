<template>

  <v-app >
    <Header v-if="$store.getters.isAuthenticated"></Header>
      <v-main>
        <v-container style="max-width: 1200px">
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
  beforeCreate() {
    this.$store.dispatch("initAuth");
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.v-application a{

}

</style>