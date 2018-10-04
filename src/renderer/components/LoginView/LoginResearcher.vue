<template>
  <v-layout align-center justify-center class="text-xs-center">
    <v-flex xs12 sm8>
      <v-card class="elevation-12">
          <v-card-media
                  height="300px"
          >
              <img style="margin-top: 30px;" height="300px" src="../../assets/mad-scientist.svg">
          </v-card-media>
        <v-card-text>
          <h3 class="headline text-xs-center mb-0 center">Pesquisador</h3>
          <p class="text-xs-center mb-0">Olá, pesquisador, tudo bom?. Forneça suas credenciais para entrar na plataforma</p>
        </v-card-text>
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="email" v-model.trim="formLogin.email" type="email" required ></v-text-field>
            <v-text-field prepend-icon="lock"  type="password" v-model.trim="formLogin.password" ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat ref="submitBtn" color="primary" large @click="clickedOnRegisterResearcher"> Primeiro acesso
                <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
              </v-btn>
              <v-btn ref="submitBtn" color="primary" @click="login" large> Entrar
                <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  const fb = require('../../firebase-helpers/firebaseConfig')

  export default {
    name: 'Login-researcher',
    data: function () {
      return {
        formLogin: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      clickedOnRegisterResearcher () {
        this.$router.push('/firstAccessResearcher')
      },
      login () {
        fb.auth.signInWithEmailAndPassword(this.formLogin.email, this.formLogin.password).then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchResearcher')
          console.log('deu certo o login')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
