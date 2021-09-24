<template>
  <v-app dark style="background: #F5F5F5;">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      dark
      color="secondary"
      width="350"
    >
      <v-list>

        <v-list-item link>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ usuario_autenticado.nombre }}
            </v-list-item-title>
            <v-list-item-subtitle>Administrar negocios</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="(ruta, i) in rutas" :key="i" :to="ruta.to" router exact>
          <v-list-item-action>
            <v-icon color="lightTitle">{{ ruta.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="ruta.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar dark color="secondary" elevation="0"
               :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon large @click.stop="drawer = !drawer" />
      <div class="hidden-sm-and-down">
        <v-toolbar-title v-text="'Antigua Travel'" />
      </div>
      <div class="hidden-md-and-up">
        <v-toolbar-title style="font-size: 16px;" v-text="'Antigua Travel'" />
      </div>
      <v-progress-circular indeterminate v-show="$store.state.loading"
                           class="mx-2" color="white" />
      <v-spacer />

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            icon
            @click="logoutUser"
          >
            <v-icon>fa fa-sign-out-alt</v-icon>
          </v-btn>
        </template>
        <span>Cerrar Sesión</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>

      <nuxt />

    </v-main>

    <v-footer
      color="secondary"
      class="white--text"
      height="30"
      dense
    >
      <v-layout justify-center>
        <span style="font-size: 14px;">
          Copyright &copy; Antigua Travel &mdash;
          {{ new Date().getFullYear() }}
        </span>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  /*head(){
    return{
      titleTemplate: ""
    };
  },*/
  mounted() {

    this.ObtenerAuth()

  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      usuario_autenticado: {},
      rutas: [
        {
          no: 1,
          icon: 'fa fa-home',
          title: 'Dashboard',
          to: '/negocios/dashboard'
        },
        {
          no: 2,
          icon: 'fa fa-briefcase',
          title: 'Listado de Negocios',
          to: '/negocios/listado_negocios'
        },
        {
          no: 3,
          icon: 'fa fa-cubes',
          title: 'Productos y Servicios',
          to: '/negocios/productos_servicios'
        },
      ],
      miniVariant: false,
      badgeConteo: null
    }
  },

  methods: {

    async ObtenerAuth(){

      this.usuario_autenticado = await this.$api.post("/usuario/info",
        { id: JSON.parse(sessionStorage.getItem('usuario')).id })

    },

    async logoutUser(){
      try {
        this.$alert.confirm('¿Está seguro que desea cerrar sesión?',
          'Cerrar Sesión').then(() => {

          sessionStorage.removeItem('usuario')
          this.$router.push({path: '/negocios/login'})

        });
      } catch (e) {
        console.error(e.message)
      }
    }
  },
}
</script>
