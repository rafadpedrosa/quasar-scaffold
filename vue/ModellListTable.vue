<template>
  <div>
    <filter-bar></filter-bar>
    <vuetable
            ref="vuetable"
            :data="modells"
            :fields="fields"
            :api-url="api_url"
            :http-options="options"
            pagination-path=""
            :per-page="5"
            :append-params="moreParams"
            @vuetable:pagination-data="onPaginationData">
      <template slot="actions" slot-scope="props">
        <div class="custom-actions">
          <q-btn small
                 class="bg-secondary text-white"
                 @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <q-icon name="create"></q-icon>
          </q-btn>
          <q-btn small
                 class="bg-negative text-white"
                 @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <q-icon name="close"></q-icon>
          </q-btn>
        </div>
      </template>
    </vuetable>
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info
              :no-data-template="'Nenhum dado foi encontrado'"
              :info-template="'Mostrando de {from} até {to} de um total {total} de itens'"
              ref="paginationInfo"></vuetable-pagination-info>
      <vuetable-pagination @vuetable-pagination:change-page="onChangePage" ref="pagination"></vuetable-pagination>
    </div>
  </div>
</template>

<script>
  import Alert from '../mixins/AlertMessage'
  import * as Vuetable from 'vuetable-2'
  import Vue from 'vue'
  import {QBtn, QIcon} from 'quasar'
  import FilterBar from './ModellFilterBar.vue'
  import * as constant from '../../store/const'

  Vue.component('vuetable', Vuetable.Vuetable)
  Vue.component('vuetable-pagination', Vuetable.VuetablePagination)
  Vue.component('vuetable-pagination-info', Vuetable.VuetablePaginationInfo)
  import {
    //    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    mixins: [Alert],
    components: {
      QIcon,
      QBtn,
      FilterBar
    },
    data () {
      return {
        api_url: constant.API_URL + '/modells',
        options: {
          headers: {
            'Authorization': localStorage.getItem('api_token')
          }
        },
        fields: [
          {
            name: '__sequence',
            title: '#',
            titleClass: 'center aligned',
            dataClass: 'center aligned'
          },
          {
            name: 'name',
            sortField: 'name',
            title: 'Name',
            titleClass: 'left aligned',
            dataClass: 'left aligned'
          },
          {
            name: '__slot:actions',
            title: 'Actions',
            titleClass: 'center aligned',
            dataClass: 'center aligned'
          }
        ],
        modells: [],
        moreParams: {}
      }
    },
    methods: {
      ...mapActions(['modell_all', 'modell_delete']),
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      onFilterSet (filterText) {
        this.moreParams = {
          'filter': filterText
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onFilterReset () {
        this.moreParams = {}
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onAction (action, data, index) {
        if (action === 'delete-item') {
          this.modell_delete(data.id).then(() => {
            this.reloadList()
            this.a_deleted('Usuário')
            setTimeout(this.dismissMessages, 5000)
          })
        }
        else {
          this.$q.events.$emit('modell-form-edit', data)
        }
      },
      reloadList () {
        this.$refs.vuetable.refresh()
      }
    },
    mounted () {
      this.$q.events.$on('modell-filter-set', eventData => this.onFilterSet(eventData))
      this.$q.events.$on('modell-filter-reset', e => this.reloadList())
      this.$q.events.$on('modell-list-reload', e => this.reloadList())
    }
  }
</script>

<style>
</style>
