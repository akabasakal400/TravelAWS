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
                  @keyup.enter.native="BusquedaxTag"
                  @click:clear="LimpiarBusqueda"
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
                <v-btn
                  color="secondary"
                  class="ml-1"
                  dark
                  depressed
                  rounded
                  @click="BusquedaxTag"
                >
                  Buscar
                </v-btn>
              </v-layout>
            </v-container>

          </v-img>

        </v-card>

      </v-col>

    </v-row>

    <div v-if="!tags.buscadas.check">

      <v-row class="mt-5">

        <v-col cols="12" sm="10" md="8">

          <h2 class="mb-5 black--text">
            Descubre los mejores destinos turísticos
          </h2>

        </v-col>

      </v-row>

      <v-row class="mt-5">

        <v-col cols="12"
               lg="4"
               md="6"
               v-for="(sitio, i) in negocios.listado.sitios"
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
                {{ sitio.nombre }}
              </h4>
              <v-spacer/>
              <h6>
              <span :class="VerificarHora(sitio.abre, sitio.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(sitio.abre, sitio.cierra) }}
              </span> -
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                      <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                      Horarios
                    </v-chip>
                  </template>
                  <span> Todos los días de {{ $moment(sitio.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(sitio.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
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
              {{ CalcularDistancia(sitio.lng, sitio.lat) }} km
            </span> de ti
              </div>

              <div class="mt-2">
                {{ sitio.descripcion }}
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

      <v-row class="mt-5">

        <v-col cols="12"
               lg="4"
               md="6"
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

        <v-col cols="12">

          <h2 class="mb-5 black--text">
            Restaurantes que tal vez te gusten
          </h2>

        </v-col>

        <v-col cols="12"
               lg="4"
               md="6"
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
            >

              <template v-slot:placeholder>
                <v-sheet>
                  <v-skeleton-loader type="card" />
                </v-sheet>
              </template>

            </v-img>

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

              <div v-if="!loading.restaurantes">

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

              </div>

              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="pa-3"
                v-else
              >
                <v-skeleton-loader
                  class="mx-auto"
                  type="card"
                />
              </v-sheet>

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

      <v-row class="mt-5" v-if="negocios.listado.rentas && negocios.listado.rentas.length > 0">

        <v-col cols="12">

          <h2 class="mb-5 black--text">
            Renta de autos para una experiencia rápida y cómoda
          </h2>

        </v-col>

        <v-col cols="12"
               lg="4"
               md="6"
               v-for="(renta, i) in negocios.listado.rentas"
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
            >

              <template v-slot:placeholder>
                <v-sheet>
                  <v-skeleton-loader type="card" />
                </v-sheet>
              </template>

            </v-img>

            <v-card-title>
              <h4>
                {{ renta.nombre }}
              </h4>
              <v-spacer/>
              <h6>
              <span :class="VerificarHora(renta.abre, renta.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(renta.abre, renta.cierra) }}
              </span> -
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                      <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                      Horarios
                    </v-chip>
                  </template>
                  <span> Todos los días de {{ $moment(renta.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(renta.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                </v-tooltip>

              </h6>
            </v-card-title>

            <v-card-text>

              <div v-if="!loading.restaurantes">

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

              </div>

              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="pa-3"
                v-else
              >
                <v-skeleton-loader
                  class="mx-auto"
                  type="card"
                />
              </v-sheet>

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

    </div>

    <div v-else>

      <v-btn
        v-bind="attrs"
        v-on="on"
        color="secondary"
        @click="LimpiarBusqueda"
        outlined
      >
        <v-icon left color="secondary">
          fa fa-arrow-left
        </v-icon>
        Regresar
      </v-btn>

      <div v-if="tags.buscadas.resultados && tags.buscadas.resultados.length > 0">

        <v-row class="mt-5" v-if="tags.buscadas.negocios.destinosTuristicos &&
                                  tags.buscadas.negocios.destinosTuristicos.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos los siguientes destinos turísticos con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(sitio, i) in tags.buscadas.negocios.destinosTuristicos"
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
                  {{ sitio.nombre }}
                </h4>
                <v-spacer/>
                <h6>
              <span :class="VerificarHora(sitio.abre, sitio.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(sitio.abre, sitio.cierra) }}
              </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(sitio.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(sitio.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
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
              {{ CalcularDistancia(sitio.lng, sitio.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ sitio.descripcion }}
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

        <v-row class="mt-5" v-if="tags.buscadas.negocios.hoteles &&
                                  tags.buscadas.negocios.hoteles.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos los siguientes hoteles con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(hotel, i) in tags.buscadas.negocios.hoteles"
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

        <v-row class="mt-5" v-if="tags.buscadas.negocios.restaurantes &&
                                  tags.buscadas.negocios.restaurantes.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos los siguientes restaurantes con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(retaurante, i) in tags.buscadas.negocios.restaurantes"
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
              >

                <template v-slot:placeholder>
                  <v-sheet>
                    <v-skeleton-loader type="card" />
                  </v-sheet>
                </template>

              </v-img>

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

                <div v-if="!loading.restaurantes">

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

                </div>

                <v-sheet
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="pa-3"
                  v-else
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    type="card"
                  />
                </v-sheet>

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

        <v-row class="mt-5" v-if="tags.buscadas.negocios.alquilerAutos &&
                                  tags.buscadas.negocios.alquilerAutos.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos las siguientes rentas de autos con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(alquiler, i) in tags.buscadas.negocios.alquilerAutos"
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
                  {{ alquiler.nombre }}
                </h4>
                <v-spacer/>
                <h6>
              <span :class="VerificarHora(alquiler.abre, alquiler.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(alquiler.abre, alquiler.cierra) }}
              </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(alquiler.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(alquiler.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
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
              {{ CalcularDistancia(alquiler.lng, alquiler.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ alquiler.descripcion }}
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

      </div>

      <div v-else>

        <v-alert
          border="left"
          colored-border
          type="warning"
          elevation="2"
          class="mt-5"
        >
          Lo sentimos, no encontramos ningún resultado con tus tags.
        </v-alert>

      </div>

    </div>

  </v-container>

</template>

<script>


export default {

  mounted(){
    this.geolocate()
    this.ObtenerTags()
    this.ObtenerNegocios()
  },

  data(){
    return {
      model: null,
      tabs: null,
      text: "Hola",
      loading:{
        restaurantes: false,
        hoteles: false
      },
      coords: { lat: 0, lng: 0 },
      tags: {
        lista: [],
        seleccionadas: [],
        buscadas: {
          check: false,
          loading: false,
          resultados: [],
          negocios: {
            restaurantes: [],
            hoteles: [],
            alquilerAutos: [],
            destinosTuristicos: [],
            seleccionado: {}
          }
        }
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

    async BusquedaxTag(){

      if(this.tags.seleccionadas && this.tags.seleccionadas.length > 0){

        let params = {
          tags: this.tags.seleccionadas
        }

        await this.$api.post("/tags", params).then(data => {

          this.tags.buscadas.resultados = []
          this.tags.buscadas.resultados = data

          try{

            this.tags.buscadas.negocios.restaurantes = []
            this.tags.buscadas.negocios.hoteles = []
            this.tags.buscadas.negocios.alquilerAutos = []
            this.tags.buscadas.negocios.destinosTuristicos = []

            data.forEach(item=>{

              switch(item.categoria) {
                case 'R' :
                  if(this.tags.buscadas.negocios.restaurantes.indexOf(item) < 0)
                    this.tags.buscadas.negocios.restaurantes.push(item);
                  break;
                case 'H' :
                  if(this.tags.buscadas.negocios.hoteles.indexOf(item) < 0)
                    this.tags.buscadas.negocios.hoteles.push(item);
                  break;
                case 'D' :
                  if(this.tags.buscadas.negocios.destinosTuristicos.indexOf(item) < 0)
                    this.tags.buscadas.negocios.destinosTuristicos.push(item);
                  break;
                case 'RC' :
                  if(this.tags.buscadas.negocios.alquilerAutos.indexOf(item) < 0)
                    this.tags.buscadas.negocios.alquilerAutos.push(item);
                  break;
              }

            })

          }
          catch (e) {

            console.error(e)

          }

          this.tags.buscadas.check = true
          this.$forceUpdate()
        }).catch(({ data }) => {
          console.error(data)
          this.$alert.error('Ocurrió un error interno, vuelva a intentarlo', 'Error Interno')
        })
      }


    },

    async ObtenerNegocios(){
      this.loading.negocios = true
      await this.$api.get('/negocios', {}).then(data=>{
        this.loading_card = false
        this.negocios.listado = data
        this.loading.negocios = false
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
      var time = this.$moment(this.$moment(),format),
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
    },

    LimpiarBusqueda(){

      if(this.tags.buscadas.check){
        this.tags.seleccionadas = []
        this.tags.buscadas.check = false
        this.tags.buscadas.resultados = []
        this.tags.buscadas.negocios.restaurantes = []
        this.tags.buscadas.negocios.hoteles = []
        this.tags.buscadas.negocios.alquilerAutos = []
        this.tags.buscadas.negocios.destinosTuristicos = []
        this.ObtenerTags()
        this.ObtenerNegocios()
      }

    }

  }

}

</script>
