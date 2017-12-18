<template>
  <div>
    <q-card>
      <q-card-title>
        Lista de Modell
      </q-card-title>
      <q-card-separator/>
      <q-card-main>
        <api-list-modell></api-list-modell>
      </q-card-main>
    </q-card>

  </div>
</template>

<script>
  import {
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator
  } from 'quasar'
  import {
    //    mapGetters,
    mapActions
  } from 'vuex'
  import apiListModell from './ModellListTable.vue'

  export default {
    props: ['showActions'],
    components: {
      QCard,
      QCardTitle,
      QCardMain,
      QCardSeparator,
      apiListModell
    },
    methods: {
      ...mapActions(['modell_all', 'modell_delete']),
      edit (modell) {
        const modellConst = {
          'id': modell.id,
          'name': modell.name,
          'alias': modell.alias
        }
        this.$q.events.$emit('modell-form-edit', modellConst)
      },
      remove (id) {
        this.modell_delete(id).then(result => {
          this.$q.events.$emit('modell-list-reload')
        })
      },
      currency (value) {
        return value
      }
    },
    data () {
      return {
        modells: [],
        isFetching: true
      }
    },
    mounted () {
    },
    beforeDestroy () {
    }
  }
</script>

<style>
</style>
