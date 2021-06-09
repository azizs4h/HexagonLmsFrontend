<template>
  <v-container>
    <!--<v-btn @click="logout">çık artık</v-btn>-->
    <v-row v-if="loading">
      <v-col class="text-center">
        <v-progress-linear
            indeterminate
            color="cyan"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <br>
        <h1 class="font-weight-bold display-2">DERSLER</h1>
        <br>
        <hr>
        <br>
      </v-col>
    </v-row>
      <v-row>
        <v-col class="justify-start" sm="8" md="6" lg="4" xl="2" v-for="(lesson, key) in lessons" :key="key">
          <div v-for="(item, key) in lesson" :key="key">
          <v-card @click="$router.push({ name: 'Lesson', params: { 'id': item.id } })"
          max-width="200px"
          >
            <v-img
                :src="require('@/assets/img/day69-dotted-notebook.svg')"
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
import {headers} from "@/utils";

export default {
name: "Home",
  data: () =>({
    url : '',
    lessons : null,
    user_id : null,
    loading : true,
  }),
  methods : {
    logout(){
      this.$store.dispatch("logout");
    },
    getLesson(){
      this.user_id = localStorage.getItem("user_id")
      this.url= this.$store.getters.url+'/lessons/u/'+this.user_id;

      axios.get(this.url, {headers})
          .then((res) => {
            this.lessons = res.data;
          })
          .catch((error) => {
            console.error(error)
          })
    },
     getUserLessons() {
      var url= this.$store.getters.url+'/user/info/'
      axios.get(url, {headers})
          .then((res) => {
            if(res.data.teacher_user !== null){
              this.user_id = res.data.teacher_user.id
            }
            else
              this.user_id = res.data.student_user.id
            this.url= this.$store.getters.url+'/lessons/u/'+this.user_id;
            this.getLesson()
            this.loading = false;
      })
          .catch((error) => {
            if(error.response.status === 401){
              console.log("home 401")
              this.$store.dispatch("logout");
            }
            console.error(error);
            this.loading = true;
          })
       //.finally(() =>)
    }
  },
  created() {
    this.getUserLessons();
  },
}
</script>

<style scoped>
</style>