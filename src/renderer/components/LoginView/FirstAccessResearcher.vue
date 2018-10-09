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
                            <v-text-field
                                    label="Nome completo" v-model.trim="researcher.fullName"
                                    :error-messages="fullNameErrors" required
                                   ></v-text-field>
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
                            <v-text-field label="Senha" v-model.trim="researcher.password"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Confirmação de Senha"></v-text-field>
                        </v-flex>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.native="cancel">Cancelar</v-btn>
                    <v-btn ref="cadastroBtn" color="primary"
                           @click="clickedOnRegisterResearcher">Cadastrar Pesquisador
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import { required, maxLength, email, password } from 'vuelidate/lib/validators'
  import { validationMixin } from 'vuelidate'
  const fb = require('../../firebase-helpers/firebaseConfig')

  export default {
    name: 'FirstAccessResearcher',
    mixins: [validationMixin],
    validations: {
      fullName: { required, maxLength: maxLength(100) },
      institution: { required, maxLength: maxLength(100) },
      academicLevel: { required, maxLength: maxLength(100) },
      email: { required, email },
      password: { required, password }
    },
    data: function () {
      return {
        researcher: {
          fullName: '',
          institution: '',
          academicLevel: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      clickedOnRegisterResearcher () {
        console.log(this.researcher)
        fb.auth.createUserWithEmailAndPassword(this.researcher.email, this.researcher.email).then(user => {
          this.$store.commit('setCurrentUser', user.user)
          console.log('comitou current user')
          console.log('usuario', user.user)
          // create user obj
          fb.researcherColletion.doc(user.user.uid).set({
            fullName: this.researcher.fullName,
            institution: this.researcher.fullName,
            academicLevel: this.researcher.academicLevel
          }).then(() => {
            this.$store.dispatch('fetchResearcher')
            console.log('feched user')
          }).catch(err => {
            console.log(err)
            console.log('deu erro')
          })
        }).catch(err => {
          console.log(err)
          console.log('deu erro2')
        })
      },
      cancel () {
        this.$router.push('/loginResearcher')
      }
    },
    computed: {
      fullNameErrors () {
        const errors = []
        if (!this.$v.researcher.fullName.$dirty) return errors
        !this.$v.researcher.fullName.maxLength && errors.push('Ops, seu nome não poderá passar de 100 caracteres')
        !this.$v.researcher.fullName.required && errors.push('Precisamos do seu nome completo')
        return errors
      },
      institutionErrors () {
        const errors = []
        if (!this.$v.researcher.institution.$dirty) return errors
        !this.$v.researcher.institution.maxLength && errors.push('Ops, sua instituição não poderá passar de 100 caracteres')
        !this.$v.researcher.institution.required && errors.push('Precisamos saber de que instituição você faz parte')
        return errors
      },
      academicLevelErrors () {
        const errors = []
        if (!this.$v.researcher.academicLevel.$dirty) return errors
        !this.$v.researcher.academicLevel.maxLength && errors.push('Ops, seu nível acadêmico não poderá passar de 100 caracteres')
        !this.$v.researcher.academicLevel.required && errors.push('Precisamos do seu nível acadêmico')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.researcher.email.$dirty) return errors
        !this.$v.researcher.email.email && errors.push('Você precisa fornecer um email válido')
        !this.$v.researcher.email.required && errors.push('Precisamos saber o seu Email, ele será usado para você autenticar na plataforma')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.researcher.password.$dirty) return errors
        !this.$v.researcher.password.minLength && errors.push('Sua senha deve contar no minimo 6 caracteres ')
        !this.$v.researcher.password.required && errors.push('Você precisa informar a sua senha')
        return errors
      }
    }
  }
</script>
<style>

</style>