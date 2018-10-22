<template>
    <v-container fill-height>
        <v-layout align-space-around justify-center row fill-height>
            <v-flex fill-height>
                <v-card light>
                    <v-card-title><div class="headline">Pesquisador</div></v-card-title>
                    <v-card-actions>
                        <div class="text-xs-center">
                            <v-btn flat large color="primary" to="/experimentSetup">
                                Novo Experimento
                            </v-btn>
                        </div>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="sessionsList"
                                hide-actions
                                class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.date }}</td>
                                <td class="text-xs-center">{{ props.item.participantes.length }}</td>
                                <td class="text-xs-center">{{ props.item.time }}</td>
                                <td class="text-xs-center"><v-btn color="primary" @click="startExperiment(props.item.id)">Gerenciar</v-btn></td>
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
  import {mapGetters} from 'vuex'
  const fb = require('../../firebase-helpers/firebaseConfig')

  export default {
    name: 'experiment',
    data: function () {
      return {
        sessionsList: [],
        headers: [
          { text: 'Data', value: 'date' },
          { text: 'Nº de Participantes', value: 'participants' },
          { text: 'Ação', value: 'id' }
        ]
      }
    },
    methods: {
      sessions () {
        fb.sessionsColletion.where('experiment', '==', this.currentExperiment.id).get().then(docs => {
          let sessions = []
          docs.forEach(doc => {
            fb.sessionsColletion.doc(doc.id).get().then(result => {
              const session = result.data()
              session.id = doc.id
              sessions.push(session)
            })
            this.sessionsList = sessions
          })
        }).catch()
      }
    },
    computed: {
      ...mapGetters(['currentUser', 'currentExperiment', 'alert'])
    }
  }
</script>