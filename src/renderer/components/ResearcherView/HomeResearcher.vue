<template>
    <v-container fill-height>
        <v-layout align-space-around justify-center row fill-height>
            <v-flex fill-height>
                <v-card light>
                    <v-card-title><div class="headline">Pesquisador</div></v-card-title>
                    <v-card-actions>
                        <div class="text-xs-center">
                        <v-btn flat large color="primary">
                            <v-icon>fa-flask</v-icon>
                               Novo Experimento
                        </v-btn>
                        </div>
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="desserts"
                                hide-actions
                                class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.name }}</td>
                                <td class="text-xs-right">{{ props.item.calories }}</td>
                                <td class="text-xs-right">{{ props.item.fat }}</td>
                                <td class="text-xs-right">{{ props.item.carbs }}</td>
                                <td class="text-xs-right">{{ props.item.protein }}</td>
                                <td class="text-xs-right">{{ props.item.iron }}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
  export default {
    name: 'home-researcher',
    data: function () {
      return {
        headers: [
          {
            text: 'Nome do Experimento',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt'
          },
          {
            value: false,
            name: 'Ice cream sandwich'
          }
        ]
      }
    }
  }
</script>