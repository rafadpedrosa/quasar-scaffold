<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div>
    <q-card>
      <q-card-title>
        Cadastro de modells
        <div class="pull-right">
          <q-btn icon-right="add" @click="create" class="bg-positive text-white">
            Novo
          </q-btn>
          <q-btn icon-right="save" @click="save" class="bg-positive text-white">
            Salvar
          </q-btn>
        </div>
      </q-card-title>
    </q-card>
    <modell-form v-show="isForm"></modell-form>

    <modell-list :showActions="true"></modell-list>
  </div>
</template>

<script>
  import {
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QBtn,
    QIcon
  } from 'quasar'
  import ModellList from './ModellList'
  import ModellForm from './ModellForm'

  export default {
    components: {
      QCard,
      QCardTitle,
      QCardMain,
      QCardSeparator,
      QBtn,
      QIcon,
      ModellList,
      ModellForm
    },
    data () {
      return {
        isForm: false
      }
    },
    computed: {},
    methods: {
      create () {
        this.toggleFormVis(true)
        this.$q.events.$emit('modell-form-new')
      },
      toggleFormVis (toggle) {
        this.isForm = toggle !== undefined ? toggle : !this.isForm
      },
      save () {
        this.$q.events.$emit('modell-form-save')
      }
    },
    mounted () {
      this.$q.events.$on('modell-form-toggle', toggle => {
        this.toggleFormVis(toggle)
      })
    },
    beforeDestroy () {
      this.$q.events.$off('modell-form-toggle')
    }
  }
</script>

<style>
</style>
