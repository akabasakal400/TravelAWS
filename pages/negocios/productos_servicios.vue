<template>
  <v-container fluid>

    <v-card-actions>
      <v-spacer class="hidden-sm-and-down" />
      <v-tooltip bottom v-if="productos.tabla.check">
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
        class="animate__animated animate__jackInTheBox"
        prepend-inner-icon="fa fa-search"
        style="max-width: 300px"
        v-model="productos.tabla.busqueda"
        @keyup.enter.native="Busqueda"
        clearable
        clear-icon="fa fa-times-circle"
        @click:clear="LimpiarBusqueda"
        color="black"
      />
    </v-card-actions>

    <v-card outlined elevation="0" style="border-radius: 10px;"
            class="animate__animated animate__zoomIn"
    >

      <v-data-table
        :headers="productos.tabla.headers"
        :items="productos.listado"
        item-key="productoId"
        sort-by="productoId"
        sort-desc
        class="elevation-1"
        style="border-radius: 10px;"
        :loading="productos.tabla.loading"
        loading-text="Cargando... Por favor espere un momento."
        no-data-text='Aún no hay productos para mostrar, por favor vuelva a intentarlo.'
        :header-props="{'sortByText': 'Ordenar por'}"
        :items-per-page="productos.tabla.productosPorPagina"
        hide-default-footer
        :page.sync="productos.tabla.pagina"
        @page-count="productos.tabla.conteoPaginas = $event"

      >

        <template v-slot:no-data>
          <v-alert
            type="info"
            prominent
            color="complementario"
          >
            <div v-if="productos.tabla.check">
              No se encontraron ocurrencias en la busqueda: "{{ productos.tabla.busqueda_texto }}"
            </div>
            <div v-else>
              Aún no hay productos o servicios para mostrar, por favor vuelva a intentarlo.
            </div>
          </v-alert>
        </template>

        <template v-slot:top>

          <v-toolbar
            flat
            style="border-radius: 10px;"
          >
            <v-tooltip bottom v-if="productos.tabla.check">
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
                Administrar de Produtos y Servicios
              </h4>
              <h4 style="font-family: Poppins, sans-serif; font-size: 15px;" class="hidden-md-and-up">
                Administrar de Productos y Servicios
              </h4>
            </v-toolbar-title>

            <v-divider
              class="mx-4"
              inset
              vertical
            />

            <v-col cols="10" lg="3"
                   class="mt-7 hidden-md-and-down"
            >
              <v-select
                :items="negocios.listado"
                v-model="negocios.seleccionado"
                label="Negocio Actual"
                item-value="id"
                item-text="nombre"
                @change="SeleccionarNegocio"
                outlined
                dense
                color="black"
                item-color="black"
              >
                <v-icon slot="prepend-inner" color="complementario" class="mx-2">
                  fa fa-briefcase
                </v-icon>
              </v-select>
            </v-col>


            <v-spacer />

            <v-btn
              color="tertiary"
              class="hidden-sm-and-down"
              outlined
              @click="MostrarDialogoNuevo"
            >
              <v-icon left>
                fa fa-cube
              </v-icon>
              Nuevo
            </v-btn>
            <v-btn
              color="tertiary"
              class="hidden-md-and-up my-2 mx-4"
              small
              outlined
              @click="MostrarDialogoNuevo"
            >
              <v-icon left>
                fa fa-cube
              </v-icon>
              Nuevo
            </v-btn>

          </v-toolbar>

          <v-col cols="7" sm="6" md="4"
                 class="mt-n2 hidden-lg-and-up"
          >
            <v-select
              :items="negocios.listado"
              v-model="negocios.seleccionado"
              label="Negocio Actual"
              item-value="negocioId"
              item-text="nombre"
              @change="SeleccionarNegocio"
              outlined
              dense
              color="black"
              item-color="black"
            >
              <v-icon slot="prepend-inner" color="complementario" class="mx-2">
                fa fa-briefcase
              </v-icon>
            </v-select>
          </v-col>



        </template>

        <template v-slot:[`item.nombre`]="{ item }">
          <v-chip
            class="ma-2"
            color="warning darken-1"
            outlined
          >
            <v-icon left>
              fa fa-cube
            </v-icon>
            {{ item.nombreProducto }}
          </v-chip>
        </template>

        <template v-slot:[`item.sku`]="{ item }">
          <v-chip
            class="ma-2"
            color="error"
            outlined
          >
            <v-icon left>
              fa fa-barcode
            </v-icon>
            {{ item.sku }}
          </v-chip>
        </template>

        <template v-slot:[`item.categoria`]="{ item }">
          <v-chip
            class="ma-2"
            color="grey darken-3"
            outlined
          >
            <v-icon left>
              fa fa-object-group
            </v-icon>
            {{ item.categoria === 'I' ? 'Inventariable' : 'No Inventariable' }}
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error"
                     icon
                     v-bind="attrs"
                     v-on="on"
                     @click="EliminarProducto(item)"
              >
                <v-icon color="error">
                  fa fa-trash
                </v-icon>
              </v-btn>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>

      </v-data-table>

      <div class="text-center py-2">
        <v-pagination
          v-model="productos.tabla.pagina"
          :length="productos.tabla.conteoPaginas"
          :total-visible="7"
          color="black"
          circle
        />
      </div>

    </v-card>

    <v-dialog v-model="dialogos.producto"
              transition="dialog-bottom-transition"
              scrollable
              persistent
              max-width="900px"
    >

      <v-card>

        <v-toolbar elevation="0" dense color="transparent">
          <h3> {{ productos.seleccionado.idProductoServicio > 0 ? 'Editar' : 'Nuevo' }} Producto </h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="CerrarDialogoProducto">
            <v-icon>fa fa-times</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">

          <v-form ref="frmProducto">

            <div class="mb-6">
              <h3 class="mt-1 hidden-sm-and-down black--text">
                Información del Producto
              </h3>

              <h3 style="font-size: 18px; font-family: Poppins, sans-serif;"
                  class="mt-1 hidden-md-and-up black--text"
              >
                Información del Producto
              </h3>
            </div>

            <v-text-field
              outlined
              dense
              v-model="productos.seleccionado.nombre"
              :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
              label="Nombre del Producto"
              color="black"
              prepend-icon="fa fa-heading"
            />

            <v-text-field
              outlined
              dense
              v-model="productos.seleccionado.valor"
              type="number"
              :rules="[ v => v && v.length > 0 || 'El precio es obligatorio' ]"
              label="Precio del Producto"
              color="black"
              prepend-icon="fa fa-money-bill-wave-alt"
            />

            <v-file-input
              v-model="productos.seleccionado.imagen"
              color="black"
              label="Imagen del Producto"
              placeholder="Selecciona la imagen de tu producto"
              prepend-icon="fa fa-file-image"
              persistent-hint
              hint="Opcional"
              outlined
              dense
              accept="image/*"
              truncate-length="50"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="secondary"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ productos.seleccionado.imagen.length - 2 }} Archivo(s)
                </span>
              </template>

              <template v-slot:counter>

              </template>

            </v-file-input>

            <v-textarea
              outlined
              dense
              no-resize
              clearable
              clear-icon="fa fa-times-circle"
              v-model="productos.seleccionado.descripcion"
              :rules="[ v => v && v.length > 0 || 'La descripción es obligatoria' ]"
              rows="3"
              label="Descripción del Producto"
              prepend-icon="fa fa-edit"
              color="black"
            />

            <div class="mb-6" v-if="productos.seleccionado.id > 0">
              <h3 class="mt-1 hidden-sm-and-down black--text">
                Características del Producto
                <div class="subheading mt-2" style="font-family: Poppins, sans-serif;">
                  <h5 class="mt-1 text-wrap text--secondary" style="white-space: nowrap;">
                    Por favor añada las características que desea que tenga el producto
                  </h5>
                </div>
              </h3>

              <h1 style="font-size: 18px; font-family: Poppins, sans-serif;"
                  class="mt-1 hidden-md-and-up black--text"
              >
                Características del Producto
                <div class="subheading mt-2" style="font-family: Poppins, sans-serif; white-space: nowrap;">
                  <h6 class="mt-1 text-wrap text-justify text--secondary">
                    Por favor añada las características que desea que tenga el producto
                  </h6>
                </div>
              </h1>
            </div>

            <div
              v-for="(caracteristica, i) in productos.seleccionado.caracteristicas"
              :key="i"
              v-if="productos.seleccionado.productoId > 0"
            >
              <IconPicker v-model="caracteristica.dialogo" :icono.sync="caracteristica.icono" />
              <v-row>
                <v-col cols="12" lg="4" md="4" sm="4">
                  <v-text-field
                    outlined
                    dense
                    v-model="caracteristica.nombre"
                    :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
                    label="Nombre"
                    color="black"
                    prepend-icon="fa fa-heading"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="4">
                  <v-text-field
                    outlined
                    dense
                    v-model="caracteristica.valor"
                    :rules="[ v => v && v.length > 0 || 'El valor es obligatorio']"
                    label="Valor"
                    color="black"
                    prepend-icon="fa fa-code-branch"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="3" sm="3">
                  <v-btn color="black" outlined class="mt-1" @click="caracteristica.dialogo = true">
                    {{ caracteristica.icono == "" ? 'Seleccionar' : ''}} Icono
                    <v-icon color="black" right>
                      {{ caracteristica.icono }}
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" lg="1" md="1" sm="1">

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="error"
                             icon
                             v-bind="attrs"
                             v-on="on"
                             @click="RemoverCaracteristica(caracteristica, i)"
                      >
                        <v-icon color="error">
                          fa fa-trash
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar</span>
                  </v-tooltip>

                </v-col>
              </v-row>
              <v-divider class="mb-5" />
            </div>

            <div v-if="productos.seleccionado.productoId > 0">

              <v-btn outlined
                     class="hidden-sm-and-down"
                     @click="AddCaracteristica"
              >
                <v-icon color="secondary" left>
                  fa fa-plus
                </v-icon>
                Agregar Característica
              </v-btn>

              <v-btn
                small
                outlined
                class="hidden-md-and-up"
                @click="AddCaracteristica"
              >
                <v-icon color="secondary" left>
                  fa fa-plus
                </v-icon>
                Agregar Característica
              </v-btn>

            </div>

          </v-form>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            text
            @click="ActualizarProducto"
            v-if="productos.seleccionado.productoID > 0"
          >
            <v-icon left>fa fa-check</v-icon>
            Actualizar
          </v-btn>
          <v-btn
            color="black"
            text
            @click="GuardarProducto"
            v-else
          >
            <v-icon left>fa fa-check</v-icon>
            Guardar
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

  </v-container>
