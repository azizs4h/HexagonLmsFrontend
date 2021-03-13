<template>

  <v-container style="height: 96vh" class="fill-height container--fluid back">
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
                required
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
                @keypress.enter="login"
                required
            ></v-text-field>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
                class="white--text float-right"
                @click="login"
                :elevation="5"
                color="blue darken-1"
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
    valid: true,
    show1: false,
    mail : '',
    password: '',
    isimRules: [
      v => !!v || 'Kullanıcı adı gereklidir.',
    ],
    parolaRules:[
        v => (v && v.length <=10 && v.length >=8) || 'Parola 8 ila 10 karakter arasında olmalıdır.'
    ]
  }),

  methods:{
    login(){
      if(this.$refs.form.validate()){

        this.$store.dispatch("login",{mail: this.mail, password: this.password})
        .then(response => {
          this.$router.push("/");
        })

      }
    },
  },

}
</script>

<style scoped>
</style>