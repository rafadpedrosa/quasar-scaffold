<template>
  <div>
    <q-input v-model="filterText"
             :clearable="true"
             @keyup.enter="doFilter"
             placeholder="buscar...">
    </q-input>
    <q-btn class="bg-secondary text-white" @click="doFilter">buscar</q-btn>
    <q-btn class="bg-secondary text-white" @click="resetFilter">
      limpar
    </q-btn>
    <br>
    <br>
  </div>
</template>

<script>
  import {QBtn, QInput} from 'quasar'

  export default {
    components: {
      QBtn,
      QInput
    },
    data () {
      return {
        filterText: ''
      }
    },
    methods: {
      doFilter () {
        this.$q.events.$emit('modell-filter-set', this.filterText)
      },
      resetFilter () {
        this.filterText = ''
        this.$q.events.$emit('modell-filter-reset')
      }
    }
  }
</script>

<style>
</style>
