<template>

  <v-row justify="center" align="center">

    <v-col cols="12" sm="10" md="10" lg="9" class="hidden-sm-and-down">

      <v-card style="border-radius:10px;">

        <v-img
          min-height="800"
          src="https://www.wanderherway.com/wp-content/uploads/2021/01/IMG_3248-scaled.jpeg"
          lazy-src="https://www.wanderherway.com/wp-content/uploads/2021/01/IMG_3248-scaled.jpeg"
          style="border-radius:10px;"
        >

          <v-container>
            <v-layout justify-center>

              <v-card min-width="400" width="600"
                      style="border-radius:10px;">

                <v-card-text class="pa-4">

                  <h2 class="mb-5 black--text">
                    Registro de tu negocio
                  </h2>

                  <v-window v-model="helpers.step">

                    <v-window-item :value="1">
                      <v-card-text class="pa-4">

                        <h3 class="black--text mb-4">Indica la información general de tu negocio</h3>

                        <v-form ref="formDatosNegocio">

                          <v-text-field
                            label="Nombre del negocio"
                            color="black"
                            autocomplete="new-password"
                            outlined
                            dense
                            v-model="negocio.nombre"
                            :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
                            prepend-icon="fa fa-city"
                          />

                          <v-text-field
                            label="Teléfono del negocio"
                            color="black"
                            autocomplete="new-password"
                            outlined
                            dense
                            type="number"
                            prefix="(+502)"
                            v-model="negocio.telefono"
                            :rules="[ v => !!v || 'El teléfono es obligatorio' ]"
                            prepend-icon="fa fa-phone"
                          />

                          <v-textarea
                            outlined
                            dense
                            no-resize
                            clearable
                            clear-icon="fa fa-times-circle"
                            v-model="negocio.direccion"
                            :rules="[ v => v && v.length > 0 || 'La dirección es obligatoria' ]"
                            rows="3"
                            label="Dirección del negocio"
                            prepend-icon="fa fa-map-marker-alt"
                            color="black"
                          />

                          <v-textarea
                            outlined
                            dense
                            no-resize
                            clearable
                            clear-icon="fa fa-times-circle"
                            v-model="negocio.descripcion"
                            :rules="[ v => v && v.length > 0 || 'La descripción es obligatoria' ]"
                            rows="3"
                            label="Descripción del negocio"
                            prepend-icon="fa fa-edit"
                            color="black"
                          />

                          <v-divider class="mb-4"/>

                          <div>
                            <h3 class="black--text mb-4">Selecciona el horario en el que operas</h3>
                            <v-row
                              justify="space-around"
                              align="center"
                            >
                              <v-col>
                                <h3 class="black--text mb-2">Hora que abres</h3>
                                <v-time-picker
                                  v-model="negocio.abre"
                                  landscape
                                  color="secondary"
                                />
                              </v-col>
                              <v-col>
                                <h3 class="black--text mb-2">Hora que cierras</h3>
                                <v-time-picker
                                  v-model="negocio.cierra"
                                  landscape
                                  color="secondary"
                                />
                              </v-col>
                            </v-row>
                          </div>

                        </v-form>

                        <v-divider class="my-6"/>

                        <h3 class="black--text my-4">Selecciona la ubicación de tu negocio</h3>
                        <v-row class="mt-4">
                          <v-col cols="1">
                            <v-icon class="mt-n3">
                              fa fa-search
                            </v-icon>
                          </v-col>
                          <v-col cols="11" class="ml-n3 mt-n3">
                            <gmap-autocomplete
                              style="width: 70%; border:1px solid grey;
                              font-size: 16px; border-radius:3px;"
                              class="w-50 pa-2"
                              :select-first-on-enter="true"
                              @place_changed="setPlace"
                              :options="{
                                fields: ['geometry', 'formatted_address', 'address_components'],

                              }"
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
                          style="width: 100vmin; height: 40vmin"
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
                        <v-btn @click="geolocate" small class="mt-2 pa-4" color="secondary"

                        >
                          <v-icon left>
                            fa fa-map-marker-alt
                          </v-icon>
                          Ubicación actual
                        </v-btn>

                      </v-card-text>
                    </v-window-item>

                    <v-window-item :value="2">

                      <v-card-text class="pa-4">

                        <v-item-group mandatory v-model="negocio.categoria">
                          <v-container>
                            <v-row>
                              <v-col
                                v-for="categoria in categorias"
                                :key="categoria.valor"
                                cols="12"
                              >
                                <v-item v-slot="{ active, toggle }">
                                  <v-card
                                    :outlined="active"
                                    class="d-flex align-center"
                                    height="120"
                                    @click="toggle"
                                    elevation="1"
                                    style="border-radius:10px;"
                                    :color="active ? 'grey lighten-2' : ''"
                                  >
                                    <v-scroll-y-transition>

                                      <v-list-item>
                                        <v-list-item-content>
                                          <v-list-item-title class="text-h6 mb-1">
                                            {{ categoria.titulo }}
                                          </v-list-item-title>
                                        </v-list-item-content>

                                        <v-list-item-avatar
                                          tile
                                          size="80"
                                        >

                                          <v-img :src="categoria.imagen"
                                                 :lazy-src="categoria.imagen"
                                                 style="border-radius:10px;"
                                          />

                                        </v-list-item-avatar>

                                      </v-list-item>
                                    </v-scroll-y-transition>
                                  </v-card>
                                </v-item>
                              </v-col>
                              <v-col cols="12">

                                <v-form ref="formaTags">

                                  <v-combobox
                                    v-model="tags"
                                    :filter="filter"
                                    :hide-no-data="!helpers.busqueda"
                                    :items="lista_tags"
                                    :search-input.sync="helpers.busqueda"
                                    hide-selected
                                    label="Selecciona lo que describe mejor tu negocio"
                                    :rules="[ v => v && v.length > 0 || 'Debes seleccionar al menos un tag' ]"
                                    multiple
                                    small-chips
                                    solo
                                    color="black"
                                    style="border-radius:10px;"
                                  >
                                    <template v-slot:no-data>
                                      <v-list-item>
                                        <span class="subheading mr-2">Crear el tag </span>
                                        <v-chip
                                          :color="`${helpers.colores[helpers.nonce - 1]} lighten-3`"
                                          label
                                          small
                                        >
                                          {{ helpers.busqueda }}
                                        </v-chip>
                                      </v-list-item>
                                    </template>
                                    <template v-slot:selection="{ attrs, item, parent, selected }">
                                      <v-chip
                                        v-if="item === Object(item)"
                                        v-bind="attrs"
                                        :color="`${item.color} lighten-3`"
                                        :input-value="selected"
                                        label
                                        small
                                      >
                                        <span class="pr-2">
                                          {{ item.text }}
                                        </span>
                                        <v-icon
                                          small
                                          @click="parent.selectItem(item)"
                                        >
                                          $delete
                                        </v-icon>
                                      </v-chip>
                                    </template>
                                    <template v-slot:item="{ index, item }">
                                      <v-chip
                                        :color="`${item.color} lighten-3`"
                                        dark
                                        label
                                        small
                                      >
                                        {{ item.text }}
                                      </v-chip>
                                    </template>
                                  </v-combobox>

                                </v-form>

                              </v-col>
                            </v-row>
                          </v-container>
                        </v-item-group>

                      </v-card-text>

                    </v-window-item>

                  </v-window>

                </v-card-text>

                <v-divider/>

                <v-card-actions>
                  <v-btn
                    :disabled="helpers.step === 1"
                    text
                    @click="helpers.step--"
                  >
                    Atrás
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    depressed
                    @click="VerificarForma"
                    v-if="helpers.step < 2"
                  >
                    <div style="color: rgba(0,0,0,0.8);">
                      Siguiente
                    </div>
                  </v-btn>
                  <v-btn
                    color="primary"
                    depressed
                    @click="RegistrarNegocio"
                    v-else
                  >
                    <div style="color: rgba(0,0,0,0.8);">
                      Registrarse
                    </div>
                  </v-btn>
                </v-card-actions>

              </v-card>

            </v-layout>
          </v-container>

        </v-img>

      </v-card>

    </v-col>

    <v-col cols="12" class="hidden-md-and-up">

      <div class="pa-4">

        <h2 class="black--text font-weight-bold">
          Atrevete a ser parte de algo grande
        </h2>
        <h5>
          Dale la oportunidad a tu negocio de despegar de la mejor manera
        </h5>

      </div>

      <v-card >

        <v-card-text class="pa-4">

          <h2 class="mb-5 black--text">
            Registro de tu negocio
          </h2>


        </v-card-text>

      </v-card>
    </v-col>

  </v-row>

