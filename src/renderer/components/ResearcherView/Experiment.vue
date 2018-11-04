<template>
    <v-container fill-height>
        <v-layout align-space-around justify-center row fill-height>
            <v-flex fill-height>
                <v-card light>
                    <v-card-title><div class="headline">Pesquisador</div></v-card-title>
                    <v-card-actions>
                        <div class="text-xs-center">
                            <v-btn dark large color="info" to="/sessionSetup">
                                Nova Sessão
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
                                <td>{{ Moment(props.item.date.toDate()).format('L LT') }}</td>
                                <td class="text-xs-left">{{ props.item.participants.length }}</td>
                                <td class="text-xs-left"><v-btn  class="white--text"  color="blue-grey" @click="startExperiment(props.item.id)">Gerenciar</v-btn></td>
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
  import moment from 'moment'
  const fb = require('../../firebase-helpers/firebaseConfig')

  export default {
    name: 'experiment',
    data: function () {
      return {
        Moment: moment,
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
              console.log('session', session)
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
    },
    mounted () {
      this.sessions()
      console.log('experiment list', this.sessionsList)
      console.log('experiment', this.currentExperiment.id)
    }
  }
</script>