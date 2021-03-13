<template>
  <v-tab-item
  >
    <v-container>
      <v-card
          class="my-3 mx-auto card"
          max-width="90%"
          outlined
          to="/"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon
                large >
              mdi-cast-education
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              DERS BAŞLIĞI
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card
          class="my-3 mx-auto card"
          max-width="90%"
          outlined
          to="/"
      >

        <v-list-item>
          <v-list-item-avatar>
            <v-icon
                large >
              mdi-cast-education
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              DERS BAŞLIĞI
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>



      </v-card>
    </v-container>
  </v-tab-item>
</template>

<script>
export default {
  name: "LessonRecords"
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