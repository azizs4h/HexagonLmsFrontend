<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h4 class="font-weight-bold display-2">
          {{ lesson.item.name }}
        </h4>
      </v-card-title>

      <v-tabs
          v-model="tab"
          background-color="transparent"
          grow
          color="blue darken-1"
      >
        <v-tab
            v-for="(item, key) in items"
            :key="key"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
  <hr>
      <v-tabs-items v-model="tab">
        <online-lesson></online-lesson>
        <notes :id=lesson.item.id></notes>
        <lesson-info :lesson=lesson ></lesson-info>
        <lesson-records></lesson-records>
      </v-tabs-items>

    </v-card>
  </v-container>
</template>

<script>
import OnlineLesson from "@/components/pages/OnlineLesson";
import Notes from "@/components/pages/Notes";
import LessonInfo from "@/components/pages/LessonInfo";
import LessonRecords from "@/components/pages/LessonRecords";
export default {
  components: {LessonRecords, LessonInfo, Notes, OnlineLesson},

  data() {
    return {
      tab: null,
      items: [
        'Canlı Ders', 'Notlar & Duyurular', 'Ders Bilgileri', 'Ders Kayıtları'
      ],
      lesson: this.$route.params,
    }
  },
}
</script>

<style scoped>
</style>
