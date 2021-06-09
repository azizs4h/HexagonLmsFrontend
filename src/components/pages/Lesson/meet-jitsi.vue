<template>
  <div
      style="height: 90vh;"
  >

    {{ $route.params.id}}
    <vue-jitsi-meet
        ref="jitsiRef"
        domain="localhost:8443/"
        :options="jitsiOptions"
    ></vue-jitsi-meet>

    <!--<iframe allow="camera; microphone; fullscreen; display-capture; autoplay" src="https://localhost:8443//deneme" style="height: 100%; width: 100%; border: 0px;"></iframe>
  -->
  </div>
</template>


<script>
import { JitsiMeet } from '@mycure/vue-jitsi-meet';
import {router} from "@/router";

export default {
  name: "meet-jitsi",
  props: ['id'],
  data() {
    return {
      sayac: 0,
    }
  },
  components: {
    VueJitsiMeet: JitsiMeet
  },
  computed: {
    jitsiOptions () {
      return {
        roomName: "de  deneme dersi neme",
        noSSL: false,
        userInfo: {
          email: localStorage.getItem('email'),
          displayName: localStorage.getItem('user_name'),
        },
        configOverwrite: {
          enableNoisyMicDetection: true
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          CLOSE_PAGE_GUEST_HINT: false,
          SHOW_POWERED_BY: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          MOBILE_APP_PROMO: false,
          ENABLE_WELCOME_PAGE:false,
        },
        onload: this.onIFrameLoad,
      };
    },
  },
  methods: {
    onIFrameLoad() {
      this.sayac++;
      this.$refs.jitsiRef.addEventListener('readToClose', this.readyToClose(), false);
    },

    readyToClose() {
      if(this.sayac===2){
        this.$router.push({name: 'end'})
      }
    },
  },
  mounted(){
  }
};
</script>

<style scoped>

</style>