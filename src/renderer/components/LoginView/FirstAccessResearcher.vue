<template>
    <v-layout fluid align-center row justify-center>
        <v-card color="transparent">
            <v-content>
                <v-flex>
                    <img style="margin-top: 30px;" height="300px" src="../../assets/mad-scientist.svg">
                </v-flex>
            </v-content>

        </v-card>
        <v-flex>
            <v-card>
                <v-card-text>
                    <v-container fluid grid-list-xl py-2>
                        <v-flex>
                            <v-text-field label="Nome completo" v-model.trim="researcher.fullName"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Instituição (Ex. Universidade, Instituto Federal)" v-model.trim="researcher.institution"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Nível acadêmico" v-model.trim="researcher.academicLevel"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="email" v-model.trim="researcher.email"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Nome de usuario" v-model.trim="researcher.userName"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Senha" v-model.trim="researcher.password"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Confirmação de Senha"></v-text-field>
                        </v-flex>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.native="cancelar">Cancelar</v-btn>
                    <v-btn ref="cadastroBtn" color="primary"
                           @click="clickedOnRegisterResearcher">Cadastrar Pesquisador
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  const fb = require('../../firebase-helpers/firebaseConfig')

  export default {
    name: 'FirstAccessResearcher',
    data: function () {
      return {
        researcher: {
          fullName: '',
          institution: '',
          academicLevel: '',
          email: '',
          userName: '',
          password: ''
        }
      }
    },
    methods: {
      clickedOnRegisterResearcher () {
        console.log(this.researcher)
        fb.auth.createUserWithEmailAndPassword(this.researcher.email, this.researcher.password).then(user => {
          this.$store.commit('setCurrentUser', user)
          console.log('comitou current user')
          // create user obj
          fb.usersCollection.doc(user.uid).set({
            fullName: this.researcher.fullName,
            institution: this.researcher.institution,
            academicLevel: this.researcher.academicLevel,
            email: this.researcher.email,
            userName: this.researcher.userName
          }).then(() => {
            this.$store.dispatch('fetchUserProfile')
            console.log('feched user')
          }).catch(err => {
            console.log(err)
            console.log('deu erro')
          })
        }).catch(err => {
          console.log(err)
          console.log('deu erro2')
        })
      }
    }
  }
</script>
<style>

</style>