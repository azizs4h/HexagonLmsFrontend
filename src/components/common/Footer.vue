<template>

  <v-card height="150">
    <v-footer
        absolute
        class="font-weight-medium"
        height="150"
    >
      <v-col
          class="text-center"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Ömer Aziz ŞAHİN</strong> <br>
        <a href="https://github.com/azizs4h">GitHub</a>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>