</template>

<script>
export default {

  layout: 'admin_negocio',

  head(){
    return{
      titleTemplate: "Antigua Travel | Productos y Servicios"
    };
  },

  mounted(){
    this.ObtenerNegocios()
  },

  middleware: 'VerificarTieneNegocio',

  components: {  },

  data() {
    return {
      v:null,
      dialogos: {
        producto: false,
        detalles: false
      },
      busqueda: {
        realizada: false,
        texto: null
      },
      negocios: {
        listado: [],
        seleccionado: {}
      },
      productos: {
        tabla: {
          headers: [
            { text: 'Nombre', value: 'nombre', align: 'center'},
            { text: 'Acciones', value: 'actions', sortable: false, align: 'center'},
          ],
          busqueda: null,
          busqueda_texto: null,
          check: false,
          loading: false,
          pagina: 1,
          conteoPaginas: 0,
          productosPorPagina: 10
        },
        listado: [],
        seleccionado: { caracteristicas: [] }
      },
      proveedores: [],
      llanta: {
        caracteristicas: [
          { caracteristicasID: -1, nombre: 'Medida', valor: '' },
          { caracteristicasID: -1, nombre: 'Marca', valor: '' },
          { caracteristicasID: -1, nombre: 'Tipo', valor: '' },
          { caracteristicasID: -1, nombre: 'Estado', valor: '' },
          { caracteristicasID: -1, nombre: 'Diseño', valor: '' },
          { caracteristicasID: -1, nombre: 'Pliegos', valor: '' },
          { caracteristicasID: -1, nombre: 'Serie', valor: '' },
          { caracteristicasID: -1, nombre: 'Documento de Compra', valor: '' }
        ]
      }
    }
  },

  methods: {

    async ObtenerProductos(){

      let params = {
        negocioId: this.negocios.seleccionado.id
      }

//      this.productos.tabla.loading = true

      await this.$api.get("/productos", params).then(data => {

        this.productos.tabla.loading = false
        this.productos.listado = data

      }).catch(data => {
        console.error(data)
        this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
        this.productos.tabla.loading = false
      })

    },

    async ObtenerNegocios(){

      let params = {
        usuarioId: JSON.parse(sessionStorage.getItem('usuario')).id
      }

      await this.$api.post("/negocios/usuario", params).then(data => {

        this.negocios.listado = data
        this.negocios.seleccionado = Object.assign({}, data[0])
        this.ObtenerProductos()

      })

    },

    async ObtenerCaracteristicas(){

    },

    async Busqueda(){

    },

    SeleccionarNegocio(){



    },

    MostrarDialogoNuevo(){
      this.dialogos.producto = true
      this.$refs.frmProducto?.resetValidation()
    },
    MostrarDialogoEditar(producto){
      this.productos.seleccionado = Object.assign({}, producto)
      this.dialogos.producto = true
      this.$refs.frmProducto?.resetValidation()
    },
    CerrarDialogoProducto(){
      this.productos.seleccionado = { caracteristicas: [] }
      this.dialogos.producto = false
    },
    async GuardarProducto(){

      if(this.$refs.frmProducto.validate()){

        let params = {

          nombre: this.productos.seleccionado.nombre,
          descripcion: this.productos.seleccionado.descripcion,
          valor: this.productos.seleccionado.valor,
          img: null,
          negocioId: this.negocios.seleccionado.id

        }

        await this.$api.post("/producto", params).then(data => {

          this.ObtenerProductos()
          this.CerrarDialogoProducto()

        }).catch(data => {
          console.error(data)
          this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
        })

      }

    },
    async ActualizarProducto(){

    },
    async EliminarProducto(producto){

    },
    AddCaracteristica(){
      this.productos.seleccionado.caracteristicas.push(
        {
          idCaracteristica: -1,
          nombre: '',
          valor: '',
          icono: '',
          dialogo: false
        }
      )
      this.$forceUpdate()
    },
    async RemoverCaracteristica(caracteristica, index){
      if(caracteristica.caracteristicasID > 0){
        //codigo
        console.log()
      }
      else{
        this.productos.seleccionado.caracteristicas.splice(index, 1)
      }
      this.$forceUpdate()
    },
    LimpiarBusqueda(){
      this.productos.tabla.busqueda = null
      this.productos.tabla.busqueda_texto = null
      this.productos.tabla.check = false
      this.productos.tabla.pagina = 1
      this.ObtenerProductos()
    }

  }

}

</script>
