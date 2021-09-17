import Vue from 'vue';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB-FoMfaq00VyuS7uSWR3af7Rmw2r_1CY8",
    libraries: ['places']
    //key: "AIzaSyA0h19cC_S1pBKYMS0VRSzjo3gNOx-4Onk",
  },
  installComponents: true,
});
