<template>
    <v-container fill-height>
        <v-layout align-space-around justify-center row fill-height>
            <v-flex fill-height>
                <v-card light>
                    <v-toolbar>
                        <v-icon>fa-flask</v-icon>
                        <v-toolbar-title>Configurando Experimento</v-toolbar-title>
                    </v-toolbar>
                </v-card>
                <v-card-text>
                    <v-stepper v-model="e1">
                        <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">Configurações Gerais</v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">Participantes</v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3">Condições Experimentais</v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card
                                        class="mb-5"
                                        height="300px"
                                >

                                    <v-card-text>
                                        <v-text-field label="Nome do Experimento" v-model="name" required></v-text-field>
                                        <v-text-field label="Tempo de cada rodada em segundos" v-model="time" required></v-text-field>
                                    </v-card-text>
                                </v-card>

                                <v-btn
                                        color="primary"
                                        @click="e1 = 2"
                                >
                                    Continuar
                                </v-btn>

                                <v-btn flat to="homeResearcher">Cancelar</v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <v-card
                                        class="mb-5"
                                        height="300px"
                                >
                                    <v-card-text>
                                        <v-text-field label="Quantidade de participantes por jogo" v-model="numberParticipants" required></v-text-field>
                                        <v-switch label="Participantes podem usar o chat" v-model="canChat" required ></v-switch>
                                    </v-card-text>
                                </v-card>

                                <v-btn
                                        color="primary"
                                        @click="e1 = 3"
                                >
                                    Continuar
                                </v-btn>

                                <v-btn flat @click="e1 = 1">Voltar</v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-card
                                        class="mb-5"
                                        height="300px"
                                >
                                    <v-card-text>
                                        <v-radio-group  v-model="experimentalConditions" required>
                                            <v-radio label="Sem liberação de pontos" value=1></v-radio>
                                            <v-radio label="Liberação de pontos para punição de distribuições iguais e não punição de distribuições desiguais" value=2></v-radio>
                                            <v-radio label="Liberação de pontos para punições de distribuições desiguais e não punição de distribuições iguais"  value=3></v-radio>
                                        </v-radio-group>
                                    </v-card-text>
                                </v-card>

                                <v-btn
                                        color="primary"
                                        @click="saveExperiment"
                                >
                                    Salvar Experimento
                                </v-btn>
                                <v-btn flat  @click="e1 = 2">Voltar</v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  const fb = require('../../firebase-helpers/firebaseConfig')

  export default {
    name: 'experiment-setup',
    data: function () {
      return {
        e1: 0,
        name: '',
        time: 30,
        numberParticipants: 2,
        canChat: true,
        experimentalConditions: 1,
        email: ''
      }
    },
    methods: {
      ...mapActions(['setError', 'setSuccess']),
      saveExperiment () {
        fb.experimentColletion.add({
          name: this.name,
          time: this.time,
          numberParticipants: this.numberParticipants,
          canChat: this.canChat,
          experimentalConditions: this.experimentalConditions,
          researcher: this.email
        }).then(suc => {
          this.setSuccess('Experimento salvo com sucesso')
          this.$router.push('/homeResearcher')
          console.log(suc)
        }).catch(err => {
          this.setError('Desculpa, algo aconteceu e não conseguimos salvar o experimento, tente novamente')
          console.log(err)
        }
        )
      },
      setEmail () {
        this.email = this.currentUser.email
      }
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
    mounted () {
      this.setEmail()
    }
  }
</script>