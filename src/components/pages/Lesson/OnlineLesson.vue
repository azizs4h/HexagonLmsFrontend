<template>
  <v-tab-item>
    <v-container>
      <div class="text-center">
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            absolute
            left
            top
            :multi-line="true"
            :vertical="true"
            color="blue-gray"
            elevation="24"
            transition="scroll-x-transition"
        >
          Ders Bulunamadı.

          <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
              Kapat
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <br>
      <v-row v-if="student == 'false'"
             class="ma-auto px-10 justify-end"
      >
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              Ders Başlat
            </v-btn>
          </template>
          <v-card>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                        label="Toplantı Adı"
                        required
                        v-model="name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
              >
                Kapat
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="createLesson()"
              >
                Başlat
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row
          class="ma-auto px-10"
          v-else
      >
        <v-col class="text-right">
          <v-btn
              @click="goToLesson()"
              class="text-uppercase"
              color="primary"
          >
            Derse katıl
          </v-btn>
        </v-col>
      </v-row>

      <br>

      <h2 class="font-weight-bold text-center text-uppercase">
        Geçmİş Dersler
      </h2>
      <hr>
      <br>

      <v-row>
        <v-col
        cols="10"
        class="mx-auto"
        >
          <v-card
              class="my-3 mx-auto"
              max-width="90%"
              outlined
              v-for="item in last_lesson" :key="item.id"
          >
            <v-list-item>
              <v-list-item-avatar>
                <v-icon
                    x-large >
                  mdi-history
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-regular">
                  {{item.name}}
                </v-list-item-title>
                <v-list-item-subtitle class="text-right">{{formatDate(item.meet_time)}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-tab-item>
</template>

<script>
import axios from "axios";

export default {
  name: "OnlineLesson",
  props: ['id'],
  data: () =>({
    dialog: false,
    name:'',
    newMeet:{
      name: '',
      lesson: '',
    },
    last_lesson:'',
    lesson_id: '',
    student: localStorage.getItem('is_student'),
    snackbar: false,
    timeout: 3000,
  }),
  methods: {

    createLesson(){
      this.dialog = false;
      this.url= this.$store.getters.url+'/meet/add/';
      console.log(this.url);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
      }

      this.newMeet.lesson = this.$props.id;
      this.newMeet.name = this.name;

      axios.post(this.url, this.newMeet,{headers})
          .then((res) => {
            this.dialog = false;
            this.$router.push({ name: 'meet', params: { name : this.name } });
          })
          .catch((error) => {
            if(error.response.status === 404)
             console.log("ders başlatılamadı");
          })

    },
    getLesson() {
      this.dialog = false;
      this.url= this.$store.getters.url+'/meet/get/';
      console.log(this.url);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
      }

      this.newMeet.lesson = this.$props.id;
      this.newMeet.name = this.name;

      axios.get(this.url + this.$props.id,{headers})
          .then((res) => {
            this.last_lesson = res.data;
            this.lesson_id = res.data[res.data.length-1].name;
          })
          .catch((error) => {
            if(error.response.status === 404)
              console.log("ders yok");
          })
    },
    formatDate(str){
      var clock = str.substring(str.lastIndexOf("T")+1,str.lastIndexOf("T")+6);
      var date = str.substring(0,str.lastIndexOf("T"));
      return clock+" "+date;
    },
    goToLesson(){
      if(this.lesson_id !=='')
        this.$router.push({ name: 'meet', params: { name : this.lesson_id} });
      else
        this.snackbar=true;
    }

  },
  mounted() {
    this.getLesson();
  },

}
</script>

<style scoped>

  .card {
    /* the other rules */
    transition: height 0.3s, box-shadow 0.3s;
  }
  .card:hover {
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.5);
  }
</style>