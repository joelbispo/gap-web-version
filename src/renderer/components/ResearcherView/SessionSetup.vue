<template>
    <v-container fill-height>
        <v-layout justify-space-between column fill-height>
            <v-flex fill-height>
                <v-card light>
                    <v-card-title>
                        <div class="headline">Nova Sessão</div>
                    </v-card-title>
                    <v-card-text>
                        <v-layout align-center justify-center row fill-height>
                            <v-flex>
                                <v-card>
                                    <v-toolbar flat>
                                        <v-toolbar-title>Participante</v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-form>
                                            <v-text-field prepend-icon="person" name="name" label="Nome Completo"
                                                          type="text" v-model.trim="name"></v-text-field>
                                            <v-text-field prepend-icon="child_friendly" name="age" label="Idade"
                                                          id="age" type="number" v-model="age"></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" @click="addParticipat" :disabled="this.listParticipant.length>=this.currentExperiment.numberParticipants">Adicionar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                            <v-flex>
                                <h4 class="text-md-center">Você deve informar o nome de usuário para o participante</h4>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-flex>
                            <v-data-table
                                    :headers="headers"
                                    :items="listParticipant"
                                    hide-actions
                                    class="elevation-1"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>{{ props.item.name }}</td>
                                    <td class="text-xs-left">{{ props.item.age }}</td>
                                    <td class="text-xs-left">{{ props.item.userName }}</td>
                                </template>
                                <template slot="no-data">
                                    <v-alert :value="true" color="primary" flat icon="warning">
                                        Ei pesquisador, você precisa adicionar participantes nessa sessão
                                    </v-alert>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn block color="primary" @click="startSession">iniciar sessão</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  const fb = require('../../firebase-helpers/firebaseConfig')
  export default {
    name: 'session-setup',
    data: function () {
      return {
        headers: [
          { text: 'Nome completo', value: 'name' },
          { text: 'Idade', value: 'age' },
          { text: 'Codigo de Acesso', value: 'userName' }
        ],
        name: '',
        age: '',
        userName: '',
        listParticipant: []
      }
    },
    methods: {
      ...mapActions(['setError', 'setSuccess']),
      addParticipat () {
        let participant = {}
        participant.name = this.name
        participant.age = this.age
        participant.userName = (this.name.split(' ')[0] + this.age).toLocaleLowerCase()
        this.listParticipant.push(participant)
        this.name = ''
        this.age = ''
      },
      startSession () {
        fb.sessionsColletion.add({
          experiment: this.currentExperiment.id,
          date: fb.firestone.FieldValue.serverTimestamp(),
          participants: this.listParticipant
        }).then(suc => {
          this.setSuccess('Experimento salvo com sucesso')
          console.log(suc)
        }).catch(err => {
          this.setError('Desculpa, algo aconteceu e não conseguimos salvar o experimento, tente novamente')
          console.log(err)
        })
      }
    },
    computed: {
      ...mapGetters(['currentExperiment'])
    }
  }
</script>