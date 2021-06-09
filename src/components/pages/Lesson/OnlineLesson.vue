<template>
  <v-tab-item>
    <v-container>
      <v-card
          class="my-3 mx-auto card"
          max-width="90%"
          outlined

      >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon
                x-large >
              mdi-cast-education
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
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
                              v-model="toplantiAdi"
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
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>

    </v-container>
  </v-tab-item>
</template>

<script>
import axios from "axios";

export default {
  name: "OnlineLesson",
  data: () =>({
    dialog: false,
    toplantiAdi: 'denemee',
  }),
  methods: {

    createLesson(){
      this.dialog = false;
      this.$router.push({ path: '/online_lesson', params: {meet: this.toplantiAdi} })
      /*this.url= this.$store.getters.url+'/lessons/notes/'
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
      }

      axios.get(this.url+this.$props.id,{headers})
          .then((res) => {





          })
          .catch((error) => {
            if(error.response.status === 404)
             console.log("ders başlatılamadı")
          })*/

    }
  }
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