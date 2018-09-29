<template>
  <div id="app">
    <v-app dark>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <inspire-view></inspire-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <span> by Joel Bispo Neto &copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import InspireView from '../renderer/components/InspireView'
  export default {
    name: 'gap',
    components: { InspireView },
    data: () => ({
      title: 'Vuetify.js'
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
