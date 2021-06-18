<template>
  <div>
    <div
        style="height: 90vh;"
    >
      <vue-jitsi-meet
          ref="jitsiRef"
          domain="localhost:8443/"
          :options="jitsiOptions"
      ></vue-jitsi-meet>


    </div>
  </div>
</template>


<script>
import { JitsiMeet } from '@mycure/vue-jitsi-meet';

export default {
  name: "meet-jitsi",
  props: ['name'],
  data() {
    return {
      sayac: 0,
      student: localStorage.getItem('is_student'),
    }
  },
  components: {
    VueJitsiMeet: JitsiMeet
  },
  computed: {
    jitsiOptions () {
      return {
        roomName: this.$route.params.name,
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
          INVITE_ENABLED: false,
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