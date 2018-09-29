<template>
  <div id="app">
    <v-app light>
        <v-toolbar app dark fixed clipped-left class="primary"></v-toolbar>
      <v-content>
        <v-container fluid fill-height>
        <router-view></router-view>
        </v-container>
      </v-content>
        <v-footer app fixed dark class="cyan pa-3">
            <div>&copy; GAP - Game of Austrustic Punishment {{ new Date().getFullYear() }}</div>
            <v-spacer></v-spacer>
            <div> <span>by Joel Bispo Neto</span></div>
        </v-footer>
    </v-app>
  </div>
</template>

<script>
  import WelcomeView from '../renderer/components/WelcomeView'
  export default {
    name: 'gap',
    components: { WelcomeView },
    data: () => ({
      title: 'Vuetify.js'
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
