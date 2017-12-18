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
            @vuetable:pagination-data="onPaginationData"
    ></vuetable>
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
  import * as Vuetable from 'vuetable-2'
  import Vue from 'vue'
  import FilterBar from './FilterBar.vue'
  import * as constant from '../../store/const'

  Vue.component('vuetable', Vuetable.Vuetable)
  Vue.component('vuetable-pagination', Vuetable.VuetablePagination)
  Vue.component('vuetable-pagination-info', Vuetable.VuetablePaginationInfo)
  import {
    //    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    components: {
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
            name: 'name',
            sortField: 'name',
            title: 'Client',
            titleClass: 'left aligned',
            dataClass: 'left aligned'
          },
          {
            name: 'alias',
            sortField: 'alias',
            title: 'Alias',
            titleClass: 'left aligned',
            dataClass: 'left aligned'
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
      }
    },
    mounted () {
      this.$q.events.$on('modell-filter-set', eventData => this.onFilterSet(eventData))
      this.$q.events.$on('modell-filter-reset', e => this.onFilterReset())
    }
  }
</script>

<style>
</style>
