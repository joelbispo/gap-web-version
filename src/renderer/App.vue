<template>
  <div id="app">
    <v-app light>
        <v-navigation-drawer v-if="currentResearcher.fullName"
                fixed
                :mini-variant="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                app
        >
            <v-list>
                <v-list-tile
                        router
                        :to="item.to"
                        :key="i"
                        v-for="(item, i) in items"
                        exact
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="clipped" v-if="currentResearcher.fullName">
            <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn
                    icon
                    @click.native.stop="miniVariant = !miniVariant"
            >
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native.stop="rightDrawer = !rightDrawer"><v-icon>person</v-icon></v-btn>
        </v-toolbar>
        <v-content>
            <app-alert v-if="alert" :tipo="alert.type" :texto="alert.msg" @dismissed="onDismissed"></app-alert>
            <v-container fluid fill-height>
        <router-view></router-view>
        </v-container>
      </v-content>
        <v-navigation-drawer v-if="currentResearcher.fullName"
                temporary
                fixed
                :right="right"
                v-model="rightDrawer"
                app
        >
            <v-list>
                <v-list-tile @click="logout">
                    <v-list-tile-action>
                        <v-icon light>compare_arrows</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Sair</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-footer app fixed dark class="cyan pa-3">
            <div>&copy; GAP - Game of Austruistic Punishment {{ new Date().getFullYear() }}</div>
            <v-spacer></v-spacer>
            <div v-if="currentResearcher"> <span>{{currentResearcher.fullName}}</span></div>
        </v-footer>
    </v-app>
  </div>
</template>

<script>
  import WelcomeView from '../renderer/components/WelcomeView'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'gap',
    components: { WelcomeView },
    data: function () {
      return {
        title: 'GAP',
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          {icon: 'apps', title: 'Gerenciar Experimento', to: '/'},
          {icon: 'bubble_chart', title: 'Históricos', to: '/inspire'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },
    computed: {
      ...mapGetters(['currentUser', 'currentResearcher', 'alert'])
    },
    methods: {
      ...mapActions(['logout', 'clearAlert']),
      onDismissed () {
        this.clearAlert()
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  @import url( 'https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet');
  /* Global CSS */
  #app {
      background-image: url('./assets/background.jpg');
      background-size: cover;
  }
</style>
