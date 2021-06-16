<template>
  <v-container v-if="lesson != null">

    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h4 class="font-weight-bold display-2">
          {{ lesson.lesson.name }}
        </h4>
        <hr>
        <br>
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
        <online-lesson :id=lesson.lesson.id></online-lesson>
        <notes :id=lesson.lesson.id></notes>
        <lesson-info :id=lesson.lesson.id ></lesson-info>
        <lesson-records></lesson-records>
      </v-tabs-items>

    </v-card>
  </v-container>
</template>

<script>
import OnlineLesson from "@/components/pages/Lesson/OnlineLesson";
import Notes from "@/components/pages/Lesson/Notes";
import LessonInfo from "@/components/pages/Lesson/LessonInfo";
import LessonRecords from "@/components/pages/Lesson/LessonRecords";
import axios from "axios";
import {headers} from "@/utils";
export default {
  components: { LessonRecords, LessonInfo, Notes, OnlineLesson },
  props: ['id'],
  data() {
    return {
      tab: null,
      items: [
        'Canlı Ders', 'Notlar & Duyurular', 'Ders Bilgileri', 'Ders Kayıtları'
      ],
      lesson_id: this.$route.params.id,
      lesson: null
    }
  },
  methods:{

  },
  mounted() {
    this.url = this.$store.getters.url + '/lessons/info/' + this.lesson_id;
    axios.get(this.url, {headers})
        .then((res) => {
          this.lesson = res.data;
        })
        .catch((error) => {
          console.error(error)
        })
  }
}
</script>

<style scoped>
</style>
