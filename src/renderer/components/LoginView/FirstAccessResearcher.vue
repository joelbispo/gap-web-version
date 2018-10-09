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
                                    label="Nome completo" v-model.trim="fullName"
                                    :error-messages="fullNameErrors" required  @blur="$v.fullName.$touch()"
                                   ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Instituição (Ex. Universidade, Instituto Federal)" :error-messages="institutionErrors"  required v-model.trim="institution" @blur="$v.institution.$touch()"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Nível acadêmico" :error-messages="academicLevelErrors" @blur="$v.academicLevel.$touch()" required v-model.trim="academicLevel"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="email" v-model.trim="email" :error-messages="emailErrors" required @blur="$v.email.$touch()"  ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Senha" v-model.trim="password" :error-messages="passwordErrors" @blur="$v.password.$touch()"  type="password"></v-text-field>
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
  import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'
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
      password: { required, minLength: minLength(6) }
    },
    data: function () {
      return {
        fullName: '',
        institution: '',
        academicLevel: '',
        email: '',
        password: ''
      }
    },
    methods: {
      clickedOnRegisterResearcher () {
        if (!this.$v.$touch()) return
        fb.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
          this.$store.commit('setCurrentUser', user.user)
          console.log('comitou current user')
          console.log('usuario', user.user)
          // create user obj
          fb.researcherColletion.doc(user.user.uid).set({
            fullName: this.fullName,
            institution: this.fullName,
            academicLevel: this.academicLevel
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
        if (!this.$v.fullName.$dirty) return errors
        !this.$v.fullName.maxLength && errors.push('Ops, seu nome não poderá passar de 100 caracteres')
        !this.$v.fullName.required && errors.push('Precisamos do seu nome completo')
        return errors
      },
      institutionErrors () {
        const errors = []
        if (!this.$v.institution.$dirty) return errors
        !this.$v.institution.maxLength && errors.push('Ops, sua instituição não poderá passar de 100 caracteres')
        !this.$v.institution.required && errors.push('Precisamos saber de que instituição você faz parte')
        return errors
      },
      academicLevelErrors () {
        const errors = []
        if (!this.$v.academicLevel.$dirty) return errors
        !this.$v.academicLevel.maxLength && errors.push('Ops, seu nível acadêmico não poderá passar de 100 caracteres')
        !this.$v.academicLevel.required && errors.push('Precisamos do seu nível acadêmico')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Você precisa fornecer um email válido')
        !this.$v.email.required && errors.push('Precisamos saber o seu Email, ele será usado para você autenticar na plataforma')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Sua senha deve contar no minimo 6 caracteres ')
        !this.$v.password.required && errors.push('Você precisa informar a sua senha')
        return errors
      }
    }
  }
</script>
<style>

</style>