<template>

  <v-container fluid>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      :width="($vuetify.breakpoint.name === 'sm' ||
      $vuetify.breakpoint.name === 'xs') ? 350 : 500"

    >
      <v-list>

        <v-list-item>
          <v-list-item-content>
            <v-autocomplete
              outlined
              rounded
              dense
              hide-details
              placeholder="Busqueda"
              label="Busqueda"
              prepend-inner-icon="mdi-magnify"
              color="black"
              :items="[]"
              item-value="tag"
              item-text="tag"
              clearable
              clear-icon="fa fa-times-circle"
              background-color="white"
              item-color="black"
              chips
              small-chips
              multiple
              no-data-text="No hay nadie con el nombre especificado"
            />
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item-group v-model="usuarios.seleccionado">
          <v-list-item
            v-for="(usuario, i) in usuarios.listado"
            :key="i"
            :value="usuario"
            exact
            class="ma-2"
            link
          >
            <v-list-item-avatar>
              <v-img :src="usuario.src ? usuario.src : 'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="usuario.title" />
              <v-list-item-subtitle v-text="usuario.last_message" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
      flat
      color="white"
      outlined
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-list-item-group>
      <v-list-item
        v-for="(mensaje, i) in mensajes.listado"
        :key="i"
        exact
        class="ma-2"
        link
      >
        <v-list-item-avatar v-if="mensaje.id === mensajes.ids[0]">
          <v-img :src="'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'" />
        </v-list-item-avatar>
        <v-list-item-content :class="mensaje.id === mensajes.ids[1] ? 'text-right align-self-start' : null"
                             color="white"
        >
          <v-list-item-title v-text="'Fernando Sagastume'" />
          <v-list-item-subtitle v-text="mensaje.mensaje" />
        </v-list-item-content>
        <v-list-item-avatar v-if="mensaje.id === mensajes.ids[1]">
          <v-img :src="'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'" />
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>

  </v-container>

</template>

<script>

import * as Axios from "axios";
import firebase from 'firebase'

export default {
  mounted() {
    const uniqueValues = new Set(this.mensajes.listado.map(v => v.id));
    this.mensajes.ids = [...uniqueValues];
    this.ObtenerMensajes()
  },

  layout: 'chat',

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      usuarios: {
        listado: [
          {
            src: 'https://media.utzulewmall.com/Taco_Bell.jpg',
            title: 'Taco Bell',
            last_message: 'Ya llegará mi pedido?',
            to: '/'
          },
          {
            src: 'https://elmarquesdeantigua.com/wp-content/uploads/2019/11/25158119_386723898444884_4053937254729961438_n-827x675.jpg',
            title: 'Antigua Boreal',
            last_message: 'Claro, su pedido ya está en camino.',
            to: '/inspire'
          },
          {
            src: null,
            title: 'Antigua Boreal',
            last_message: 'Claro, su pedido ya está en camino.',
            to: '/inspire'
          }
        ],
        seleccionado: {}
      },
      mensajes: {
        ids: [],
        listado: [
          { id: 1, mensaje: "Hola, buenas noches quiero saber como va mi pedido" },
          { id: 2, mensaje: "Hola, su pedido ya va en camino" },
          { id: 1, mensaje: "Ok, me quedó entonces a la espera" },
          { id: 2, mensaje: "Entendido, para servirle." },
        ]
      },
      title: 'Vuetify.js'
    }
  },

  methods: {

   async ObtenerMensajes(){

     const messageRef = this.$fire.database.ref("Chats")

     Axios.get(messageRef.toString() + '.json').then(response => {
       console.log(response.data)
     })

     const messageRefUsers = this.$fire.database.ref("Users")

     Axios.get(messageRefUsers.toString() + '.json').then(response => {
       console.log(response.data)
     })

   }

  }

}

</script>
