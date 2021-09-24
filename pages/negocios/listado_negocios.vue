<template>

  <v-container fluid>

    <v-card-actions>
      <v-spacer class="hidden-sm-and-down" />
      <v-tooltip bottom v-if="negocios.tabla.check">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="black"
            @click="LimpiarBusqueda"
            class="hidden-md-and-up"
          >
            <v-icon color="black">
              fa fa-arrow-left
            </v-icon>
          </v-btn>
        </template>
        <span>Regresar</span>
      </v-tooltip>
      <v-text-field
        outlined
        rounded
        dense
        hide-details
        label="Busqueda"
        prepend-inner-icon="fa fa-search"
        style="max-width: 300px"
        v-model="negocios.tabla.busqueda"
        @keyup.enter.native="Busqueda"
        clearable
        clear-icon="fa fa-times-circle"
        @click:clear="LimpiarBusqueda"
        color="black"
      />
    </v-card-actions>

    <v-card outlined elevation="0" style="border-radius: 10px;">

      <v-data-table
        :headers="negocios.tabla.headers"
        :items="negocios.listado"
        item-key="negocioId"
        sort-by="negocioId"
        sort-desc
        class="elevation-1"
        style="border-radius: 10px;"
        :loading="negocios.tabla.cargando"
        loading-text="Cargando... Por favor espere un momento."
        no-data-text='Aún no hay negocios para mostrar, por favor vuelva a intentarlo.'
        :header-props="{'sortByText': 'Ordenar por'}"
        :items-per-page="negocios.tabla.negociosPorPagina"
        hide-default-footer
        :page.sync="negocios.tabla.pagina"
        @page-count="negocios.tabla.conteoPaginas = $event"

      >

        <template v-slot:no-data>
          <v-alert
            type="info"
            prominent
            color="complementario"
          >
            <div v-if="negocios.tabla.check">
              No se encontraron ocurrencias en la busqueda: "{{ negocios.tabla.busqueda_texto }}"
            </div>
            <div v-else>
              Aún no hay negocios para mostrar, por favor vuelva a intentarlo.
            </div>
          </v-alert>
        </template>

        <template v-slot:top>

          <v-toolbar
            flat
            style="border-radius: 10px;"
          >
            <v-tooltip bottom v-if="negocios.tabla.check">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="black"
                  @click="LimpiarBusqueda"
                  class="hidden-sm-and-down"
                >
                  <v-icon color="black">
                    fa fa-arrow-left
                  </v-icon>
                </v-btn>
              </template>
              <span>Regresar</span>
            </v-tooltip>
            <v-toolbar-title class="font-weight-bold text-wrap">
              <h4 style="font-family: Poppins, sans-serif;" class="hidden-sm-and-down">
                Administrar de Negocios
              </h4>
              <h4 style="font-family: Poppins, sans-serif; font-size: 15px;" class="hidden-md-and-up">
                Administrar de Negocios
              </h4>
            </v-toolbar-title>

            <v-divider
              class="mx-4 hidden-sm-and-down"
              inset
              vertical
            ></v-divider>

          </v-toolbar>


        </template>

        <template v-slot:[`item.nombre`]="{ item }">
          <v-chip
            class="ma-2"
            color="black"
            outlined
          >
            <v-icon left>
              fa fa-pen-square
            </v-icon>
            {{ item.nombre }}
          </v-chip>
        </template>

        <template v-slot:[`item.categoria`]="{ item }">
          <v-chip
            class="ma-2"
            color="secondary"
            outlined
          >
            <div v-if="item.categoria === 'R'">
              <v-icon left>
                fa fa-briefcase
              </v-icon>
              Restaurante
            </div>
            <div v-else-if="item.categoria === 'H'">
              <v-icon left>
                fa fa-briefcase
              </v-icon>
              Hotel
            </div>
            <div v-else-if="item.categoria === 'D'">
              <v-icon left>
                fa fa-briefcase
              </v-icon>
              Destino Turístico
            </div>
            <div v-else-if="item.categoria === 'RC'">
              <v-icon left>
                fa fa-briefcase
              </v-icon>
              Renta de Autos
            </div>
            <div v-else-if="item.categoria === 'C'">
              <v-icon left>
                fa fa-briefcase
              </v-icon>
              Cambista
            </div>
          </v-chip>
        </template>

        <template v-slot:[`item.horarios`]="{ item }">
          <v-chip
            class="ma-2"
            color="complementario"
            outlined
          >
            <v-icon left>
              fa fa-business-time
            </v-icon>
            {{ $moment(item.abre, "HH:mm:ss").format('h:mm a') }} -
            {{ $moment(item.cierra, "HH:mm:ss").format('h:mm a')  }}
          </v-chip>
        </template>

        <template v-slot:[`item.aut`]="{ item }">
          <v-chip
            class="ma-2"
            :color="item.aut === 'f' ? 'amber darken-2' : 'green'"
            outlined
          >
            <div v-if="item.aut === 'f'">
              <v-icon left>
                fa fa-clock
              </v-icon>
              Pendiente de Autorización
            </div>
            <div v-else>
              <v-icon left>
                fa fa-check
              </v-icon>
              Autorizado
            </div>
          </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="black"
                dark
                v-bind="attrs"
                v-on="on"
                icon
                @click="MostrarDialogoEditar(item)"
              >
                <v-icon
                  color="black"
                >
                  fa fa-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>
        </template>

      </v-data-table>

      <div class="text-center py-2">
        <v-pagination
          v-model="negocios.tabla.pagina"
          :length="negocios.tabla.conteoPaginas"
          :total-visible="7"
          color="secondary"
          circle
        />
      </div>

      <v-dialog v-model="dialogos.negocio"
                transition="dialog-bottom-transition"
                scrollable
                persistent
                max-width="600px"
      >

        <v-card>

          <v-toolbar elevation="0" dense color="black" dark>
            <h3> Editar Negocio </h3>
            <v-spacer></v-spacer>
            <v-btn icon @click="CerrarDialogoNegocio">
              <v-icon>fa fa-times</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="pa-4">

            <v-form ref="frmNegocio">

              <div class="mb-6">
                <h3 class="mt-1 hidden-sm-and-down black--text">
                  Información del Negocio
                </h3>

                <h3 style="font-size: 18px; font-family: Poppins, sans-serif;"
                    class="mt-1 hidden-md-and-up black--text"
                >
                  Información del Negocio
                </h3>
              </div>

              <v-text-field
                outlined
                dense
                v-model="negocios.seleccionado.nombre"
                :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
                label="Nombre del Negocio"
                color="black"
                prepend-icon="fa fa-heading"
              />

              <v-dialog
                ref="dialogoHoraAbre"
                v-model="dialogos.pickerHoraAbre"
                :return-value.sync="date"
                persistent
                width="300px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="negocios.seleccionado.abre"
                    label="Hora de Abrir"
                    prepend-icon="fa fa-lock-open"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                    color="black"
                  />
                </template>
                <v-time-picker
                  format="ampm"
                  v-model="negocios.seleccionado.abre"
                  color="secondary"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="secondary"
                    @click="dialogos.pickerHoraAbre = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    text
                    color="secondary"
                    @click="$refs.dialogoHoraAbre.save(negocios.seleccionado.abre)"
                  >
                    Aceptar
                  </v-btn>
                </v-time-picker>
              </v-dialog>

              <v-dialog
                ref="dialogoHoraCierra"
                v-model="dialogos.pickerHoraCierra"
                :return-value.sync="date"
                persistent
                width="300px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="negocios.seleccionado.cierra"
                    label="Hora de Cerrar"
                    prepend-icon="fa fa-lock"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                    color="black"
                  />
                </template>
                <v-time-picker
                  format="ampm"
                  v-model="negocios.seleccionado.cierra"
                  color="secondary"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="secondary"
                    @click="dialogos.pickerHoraCierra = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    text
                    color="secondary"
                    @click="$refs.dialogoHoraCierra.save(negocios.seleccionado.cierra)"
                  >
                    Aceptar
                  </v-btn>
                </v-time-picker>
              </v-dialog>

              <v-textarea
                outlined
                dense
                no-resize
                clearable
                clear-icon="fa fa-times-circle"
                v-model="negocios.seleccionado.direccion"
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
                v-model="negocios.seleccionado.descripcion"
                :rules="[ v => v && v.length > 0 || 'La descripción es obligatoria' ]"
                rows="3"
                label="Descripción del negocio"
                prepend-icon="fa fa-edit"
                color="black"
              />

            </v-form>

          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              text
              @click="ActualizarNegocio"
            >
              <v-icon left>fa fa-check</v-icon>
              Actualizar
            </v-btn>
          </v-card-actions>

        </v-card>

      </v-dialog>

    </v-card>

  </v-container>

