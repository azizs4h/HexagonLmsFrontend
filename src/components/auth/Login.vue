<template>
  <v-container style="height: 100vh" class="fill-height container--fluid">
    <v-card
        class="mx-auto my-auto px-5 pa-sm-12 elevation-10"
    >
    <v-form
        v-model="valid"
        ref="form"
        lazy-validation
    >
        <v-row>
          <v-col>
            <v-img
                class="mx-auto"
                max-height="250"
                max-width="250"
                :elevation="20"
                :src="require('../../assets/img/logo1.png')"
            >

            </v-img>

          </v-col>
        </v-row>
        <v-row>
            <v-text-field
                v-model="mail"
                label="Kullanıcı Adı"
                :rules="isimRules"
            ></v-text-field>
          </v-row>
        <v-row>
            <v-text-field
                class=""
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="password"
                label="Parola"
                :rules="parolaRules"
                @click:append="show1 = !show1"
            ></v-text-field>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
                class="white--text float-right"
                @click="login"
                :elevation="5"
                color="blue darken-1"
                :class="{'disable' : form.invalid}"
            >
            GİRİŞ
            </v-btn>
          </v-col>

        </v-row>
    </v-form>

    </v-card>
  </v-container>

</template>

<script>


export default {
  name: "Login",
  data: () =>({
    valid: false,
    show1: false,
    mail : '',
    password: '',
    isimRules: [
      v => !!v || 'Kullanıcı adı gereklidir.',
    ],
    parolaRules:[
        v => (v && v.length <=10) || 'Parola 8 ila 10 karakter arasında olmalıdır.'
    ]
  }),

  methods:{
    login(){
      this.$http.post("token/",{username: this.mail, email: '', password: this.password})
          .then((response) => {
            console.log(response.status)
            if(response.status==200)
                this.$router.push("/anasayfa")
      })
          .catch(error => {
        //console.error("kanka burası hata kısmı ama badelicem az kaldı"+error);
            this.error = error;
      })
    },
  }
}
</script>

<style scoped>

</style>