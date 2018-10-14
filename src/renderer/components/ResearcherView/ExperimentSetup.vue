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
                                        <v-text-field label="Nome do Experimento"></v-text-field>
                                        <v-text-field label="Tempo de cada rodada em segundos"></v-text-field>
                                    </v-card-text>
                                </v-card>

                                <v-btn
                                        color="primary"
                                        @click="e1 = 2"
                                >
                                    Continuar
                                </v-btn>

                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <v-card
                                        class="mb-5"
                                        height="300px"
                                >
                                    <v-card-text>
                                        <v-text-field label="Quantidade de participantes por jogo"></v-text-field>
                                        <v-switch label="Participantes podem usar o chat"></v-switch>
                                    </v-card-text>
                                </v-card>

                                <v-btn
                                        color="primary"
                                        @click="e1 = 3"
                                >
                                    Continuar
                                </v-btn>

                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-card
                                        class="mb-5"
                                        height="300px"
                                >
                                    <v-card-text>
                                        <v-radio-group>
                                            <v-radio label="Sem liberação de pontos"></v-radio>
                                            <v-radio label="Liberação de pontos para punição de distribuições iguais e não punição de distribuições desiguais"></v-radio>
                                            <v-radio label="Liberação de pontos para punições de distribuições desiguais e não punição de distribuições iguais"></v-radio>
                                        </v-radio-group>
                                    </v-card-text>
                                </v-card>

                                <v-btn
                                        color="primary"
                                        @click="e1 = 1"
                                >
                                    Salvar Experimento
                                </v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
  export default {
    name: 'experiment-setup',
    data: function () {
      return {
        e1: 0
      }
    }
  }
</script>