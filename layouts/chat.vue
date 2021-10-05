<template>
  <v-app style="background-color: #f5f5f5;">
    <v-main>
      <nuxt />
    </v-main>
    <template>
      <v-footer inset app>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="mensaje"
              append-outer-icon="mdi-send"
              filled
              clear-icon="mdi-close-circle"
              clearable
              placeholder="Mensaje"
              type="text"
              color="secondary"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      mensaje: ''
    }
  }
}
</script>
