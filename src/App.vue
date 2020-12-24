<template>
  <v-app>
      <Header v-if="$route.path !== '/login'"></Header>
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
      <Footer v-if="$route.path !== '/login'"></Footer>

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

  data: () => ({
    //
  }),
};
</script>
