<template>

  <v-container fluid class="pa-10">

    <v-row justify="center" align="center" class="mt-5">

      <v-col cols="12" sm="10" md="10" lg="8">

        <v-card style="border-radius:10px;">

          <v-img
            height="250"
            src="https://www.teahub.io/photos/full/161-1616360_santa-catalina-arch-antigua-agua-volcano-guatemala-santa.jpg"
            style="border-radius:10px;"
          >

            <v-container fill-height>
              <v-layout justify-center align-center>
                <v-autocomplete
                  outlined
                  rounded
                  dense
                  hide-details
                  placeholder="¿Qué deseas saber?"
                  prepend-inner-icon="fa fa-search"
                  style="max-width: 700px"
                  color="black"
                  class="elevation-5"
                  v-model="tags.seleccionadas"
                  :items="tags.lista"
                  item-value="tag"
                  item-text="tag"
                  clearable
                  clear-icon="fa fa-times-circle"
                  background-color="white"
                  item-color="black"
                  chips
                  small-chips
                  multiple
                  no-data-text="No hay datos relacionados a la busqueda o negocios registrados"
                >

                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      small
                      @click="data.select"
                      @click:close="RemoverTag(data.item.tag)"
                    >
                      {{ data.item.tag }}
                    </v-chip>
                  </template>

                </v-autocomplete>
              </v-layout>
            </v-container>

          </v-img>

        </v-card>

      </v-col>

    </v-row>

    <v-row class="mt-5">

      <v-col cols="12" sm="10" md="8">

        <h2 class="mb-5 black--text">
          Descubre los mejores destinos turísticos
        </h2>

      </v-col>

    </v-row>

    <v-row class="mt-5 hidden-md-and-down">

      <v-col
        v-for="n in 4"
        :key="n"
        class="d-flex child-flex"
        cols="3"
      >

        <v-card
          class="mx-2"
          max-width="420"
          elevation="0"
        >
          <v-img
            :src="`https://picsum.photos/500/300?image=${n + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n + 10}`"
            height="400"
            class="grey lighten-2"
            style="border-radius:10px;"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-layout justify-start>
            <v-card-title>
              Top western road trips
            </v-card-title>
          </v-layout>

        </v-card>

      </v-col>

    </v-row>

    <v-row class="mt-5 hidden-lg-and-up">

      <v-slide-group
        v-model="model"
        center-active
        show-arrows
      >
        <v-slide-item
          v-for="n in 4"
          :key="n"
          v-slot="{ active, toggle }"
        >

          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            height="400"
            width="250"
            class="grey lighten-2 mx-2"
            style="border-radius:10px;"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

        </v-slide-item>
      </v-slide-group>

    </v-row>

    <v-row justify="center" align="center" class="mt-5">

      <v-col cols="12">

        <v-card style="border-radius:10px;" height="500">

          <v-img
            height="500"
            src="https://martsam.com/wp-content/uploads/2020/06/bannerant.jpg"
            style="border-radius:10px;"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          >

            <v-container fill-height>
              <v-layout justify-start align-center>
                <v-row>
                  <v-col cols="12">
                    <h1 class="white--text">
                      Atrevete a ser parte de algo grande
                    </h1>
                  </v-col>
                  <v-col cols="12">
                    <h3 class="white--text mt-n4">
                      Dale la oportunidad a tu negocio de despegar de la mejor manera
                    </h3>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      color="white"
                      dark
                      depressed
                      @click="IrRegistro"
                    >
                      <div class="black--text font-weight-bold">
                        Obtener Información
                      </div>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-layout>
            </v-container>

          </v-img>

        </v-card>

      </v-col>

    </v-row>

    <v-row class="mt-5">

      <v-col cols="12" sm="10" md="8">

        <h2 class="mb-5 black--text">
          Encuentra hoteles que se acomoden a tu gusto
        </h2>

      </v-col>

    </v-row>

    <v-row class="mt-5 hidden-md-and-down">

      <v-col cols="12"
             lg="4"
             md="3"
             sm="6"
             v-for="(hotel, i) in negocios.listado.hoteles"
             :key="i"
             v-if="i < 4"
      >

        <v-card
          style="border-radius:10px;"
          class="mx-auto my-4"
          max-width="400"
          min-width="400"
          elevation="0"
          outlined
        >
          <v-img
            height="200"
            :src="`https://picsum.photos/500/300?image=${i + 10}`"
          />

          <v-card-title>
            <h4>
              {{ hotel.nombre }}
            </h4>
            <v-spacer/>
            <h6>
              <span :class="VerificarHora(hotel.abre, hotel.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(hotel.abre, hotel.cierra) }}
              </span> -
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                    <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                    Horarios
                  </v-chip>
                </template>
                <span> Todos los días de {{ $moment(hotel.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(hotel.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
              </v-tooltip>

            </h6>
          </v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="4.5"
                color="secondary"
                dense
                half-increments
                hover
              />

              <div class="grey--text ms-4">
                4.5 (413 valoraciones)
              </div>
            </v-row>

            <div class="mt-5">
              <v-icon color="black" class="mr-1">
                fa fa-map-marker-alt
              </v-icon>
              Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(hotel.lng, hotel.lat) }} km
            </span> de ti
            </div>

            <div class="mt-2">
              {{ hotel.descripcion }}
            </div>
          </v-card-text>

          <v-divider class="my-4"/>

          <v-card-actions>

            <v-btn
              color="black"
              outlined
              @click=""
            >
              <v-icon left color="secondary">
                fa fa-compass
              </v-icon>
              Explorar
            </v-btn>

          </v-card-actions>

        </v-card>

      </v-col>

    </v-row>

    <v-row class="mt-5">

      <v-col cols="12" sm="10" md="8">

        <h2 class="mb-5 black--text">
          Restaurantes que tal vez te gusten
        </h2>

      </v-col>

    </v-row>

    <v-row class="mt-5 hidden-md-and-down">

      <v-col cols="12"
             lg="4"
             md="3"
             sm="6"
             v-for="(retaurante, i) in negocios.listado.restaurantes"
             :key="i"
             v-if="i < 4"
      >

        <v-card
          style="border-radius:10px;"
          class="mx-auto my-4"
          max-width="400"
          min-width="400"
          elevation="0"
          outlined
        >
          <v-img
            height="200"
            :src="`https://picsum.photos/500/300?image=${i + 10}`"
          />

          <v-card-title>
            <h4>
              {{ retaurante.nombre }}
            </h4>
            <v-spacer/>
            <h6>
              <span :class="VerificarHora(retaurante.abre, retaurante.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(retaurante.abre, retaurante.cierra) }}
              </span> -
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                    <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                    Horarios
                  </v-chip>
                </template>
                <span> Todos los días de {{ $moment(retaurante.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(retaurante.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
              </v-tooltip>

            </h6>
          </v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="4.5"
                color="secondary"
                dense
                half-increments
                hover
              />

              <div class="grey--text ms-4">
                4.5 (413 valoraciones)
              </div>
            </v-row>

            <div class="mt-5">
              <v-icon color="black" class="mr-1">
                fa fa-map-marker-alt
              </v-icon>
              Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(retaurante.lng, retaurante.lat) }} km
            </span> de ti
            </div>

            <div class="mt-2">
              {{ retaurante.descripcion }}
            </div>
          </v-card-text>

          <v-divider class="my-4"/>

          <v-card-actions>

            <v-btn
              color="black"
              outlined
              @click=""
            >
              <v-icon left color="secondary">
                fa fa-compass
              </v-icon>
              Explorar
            </v-btn>

          </v-card-actions>

        </v-card>

      </v-col>

    </v-row>

    <v-row class="mt-5 hidden-lg-and-up">

      <v-slide-group
        center-active
        show-arrows
      >
        <v-slide-item
          v-for="n in 4"
          :key="n"
        >

          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            height="400"
            width="250"
            class="grey lighten-2 mx-2"
            style="border-radius:10px;"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

        </v-slide-item>
      </v-slide-group>

    </v-row>

  </v-container>

</template>

<script>


export default {

  mounted(){
    this.loading_card = true
    this.geolocate()
    this.ObtenerTags()
    this.ObtenerNegocios()
  },

  data(){
    return {
      model: null,
      tabs: null,
      text: "Hola",
      loading_card: false,
      coords: { lat: 0, lng: 0 },
      tags: {
        lista: [],
        seleccionadas: []
      },
      negocios: {
        listado: []
      },
      busqueda: null,
      botones: {
        seleccionado: null
      }
    }
  },

  methods: {

    async ObtenerTags(){
      this.tags.lista = await this.$api.get('/tags', {})
    },

    async ObtenerNegocios(){
      await this.$api.get('/negocios', {}).then(data=>{
        this.loading_card = false
        this.negocios.listado = data
      })
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coords.lat = position.coords.latitude
        this.coords.lng = position.coords.longitude
      });
    },

    CalcularDistancia(lng, lat){

      lng = parseFloat(lng)
      lat = parseFloat(lat)

      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat-this.coords.lat);  // deg2rad below
      var dLon = this.deg2rad(lng-this.coords.lng);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(this.coords.lat)) * Math.cos(this.deg2rad(lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
       // Distance in km
      return (R * c).toFixed(0);

    },

    deg2rad(deg) {
      return deg * (Math.PI/180)
    },

    VerificarHora(abre, cierra){

      var format = 'hh:mm:ss'
      var time = this.$moment(this.$moment().toDate().getTime(),format),
        beforeTime = this.$moment(abre, format),
        afterTime = this.$moment(cierra, format);

      if (time.isBetween(beforeTime, afterTime)) {

        return "Abierto"

      } else {

        return "Cerrado"

      }

    },

    RemoverTag (item) {
      const index = this.tags.seleccionadas.indexOf(item)
      if (index >= 0) this.tags.seleccionadas.splice(index, 1)
    },

    IrRegistro(){
      this.$router.push({ path: '/negocios/registro' })
    }

  }

}

</script>
