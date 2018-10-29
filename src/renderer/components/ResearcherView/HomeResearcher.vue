<template>
    <v-container fill-height>
        <v-layout align-space-around justify-center row fill-height>
            <v-flex fill-height>
                <v-card light>
                    <v-card-title><div class="headline">Pesquisador</div></v-card-title>
                    <v-card-actions>
                        <div class="text-xs-center">
                            <v-btn large color="info" to="/experimentSetup">
                                Experimento
                            <v-icon right dark>add_circle_outline</v-icon></v-btn>
                        </div>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="experimentList"
                                hide-actions
                                class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.name }}</td>
                                <td class="text-xs-center">{{ props.item.numberParticipants }}</td>
                                <td class="text-xs-center">{{ props.item.time }}</td>
                                <td class="text-xs-center">{{ props.item.experimentalConditions }}</td>
                                <td class="text-xs-center">{{ props.item.canChat ? 'Sim' : 'Não' }}</td>
                                <td class="text-xs-center"><v-btn class="white--text"  color="blue-grey" @click="startExperiment(props.item)">Iniciar</v-btn></td>
                            </template>
                            <template slot="no-data">
                                <v-alert :value="true" color="primary" flat icon="warning">
                                    Ei pesquisador, você ainda não configurou nenhum experimento!
                                </v-alert>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  const fb = require('../../firebase-helpers/firebaseConfig')

  export default {
    name: 'home-researcher',
    data: function () {
      return {
        experimentList: [],
        headers: [
          { text: 'Nome do Experimento', value: 'name' },
          { text: 'Nº de Participantes', value: 'numberParticipants' },
          { text: 'Tempo de Cada Rodada (s)', value: 'time' },
          { text: 'Condição Experimental', value: 'experimentalConditions' },
          { text: 'Usam chat', value: 'canChat' },
          { text: 'Ação', value: 'id' }
        ]
      }
    },
    methods: {
      ...mapActions(['setCurrentExperiment']),
      experiments () {
        fb.experimentColletion.where('researcher', '==', this.currentUser.email).get().then(docs => {
          let experiments = []
          docs.forEach(doc => {
            fb.experimentColletion.doc(doc.id).get().then(result => {
              const experiment = result.data()
              experiment.id = doc.id
              experiments.push(experiment)
            })
            this.experimentList = experiments
          })
        }).catch(
        )
      },
      startExperiment (experiment) {
        this.setCurrentExperiment(experiment)
        this.$router.push('/experiment')
      }
    },
    computed: {
      ...mapGetters(['currentUser', 'currentResearcher', 'alert'])
    },
    mounted () {
      this.experiments()
    }
  }
</script>