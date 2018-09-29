<template>
    <v-layout align-center justify-space-around>
      <v-flex sx12 sm4 md4 md4 @click="$router.push(rotaLoginResearher)">
        <v-card hover @mouseenter="hover = true" @mouseleave="hover = false" >
            <v-toolbar dark color="primary">
                <v-toolbar-title><h3>Participante</h3></v-toolbar-title>
            </v-toolbar>
            <v-flex>
                <v-card-media>
                    <img   style="margin-top: 30px;"  height="200px" src="../assets/participants.svg">
                </v-card-media>
            </v-flex>
        </v-card>
      </v-flex>
      <v-flex sx12 sm4 md4 md4  @click="this.clickedOnResearcher">
          <v-card hover @mouseenter="hover = true" @mouseleave="hover = false" height="50%">
              <v-toolbar dark color="cyan">
                  <v-toolbar-title><h3>Pesquisador</h3></v-toolbar-title>
              </v-toolbar>
              <v-flex>
                  <v-card-media>
                      <img   style="margin-top: 30px;" height="200px" src="../assets/mad-scientist.svg">
                  </v-card-media>
              </v-flex>
          </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  import LoginResearcher from './LoginView/LoginResearcher'

  export default {
    name: 'welcome',
    components: { LoginResearcher },
    data: function () {
      return {
        rotaLoginResearher: '/loginResearcher'
      }
    },
    methods: {
      clickedOnResearcher () {
        console.log('clicou')
        this.$router.push('/loginResearcher')
      }
    }
  }
</script>

<style>
</style>
