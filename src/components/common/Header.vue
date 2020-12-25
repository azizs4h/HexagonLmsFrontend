<template>
    <div>
    <v-card>
      <v-navigation-drawer
          app
          v-model="drawer"
          clipped
          :mini-variant.sync="mini"
          permanent
          class="elevation-5"
      >
        <v-list
            dense
            nav
        >
          <v-divider/>
          <v-list-item to="/">
            <v-list-item-action>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-action>

            <v-list-item-title>
              Anasayfa
            </v-list-item-title>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-app-bar
        app
        clipped-left
    >
      <v-app-bar-nav-icon style="margin: 0 0 0 10px;" @click="mini=!mini"/>
      <v-toolbar-title>
        <v-list-item class="px-2" to="/">
          <v-list-item-avatar>
            <v-img
                :src="require('../../assets/img/logo1.png')"
            />
          </v-list-item-avatar>

          <v-list-item-title>
            Hexagon Lms
          </v-list-item-title>
        </v-list-item>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn class="ma-1" icon>
        <v-icon>
          mdi-apps
        </v-icon>
      </v-btn>
      <div>
        <v-menu
        :model="menu"
        :close-on-content-click="false"
        :nudge-width="250"
        offset-y
        >
          <template v-slot:activator="{on}">
            <v-avatar size="40">

              <v-img v-on="on"
              :src="require('../../assets/img/avatar.png')"
              >

              </v-img>
            </v-avatar>

          </template>
          <v-card>
            <v-list>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                         :src="require('../../assets/img/avatar.png')"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    Kullanıcı Adı
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
                  <v-list-item-action>
                    <v-icon
                    large >
                      mdi-exit-to-app
                    </v-icon>

                  </v-list-item-action>
                  <v-list-item-title @click="logout()">
                      Çıkış
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list>
          </v-card>

        </v-menu>
      </div>
    </v-app-bar>
    </div>
</template>

<script>
  export default {
    name: "Header",

    data: () => ({
      menu : false,
      tema : "Açık",
      mini : true,
      changetheme: false,
      drawer: false,
    }),
    methods : {
      logout(){
        this.$store.dispatch("logout");
      }
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