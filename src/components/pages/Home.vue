<template>

  <v-container >
    <v-btn @click="logout">çık artık</v-btn>
      <v-row>
        <v-col sm="8" md="4" lg="3" xl="2" v-for="(lesson, key) in lessons" :key="key">
          <div v-for="(item, key) in lesson" :key="key">
          <v-card @click="$router.push({ name: 'Lesson', params: { item } })">
            <v-img
                :src="require('../../assets/img/day69-dotted-notebook.svg')"
            >

            </v-img>

            <v-card-subtitle>
              {{ item.name }}
            </v-card-subtitle>
          </v-card>
          </div>
        </v-col>
      </v-row>
  </v-container>


</template>

<script>

import axios from "axios";

export default {
name: "Home",
  data: () =>({
    url : 'http://localhost:8000/lessons/',
    lessons : null,
  }),
  methods : {
    logout(){
      this.$store.dispatch("logout");
    },
  },
  mounted(){
    axios.get(this.url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
      },
    }).then((res) => {
      this.lessons = res.data;
      console.log(this.lessons)
    })
        .catch((error) => {
          console.error(error)
        })

  },
  components: { }
}
</script>

<style scoped>

</style>