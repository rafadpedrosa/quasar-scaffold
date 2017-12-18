<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div>
    <q-card>
      <q-card-title>
        Cadastro de Modell
        <div class="pull-right">
          <q-btn icon-right="add" @click="create" class="bg-positive text-white">
            Novo
          </q-btn>
        </div>
      </q-card-title>
    </q-card>
    <q-transition
            enter="fadeIn"
            leave="fadeOut"
            duration="300">
      <modell-form v-show="isForm"></modell-form>
    </q-transition>
    <modell-list :showActions="true"></modell-list>
  </div>
</template>

<script>
  import {
    QCard,
    QTransition,
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
      QTransition,
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