</template>

<script>

export default {

  mounted() {
    this.ObtenerNegocios()
  },

  head(){
    return{
      titleTemplate: "Antigua Travel | Listado de Negocios"
    }
  },

  layout: 'admin_negocio',

  data(){
    return{

      dialogos: {
        negocio: false,
        pickerHoraAbre: false,
        pickerHoraCierra: false,
      },

      negocios: {
        listado: [],
        seleccionado: {},
        tabla: {
          headers: [
            { text: 'Nombre', value: 'nombre', align: 'center'},
            { text: 'Tipo de Negocio', value: 'categoria', align: 'center'},
            { text: 'Horarios', value: 'horarios', align: 'center'},
            { text: 'Estado', value: 'aut', align: 'center'},
            { text: 'Acciones', value: 'actions', sortable: false, align: 'center'},
          ],
          busqueda: null,
          busqueda_texto: null,
          check: false,
          cargando: false,
          pagina: 1,
          conteoPaginas: 0,
          negociosPorPagina: 10
        },
      }

    }
  },

  methods: {

    async ObtenerNegocios(){

      let params = {
        usuarioId: JSON.parse(sessionStorage.getItem('usuario')).id
      }

      this.negocios.tabla.cargando = true

      await this.$api.post("/negocios/usuario", params).then(data => {

        this.negocios.tabla.cargando = false
        this.negocios.listado = data

      })

    },

    async Busqueda(){

    },

    async ActualizarNegocio(){

      if(this.$refs.frmNegocio.validate()){



      }

    },

    MostrarDialogoEditar(negocio){

      this.negocios.seleccionado = Object.assign({}, negocio)
      this.dialogos.negocio = true
      this.$refs.frmNegocio?.resetValidation()

    },

    CerrarDialogoNegocio(){

      this.negocios.seleccionado = {}
      this.dialogos.negocio = false

    },

    LimpiarBusqueda(){

    }

  }

}

</script>
