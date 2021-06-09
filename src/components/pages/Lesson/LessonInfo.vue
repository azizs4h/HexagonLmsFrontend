<template>
  <v-tab-item
      elevation="5">
    <v-container>
      <v-row>
        <v-col
            class="mx-5 my-5"
        >
          <v-card
              outlined
              elevation="1"
              class="px-10"
              min-height="300px"
          >
            <br>
            <v-card-title>DERS BİLGİLERİ</v-card-title>
            <v-card-text v-if="info !== null">
              <ul>
                <h3>  Ders Kredisi : {{info.lesson.lesson_credit}}</h3><br>
                <h3>  Ders Adı :  {{info.lesson.name}}</h3><br>
                <h3>  Ders Kodu: {{info.lesson.lesson_code}}</h3><br>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
            class="mx-5 my-5"
        >
          <v-card
          outlined
          elevation="1"
          class="px-10"
          min-height="300px"
          >
            <br>
            <v-card-title>DERS OKUTMANI</v-card-title>
            <v-img
                width="120px"
                height="120px"
                class="float-right"
                :src="require('@/assets/img/avatar.png')">
            </v-img>
            <v-card-text v-if="info !== null">
              <ul>
                <h3>Adı : {{info.teacher.name}}</h3><br>
                <h3>SOYADI : {{info.teacher.surname}}</h3><br>
                <h3>E-Posta : {{info.teacher.email}}</h3><br>
              </ul>

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
  name: "LessonInfo",
  data: () => ({
    url : '',
    info : null,
  }),
  mounted(){
    this.url= this.$store.getters.url+'/lessons/info/'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('Access-Token')}`
    }

    axios.get(this.url+this.$props.id,{headers})
        .then((res) => {
          this.info = res.data
          console.log(this.info)
        })
        .catch((error) => {
          console.error(error)
        })

  },
}
</script>