</template>

<script>

export default {

  mounted() {
    //this.geolocate()
  },

  head(){
    return{
      titleTemplate: "Registra tu negocio | Súmate a Antigua Travel"
    };
  },


  layout: 'empty',

  data(){
    return{
      helpers: {
        step: 1,
        colores: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        nonce: 1,
        mapSearch: null,
        busqueda: null,
      },
      markers: [],
      places: [],
      currentPlace: null,
      lista_tags: [
        { header: 'Selecciona o crea un tag' },
        {
          text: 'Comida italiana',
          color: 'green',
        },
        {
          text: 'Comida rápida',
          color: 'orange',
        },
        {
          text: 'Comida argentina',
          color: 'blue',
        },
        {
          text: 'Comida típica',
          color: 'red',
        },
        {
          text: 'Autos deportivos',
          color: 'indigo',
        },
        {
          text: 'Sedan',
          color: 'green',
        },
        {
          text: 'Hatchbacks',
          color: 'teal',
        },
        {
          text: 'SUV',
          color: 'cyan',
        },
        {
          text: 'Al aire libre',
          color: 'blue',
        },
        {
          text: 'Montaña',
          color: 'green',
        },
        {
          text: 'Entretenimiento',
          color: 'orange',
        },
      ],
      categorias: [
        { titulo: 'Hotel', valor: 'H',
          imagen: 'https://exp.cdn-hotels.com/hotels/21000000/20040000/20038200/20038172/e65bae19_z.jpg?impolicy=fcrop&w=500&h=333&q=medium' },
        { titulo: 'Restaurante', valor: 'N',
          imagen: 'https://media-cdn.tripadvisor.com/media/photo-s/19/49/3d/2a/restaurante-el-arco.jpg' },
        { titulo: 'Alquiler de Autos', valor: 'A',
          imagen: 'https://www.motoryracing.com/images/noticias/24000/24823/3.jpg' },
        { titulo: 'Destino Turístico', valor: 'D',
          imagen: 'https://laantigua.files.wordpress.com/2019/03/foto-40sfdogstar-cerro-de-la-cruz.jpg' },
      ],
      negocio: { },
      tags: [],
      marker: { position: { lat: 14.55706946331603, lng: -90.73366553217345 } },
      center: { lat: 14.55706946331603, lng: -90.73366553217345 },
      mapOptions: {
        disableDefaultUI: true,
      },
    }
  },

  watch: {
    tags (val, prev) {

      if (val.length === prev.length) return

      this.tags = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.helpers.colores[this.helpers.nonce - 1],
          }

          this.lista_tags.push(v)

          this.helpers.nonce++

          this.$forceUpdate()
        }

        return v
      })
    },
  },

  methods: {

    VerificarForma(){
      if(this.helpers.step === 1 && this.$refs.formDatosNegocio.validate()){
        this.helpers.step++
      }
    },

    async RegistrarNegocio(){
      if(this.helpers.step === 2 && this.$refs.formaTags.validate()){

        let tags_negocio = []

        this.tags.forEach( tag => {
          tags_negocio.push(tag.text)
        } )

        let params = {
          nombre: this.negocio.nombre,
          telefono: this.negocio.telefono,
          direccion: this.negocio.direccion,
          categoria: this.categorias[this.negocio.categoria].valor,
          tags: tags_negocio,
          abre: this.negocio.abre,
          cierra: this.negocio.cierra,
          coordenadas: {
            latitud: this.marker.position.lat,
            longitud: this.marker.position.lng
          },
          usuarioId: JSON.parse(sessionStorage.getItem('usuario')).id
        }

        await this.$api.post("/negocio", params).then( data => {
          this.$alert.registro_exitoso()
          this.$router.push({ path: '/' })
        } ).catch(data => {
          this.$alert.error('Ocurrió un error en el registro, vuelve a intentarlo', 'Error Interno')
        })


      }
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

    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
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
