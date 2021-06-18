<template>
  <v-container
      fill-height fluid
      style="height: 50vh"
  >

    <v-row align="center"
           justify="center">
      <v-col>
        <v-card
            elevation="1"
            class="mx-auto"
            max-width="500"
        >
          <v-row>
            <v-col>
              <h1 class="text-center">Ders Sona Erdi.</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn
                  @click="$router.push({ path: '/' })"
              >Anasayfa</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "OnlineLessonEnd"
}
</script>

<style scoped>

</style>