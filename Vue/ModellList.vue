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
  import apiListModell from './ApiListModell.vue'

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
      reloadList () {
        this.isFetching = true
        this.modell_all().then(result => {
          this.modells = result.data
          this.isFetching = false
        }).catch(err => {
          console.log(err)
          this.modells = err.data
          this.isFetching = false
        })
      },
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
          console.log(result.data)
          this.reloadList()
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
