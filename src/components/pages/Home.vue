<template>

  <v-main>
      <v-row>
        <v-col sm="8" md="4" lg="3" xl="2" v-for="item in dersler" :key="(item.isim)">
          <v-card to="">

            <v-img
                :src="require('../../assets/img/day69-dotted-notebook.svg')"
            >

            </v-img>

            <v-card-subtitle>
              {{ item.isim }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
  </v-main>


</template>

<script>

export default {
name: "Home",
  data: () =>({
    dersler:[
      {isim: "Algoritmalar"},
      {isim: "Algoritmalar"},
      {isim: "Algoritmalar"},
      {isim: "Algoritmalar"},
      {isim: "Algoritmalar"},
      {isim: "Algoritmalar"},
      {isim: "Algoritmalar"},
      {isim: "Algoritmalar"},
    ]



  }),
  components: { }
}
</script>

<style scoped>

</style>