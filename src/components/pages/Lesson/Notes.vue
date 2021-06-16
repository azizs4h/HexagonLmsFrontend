<template>
  <v-tab-item>
    <v-container>
      <br>
      <v-row v-if="loading">
        <v-col class="text-center">
          <v-progress-linear
              indeterminate
              color="cyan"
          ></v-progress-linear>
        </v-col>
      </v-row>
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
                          v-model="new_note.note_title"
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
                          v-model="new_note.note_description"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col
                    cols="12"
                    >
                      <v-file-input
                          chips
                          show-size
                          outlined
                          truncate-length="40"
                          label="Dosya Ekle"
                          @change="onFileChange"
                      ></v-file-input>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                      <v-text-field
                          label="Dosya Açıklaması"
                          outlined
                          v-model="new_note.file_description"
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
                  Kapat
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="saveNote()"
                >
                  Kaydet
                </v-btn>
              </v-card-actions>
            </v-card>
              </v-form>
          </v-dialog>


      </v-row>
      <v-row v-if="!notesDNE">
          <v-col
              sm="6" md="4" lg="3" xl="4"
              v-for="item in notes" :key="item.id"
          >

            <v-card
                class="my-5 mx-auto pa-5"
                max-width="90%"
                outlined
                elevation="5"
            >
              <v-btn
                  v-if="student === 'false'"
                  elevation="1"
                  icon
                  large
                  class="float-right"
                  @click="deleteNote(item.id)"
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
      <v-row v-if="notesDNE">
        <v-col>
          <h1 class="text-center">{{ notes.message }}</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
        transition="scroll-x-reverse-transition"
        v-model="snackbar"
        :timeout="timeout"
        :vertical="true"
        top
        right
        color="blue-gray"
        elevation="24"
    >
      Not & Duyuru Silindi.

      <template v-slot:action="{ attrs }">
        <v-btn
            v-bind="attrs"
            @click="snackbar = false"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        transition="scroll-x-reverse-transition"
        v-model="saveSnackbar"
        :timeout="timeout"
        :vertical="true"
        top
        right
        color="blue-gray"
        elevation="24"
    >
      Not & Duyuru Eklendi.

      <template v-slot:action="{ attrs }">
        <v-btn
            v-bind="attrs"
            @click="saveSnackbar = false"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
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
    new_note:
        {
          "note_title": null,
          "note_description": null,
          "lesson": null,
          "teacher": null,
          "file": null,
          "file_description": null
        },
    valid : true,
    notesDNE : false, //notes data not empty
    student: localStorage.getItem('is_student'),
    dialog: false,
    snackbar: false,
    saveSnackbar: false,
    timeout: 3000,
    loading : false,
    noteRule: [
      v => !!v || 'Bu alan gereklidir.',
    ],
  }),
  methods:{
    onFileChange(e) {
      let files = e.target.file || e.dataTransfer.file;
      if (!files.length)
        return;
      this.createFile(files[0]);
    },

    createFile(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.new_note.file = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    saveNote(){
      if(this.$refs.form.validate()){
        this.new_note.lesson =  this.$props.id;
        this.new_note.teacher = localStorage.getItem('user_id');
        console.log(this.new_note.file)

        this.url= this.$store.getters.url+'/lessons/notes/add/';
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`,
        }

        axios.post(this.url, this.new_note,{headers})
            .then((res) => {
              this.getNote();
              this.dialog = false;
              this.saveSnackbar = true;

            })
            .catch((error) => {
              console.error(error)
            })
      }
    },
    deleteNote(id){
      this.url= this.$store.getters.url+'/lessons/notes/delete/'
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`,
      }
      this.snackbar = true;
      axios.delete(this.url+id,{headers})
          .then((res) => {
            if(res.status === 200){

              if(this.notes.length === 0){
                this.notes = null;
                this.getNote();
              }
              this.notes.forEach((value,index) => {
                if(value.id === id){
                  this.notes.splice(index, 1)
                }
              });
            }
          })
          .catch((error) => {
            console.error(error)
          })
      },
    getNote(){
      this.url= this.$store.getters.url+'/lessons/notes/'
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
      }

      axios.get(this.url+this.$props.id,{headers})
          .then((res) => {
            this.notes = res.data;
          })
          .catch((error) => {
            if(error.response.status === 404)
              this.notesDNE = true;
            this.notes = error.response.data;
          })
    }
  },
  mounted(){
    this.getNote();
  },

}

</script>



