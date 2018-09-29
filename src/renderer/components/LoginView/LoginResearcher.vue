<template>
  <v-layout align-center justify-center class="text-xs-center">
    <v-flex xs12 sm8>
      <v-card class="elevation-12">
          <v-card-media
                  height="300px"
          >
              <img style="margin-top: 30px;" height="300px" src="../../assets/mad-scientist.svg">
          </v-card-media>
        <v-card-text>
          <h3 class="headline text-xs-center mb-0 center">Pesquisador</h3>
          <p class="text-xs-center mb-0">Olá, pesquisador. Você precisa fornecer suas credenciais</p>
        </v-card-text>
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="email"
                          type="email" required
            ></v-text-field>
            <v-text-field prepend-icon="lock"
                          type="password"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn ref="submitBtn" color="primary" large> Entrar
                <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Login-researcher'
}
</script>
