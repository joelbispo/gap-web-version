<template>
  <v-alert class="fixo" :type="tipo" dismissible @input="onClose" :value="true" transition="scale-transition">{{ texto }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    tipo: String,
    texto: String,
    timeOut: {type: Number, default: 6}
  },
  methods: {
    onClose () {
      this.$emit('dismissed')
    },
    setTimeOutClose () {
      setTimeout(() => {
        this.onClose()
      }, this.timeOut * 1000)
    }
  },
  mounted () {
    this.setTimeOutClose()
  }
}
</script>

<style scoped>
  .fixo {
    position: fixed;
    z-index: 100;
    width: 100%;
  }
</style>
