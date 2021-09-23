<template>

  <v-container fluid>
    {{icono}}
    <v-btn color="accent" large @click.stop="iconDialog=true" >
      Click
    </v-btn>
    <IconPicker v-model="iconDialog" :icono.sync="icono" />

  </v-container>

</template>

<script>

import IconPicker from "~/components/IconPicker"

export default {

  components: {IconPicker},

  layout: 'admin_negocio',

  head(){
    return{
      titleTemplate: "Antigua Travel | Inicio"
    };
  },


  data(){
    return{
      iconDialog: false,
      icono: ''
    }
  },

  methods: {
  }

}

</script>