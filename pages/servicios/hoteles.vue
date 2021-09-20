<template>

  <v-container fluid>

    <v-layout align-start>

      <v-card elevation="0" outlined >

        <v-card-text>

          <v-row class="mt-2">
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

      </v-card>

    </v-layout>

  </v-container>

</template>

<script>

  export default {

    data(){
      return{

        helpers: {
          nonce: 1,
          mapSearch: null,
          busqueda: null,
        },
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
