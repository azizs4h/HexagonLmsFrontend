<template>
  <v-container>

    <div id="meet">
      meeting
    </div>
    Tüh bulunamadı


  </v-container>
</template>

<script>

export default {
name: "NotFoundComponent",
  created() {
    var scripts = [
      "https://meet.jit.si/external_api.js",
      "/jitsi/config.jitsi.js",
      "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"
    ];
    scripts.forEach(script => {
      let tag = document.createElement("script");
      tag.setAttribute("src", script);
      document.head.appendChild(tag);
    });
  }
}
</script>

<style scoped>

</style>