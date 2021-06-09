<template>
  <v-container>
    <v-app-bar
        app
    >
      <v-toolbar-title>
        <v-list-item class="px-2" to="/" >
          <v-list-item-avatar>
            <v-img
                :src="require('../../assets/img/logo1.png')"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              Hexagon Lms
            </v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-toolbar-title>
      <v-spacer/>

      <div>
        <v-menu
        :model="menu"
        :close-on-content-click="false"
        :nudge-width="250"
        offset-y
        >
          <template v-slot:activator="{on}">
          <v-col style="cursor: pointer;" v-on="on">
            <v-row>
              <v-avatar size="40">
                <v-img :src="require('../../assets/img/avatar.png')"></v-img>
              </v-avatar>
                <h4 v-if="userInfo !== '' && userInfo.student_user !== null" style="line-height: 40px;padding-left: 10px;user-select: none;">{{userInfo.student_user.name}}</h4>
                <h4 v-else-if="userInfo !== '' && userInfo.teacher_user !== null" style="line-height: 40px;padding-left: 10px;user-select: none;">{{userInfo.teacher_user.name}}</h4>

            </v-row>
          </v-col>

          </template>
          <v-card>
            <v-list>
              <v-list-item-group>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                         :src="require('../../assets/img/avatar.png')"
                  />

                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-if="userInfo !== '' && userInfo.student_user !== null">
                    {{userInfo.student_user.name}}
                  </v-list-item-title>
                  <v-list-item-title v-else-if="userInfo !== '' && userInfo.teacher_user !== null">
                    {{userInfo.teacher_user.name}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider/>
              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon>
                      mdi-cog
                    </v-icon>

                  </v-list-item-action>
                 <v-list-item-title>
                   Ayarlar
                 </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-switch
                        class="float-left"
                        v-model="changetheme"

                    >

                    </v-switch>

                  </v-list-item-action>
                  <v-list-item-title>
                    {{ tema }} Tema
                  </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>

                  <v-list-item-icon>
                    <v-icon
                    large >
                      mdi-exit-to-app
                    </v-icon>

                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title @click="logout">
                      Çıkış
                    </v-list-item-title>
                  </v-list-item-content>


                </v-list-item>
              </v-list>
              </v-list-item-group>
            </v-list>
          </v-card>

        </v-menu>
      </div>
    </v-app-bar>
    </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Header",

    data: () => ({
      url : '',
      menu : false,
      tema : "Açık",
      changetheme: false,
      drawer: false,
      userInfo: '',
    }),
    methods : {
      logout(){
        this.$store.dispatch("logout");
      }
    },
    beforeMount(){
      this.url= this.$store.getters.url+'/user/info/'
      axios.get(this.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
        },
      }).then((res) => {
        this.userInfo = res.data
        localStorage.setItem('is_student', res.data.is_student)
        localStorage.setItem('user_name', res.data.username)
        if(res.data.teacher_user !== null){
          localStorage.setItem('user_id', res.data.teacher_user.id)
          localStorage.setItem('email',res.data.teacher_user.email)
        }

      else{
          localStorage.setItem('user_id', res.data.student_user.id)
          localStorage.setItem('email',res.data.student_user.email)
        }
      })
          .catch((error) => {
            console.error(error)
          })
    },
    watch:{
      changetheme: function (next){
        this.$vuetify.theme.dark=next;
        if(next)
          this.tema = "Koyu";
        else
          this.tema = "Açık";
      }
    },
  };
</script>

<style scoped>

</style>