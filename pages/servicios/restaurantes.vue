<template>

  <v-container fluid>


    <v-row dense>

      <v-col cols="12" lg="3" class="mt-12" >

        <v-card style="border-radius:10px;"
                max-width="400"
                min-width="400"
                class="mx-auto"
                elevation="0"
                outlined
        >

          <v-card-text>

            <div class="hidden-md-and-up">

              <h3 class="mb-2">
                Busqueda por Tags
              </h3>

              <v-row justify="start" align="start" class="ml-n5">

                <v-col
                  cols="12"
                  lg="12"
                  sm="10"
                  md="8"
                >

                  <v-chip-group multiple>
                    <v-chip
                      filter
                      outlined
                    >
                      <v-icon class="mr-1">fa fa-tag</v-icon>
                      Comida Rápida
                    </v-chip>
                    <v-chip
                      filter
                      outlined
                    >
                      <v-icon class="mr-1">fa fa-tag</v-icon>
                      Comida Italiana
                    </v-chip>
                    <v-chip
                      filter
                      outlined
                    >
                      <v-icon class="mr-1">fa fa-tag</v-icon>
                      Comida Vegetariana
                    </v-chip>
                  </v-chip-group>

                </v-col>

              </v-row>


            </div>

            <div class="hidden-sm-and-down">

              <h3 class="mb-2 black--text">
                Busqueda por Tags
              </h3>

              <v-chip-group multiple column color="secondary">
                <v-chip
                  filter
                  outlined
                >
                  <v-icon class="mr-1">fa fa-tag</v-icon>
                  Comida Rápida
                </v-chip>
                <v-chip
                  filter
                  outlined
                >
                  <v-icon class="mr-1">fa fa-tag</v-icon>
                  Comida Italiana
                </v-chip>
                <v-chip
                  filter
                  outlined
                >
                  <v-icon class="mr-1">fa fa-tag</v-icon>
                  Comida Vegetariana
                </v-chip>
                <v-chip
                  filter
                  outlined
                >
                  <v-icon class="mr-1">fa fa-tag</v-icon>
                  Pollo Frito
                </v-chip>
                <v-chip
                  filter
                  outlined
                >
                  <v-icon class="mr-1">fa fa-tag</v-icon>
                  Mariscos
                </v-chip>
                <v-chip
                  filter
                  outlined
                >
                  <v-icon class="mr-1">fa fa-tag</v-icon>
                  Crepas
                </v-chip>
              </v-chip-group>

            </div>

            <v-divider class="my-2" />

            <v-list rounded>
              <h3 class="mb-2 black--text">Filtros</h3>
              <v-list-item-group
                color="secondary"
              >
                <v-list-item
                  v-for="(filtro, i) in filtros"
                  :key="i"
                  class="my-auto"
                >
                  <v-list-item-icon>
                    <v-icon v-text="filtro.icono"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="filtro.texto"></v-list-item-title>
                    <v-range-slider
                      v-model="range"
                      max="1000"
                      min="1"
                      track-color="black"
                      thumb-color="black"
                      track-fill-color="black"
                      v-if="i === 2"
                    />
                    <v-layout justify-center v-if="i===2">

                      <div class="justify-center mt-n4">
                        {{  'Q. '+(range[0].toFixed(2)) }}-
                        {{ 'Q. '+(range[1].toFixed(2)) }}
                      </div>

                    </v-layout>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

          </v-card-text>

        </v-card>

      </v-col>

      <v-col cols="12" lg="9">

        <v-row>

          <v-col cols="6" class="mt-12" v-if="restaurantes.listado && restaurantes.listado.length === 0">
            <v-alert
              border="left"
              colored-border
              type="warning"
              elevation="2"
            >
              Lo sentimos, aún no hay restaurantes disponibles para mostrar.
            </v-alert>
          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 sm="6"
                 v-for="(restaurante, i) in restaurantes.listado"
                 :key="i"
          >

            <v-card
              style="border-radius:10px;"
              class="mx-auto my-12"
              max-width="400"
              min-width="400"
              elevation="0"
              outlined
            >
              <v-img
                height="200"
                :src="restaurante.src"
              ></v-img>

              <v-card-title>
                <h4>
                  {{ restaurante.nombre }}
                </h4>
                <v-spacer/>
                <h6>
                  <span :class="VerificarHora(restaurante.abre, restaurante.cierra) === 'Cerrado' ?
                  'red--text' : 'green--text'">
                    {{ VerificarHora(restaurante.abre, restaurante.cierra) }}
                  </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(restaurante.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(restaurante.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
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

                <div class="my-4">
                  <v-icon class="mr-1"> fa fa-tags </v-icon>{{StringTags(restaurante.tags)}}
                </div>

                <div>{{ restaurante.descripcion ? restaurante.descripcion :
                  "Este restaurante no cuenta con una descripción" }}</div>
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

      </v-col>

    </v-row>

    <v-fab-transition style="direction: rtl;">
      <v-btn
        class="hidden-sm-and-down"
        color="black"
        fab
        dark
        absolute
        bottom
        left
        :style="{left: '50%', transform:'translateX(-50%)'}"
        large
        @click="MostrarDialogoMapa"
      >
        <v-icon>fa fa-map-marker-alt</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn
        class="hidden-md-and-up"
        color="black"
        fab
        dark
        small
        absolute
        bottom
        left
        :style="{left: '50%', transform:'translateX(-50%)'}"
        @click="MostrarDialogoMapa"
      >
        <v-icon>fa fa-map-marker-alt</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialogos.mapa"
              transition="dialog-bottom-transition"
              scrollable
              persistent
              max-width="1000px"
    >
      <v-card>

        <v-toolbar elevation="0" dense color="transparent">

          <v-btn icon @click="CerrarDialogoMapa">
            <v-icon>fa fa-times</v-icon>
          </v-btn>

        </v-toolbar>

        <v-card-text class="pa-4">

          <v-row class="mt-2 hidden-sm-and-down">
            <v-col cols="1">
              <v-icon class="mt-n3">
                fa fa-search
              </v-icon>
            </v-col>
            <v-col cols="11" class="ml-n12 mt-n3">
              <gmap-autocomplete
                style="width: 70%; border:1px solid grey;
                              font-size: 16px; border-radius:3px;"
                class="w-50 pa-2"
                :select-first-on-enter="true"
                @place_changed="setPlace"
                :options="{ fields: ['geometry', 'formatted_address', 'address_components'] }"
              />
            </v-col>
          </v-row>

          <v-row class="mt-2 hidden-md-and-up">
            <v-col cols="1">
              <v-icon class="mt-n3">
                fa fa-search
              </v-icon>
            </v-col>
            <v-col cols="11" class="ml-n2 mt-n3">
              <gmap-autocomplete
                style="width: 70%; border:1px solid grey;
                              font-size: 16px; border-radius:3px;"
                class="w-50 pa-2"
                :select-first-on-enter="true"
                @place_changed="setPlace"
                :options="{ fields: ['geometry', 'formatted_address', 'address_components'] }"
              />
            </v-col>
          </v-row>

          <br/>

          <GmapMap
            :center="center"
            :zoom="18"
            map-style-id="roadmap"
            :options="mapOptions"
            class="pa-2"
            style="max-width: 100vmin; max-height: 40vmin; min-width: 50vmin; min-height: 40vmin;"
            ref="mapRef"
            @click="handleMapClick"
          >
            <GmapMarker
              :position="marker.position"
              :clickable="true"
              :draggable="true"
              @drag="handleMarkerDrag"
              @click="panToMarker"
            />
          </GmapMap>

        </v-card-text>

        <v-layout justify-center>
          <v-card-actions>
            <v-btn
              color="primary"
              depressed
              @click=""
            >
              <div style="color: rgba(0,0,0,0.8);">
                Seleccionar
              </div>
            </v-btn>
          </v-card-actions>
        </v-layout>

      </v-card>
    </v-dialog>

  </v-container>

</template>

<script>

export default {

  mounted() {
    this.ObtenerRestaurantes()
  },

  data(){
    return{
      dialogos: {
        mapa: false
      },
      helpers: {
        nonce: 1,
        mapSearch: null,
        busqueda: null
      },
      restaurantes: {
        listado: []
      },
      filtros: [
        { texto: 'Hora Planeada', icono: 'fa fa-clock' },
        { texto: 'Fecha Planeada', icono: 'fa fa-calendar-day' },
        { texto: 'Rango de Precios', icono: 'fa fa-money-bill-wave' },
      ],
      range: [1,1000],
      markers: [],
      places: [],
      currentPlace: null,
      marker: { position: { lat: 14.55706946331603, lng: -90.73366553217345 } },
      center: { lat: 14.55706946331603, lng: -90.73366553217345 },
      mapOptions: {
        disableDefaultUI: true,
      }
    }
  },

  methods: {

    async ObtenerRestaurantes(){

      await this.$api.post("/negocios/categoria", { categoria: "R" }).then( data => {

        this.restaurantes.listado = data
        let cont = 0
        this.restaurantes.listado.forEach( restaurante => {

          restaurante.showCardTags = false
          restaurante.src = "https://picsum.photos/500/300?image="+(cont+35)
          restaurante.tags = ["Comida rápida"]
          cont++

        } )

      } )

    },

    VerificarHora(abre, cierra){

      var format = 'hh:mm:ss'
      var time = this.$moment(this.$moment(),format),
        beforeTime = this.$moment(abre, format),
        afterTime = this.$moment(cierra, format);

      if (time.isBetween(beforeTime, afterTime)) {
        return "Abierto"

      } else {

        return "Cerrado"

      }

    },

    MostrarDialogoMapa(){
      this.dialogos.mapa = true
    },

    CerrarDialogoMapa(){
      this.dialogos.mapa = false
    },

    StringTags(tags){

      let tagg = ""

      let count = 1

      tags.forEach(tag => {

        if(count === tags.length){
          tagg += tag;
        }
        else{
          tagg = tagg + tag + ', '
          count++;
        }

      })

      return tagg

    },

    setPlace(place) {
      this.currentPlace = place;
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.marker.position = marker;
        this.currentPlace = null;
        this.panToMarker()
      }
    },

    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude

        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      try {
        this.$refs.mapRef.setZoom(18);
      }
      catch (e) {

      }
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    }

  }

}

</script>
