<template>
  <v-tab-item>
    <v-container>
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
                Not Ekle
              </v-btn>
            </template>
            <v-form
                v-model="valid"
                ref="form"
                lazy-validation
            >
            <v-card>
              <br>
              <v-card-title
              class="justify-center"
              >
                <h3>Not Ekle</h3>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                    >
                      <v-text-field
                          label="Not Başlığı"
                          required
                          :rules="noteRule"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          label="Not Açıklaması"
                          outlined
                          required
                          :rules="noteRule"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col
                    cols="12"
                    >
                      <v-file-input
                          chips
                          counter
                          multiple
                          show-size
                          outlined
                          truncate-length="40"
                          label="Dosya Ekle"
                      ></v-file-input>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                      <v-text-field
                          label="Dosya Açıklaması"
                          outlined
                      >
                      </v-text-field>
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
                  Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="saveNote()"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
              </v-form>
          </v-dialog>


      </v-row>
      <v-row>
          <v-col
              sm="6" md="4" lg="3" xl="4"
              v-for="item in notes" :key="item.id"
          >

            <v-card
                class="my-5 mx-auto pa-5"
                max-width="90%"
                outlined
            >
              <v-btn
                  v-if="student == 'false'"
                  elevation="1"
                  icon
                  large
                  class="float-right"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon
                      x-large >
                    mdi-notebook-edit
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <br>
                  <v-list-item-title>
                    <h3>
                      {{item.note_title}}
                      {{student}}
                    </h3>
                  </v-list-item-title>
                  &emsp;
                  <v-list-item-content>
                    {{item.note_description}}
                  </v-list-item-content>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                <span class=" float-right">{{item.teacher.name}} {{item.teacher.surname}}</span><br>
                <span class=" float-right">{{item.teacher.email}}</span><br>
                <span class=" float-right">{{item.note_publish_date}}</span><br>

              </v-card-text>
            </v-card>
          </v-col>
      </v-row>

    </v-container>
  </v-tab-item>
</template>

<script>
import axios from "axios";

export default {
  props: ['id'],
  name: "Notes",
  data: () =>({
    url : '',
    notes : null,
    valid : true,
    student: localStorage.getItem('is_student'),
    dialog: false,
    noteRule: [
      v => !!v || 'Bu alan gereklidir.',
    ],
  }),
  methods:{
    saveNote(){
      if(this.$refs.form.validate()){
        alert("kanki ? ")
        this.dialog = false
      }
    },
  },

  mounted(){
    this.url= this.$store.getters.url+'/lessons/notes/'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
    }

    axios.post(this.url, {'id': this.$props.id}, {headers})
        .then((res) => {
      this.notes = res.data
      console.log(this.notes)
    })
        .catch((error) => {
          console.error(error)
        })

  },
}

</script>