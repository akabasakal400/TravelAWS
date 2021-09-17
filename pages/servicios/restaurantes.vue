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

      <v-col
        cols="12" lg="9">

        <v-row>

          <v-col cols="12"
                 lg="4"
                 md="4"
                 sm="6"
                 v-for="(restaurante, i) in restaurantes"
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

                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
              </v-card-text>

              <v-card-actions>

                <v-spacer />

                <v-btn
                  icon
                  @click="restaurante.showCardTags = !restaurante.showCardTags"
                >
                  <v-icon>{{ restaurante.showCardTags ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="restaurante.showCardTags">
                  <v-divider></v-divider>

                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more than he could deliver.
                    You won't have time for sleeping, soldier, not with all the bed making you'll be doing.
                    Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk!
                    You're going to do his laundry? I've got to find a way to escape.
                  </v-card-text>
                </div>
              </v-expand-transition>

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
      restaurantes: [
        {
          nombre: 'Pollo Campero',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNm4K7Ta_s_JJPBffRH-ohoO229q-8f_opVw&usqp=CAU',
          showCardTags: false,
          tags: ['Comida rápida', 'Pollo Frito', 'Hamburguesas']
        },
        {
          nombre: 'La Bruja',
          src: 'https://media-cdn.tripadvisor.com/media/photo-o/1c/3a/d3/e8/nuevo-logo.jpg',
          showCardTags: false,
          tags: ['Comida Vegetariana']
        },
        {
          nombre: "Hector's Bistro",
          src: 'https://media-cdn.tripadvisor.com/media/photo-s/1d/1e/39/b0/hector-s-new-logo.jpg',
          showCardTags: false,
          tags: ['Crepas']
        },
        {
          nombre: 'THAI-WOW',
          src: 'https://media-cdn.tripadvisor.com/media/photo-s/1a/04/95/16/logo-for-thai-wow-restaurant.jpg',
          showCardTags: false,
          tags: ['Comida China']
        },
        {
          nombre: "Randy's",
          src: 'https://media-cdn.tripadvisor.com/media/photo-p/12/b1/04/98/logo.jpg',
          showCardTags: false,
          tags: ['Comida rápida']
        }
      ],
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
