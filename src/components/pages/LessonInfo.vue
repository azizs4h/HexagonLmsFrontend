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
              elevation="5"
              class="px-10"
          >
            <br>
            <v-card-title>DERS BİLGİLERİ</v-card-title>
            <v-card-text>
              <ul>
                <h3>  Ders Kredisi : {{lesson.item.lesson_credit}}</h3><br>
                <h3>  Ders Adı :  {{lesson.item.name}}</h3><br>
                <h3>  Ders Kodu: {{lesson.item.lesson_code}}</h3><br>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
            class="mx-5 my-5"
        >
          <v-card
          outlined
          elevation="5"
          class="px-10"
          >
            <br>
            <v-card-title>DERS OKUTMANI</v-card-title>
            <v-img
                width="120px"
                height="120px"
                class="float-right"
                :src="require('@/assets/img/avatar.png')">
            </v-img>
            <v-card-text>
              <ul>
                <h3>Adı :</h3><br>
                <h3>SOYADI :</h3><br>
                <h3>E-Posta :</h3><br>
              </ul>

            </v-card-text>
          </v-card>

        </v-col>



      </v-row>

    </v-container>
  </v-tab-item>
</template>

<script>
export default {
  props: ['lesson'],
  name: "LessonInfo"
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