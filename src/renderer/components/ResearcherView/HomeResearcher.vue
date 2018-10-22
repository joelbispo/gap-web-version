<template>
    <v-container fill-height>
        <v-layout align-space-around justify-center row fill-height>
            <v-flex fill-height>
                <v-card light>
                    <v-card-title><div class="headline">Pesquisador</div></v-card-title>
                    <v-card-actions>
                        <div class="text-xs-center">
                        <v-btn flat large color="primary">
                            Experimentos
                        </v-btn>
                            <v-btn flat large color="primary" to="/experimentSetup">
                                Novo
                            </v-btn>
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
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
  import {mapGetters} from 'vuex'
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
          { text: 'Usam chat', value: 'canChat' }
        ]
      }
    },
    methods: {
      experiments () {
        fb.experimentColletion.where('researcher', '==', this.currentUser.email).get().then(docs => {
          let experiments = []
          docs.forEach(doc => {
            fb.experimentColletion.doc(doc.id).get().then(result =>
              experiments.push(result.data())
            )
            this.experimentList = experiments
          })
        }).catch(
        )
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