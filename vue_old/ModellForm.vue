<template>
  <div>
    <q-card>
      <q-card-title>
        Formulário de Modells

        <span> - {{ isEdit ? 'Editar' : 'Criando'}}</span>

        <q-btn
                @click="close"
                class="bg-negative text-white pull-right" small flat>
          <q-icon name="close"></q-icon>
        </q-btn>

      </q-card-title>
      <q-card-separator/>
      <q-card-main>

        <div class="row">
          <div class="col-md-8 input-pad">
            <q-input v-model="modell.name" float-label="Nome"/>
          </div>
          <div class="col-md-4 input-pad">
            <q-input v-model="modell.alias" float-label="Alias"/>
          </div>
        </div>
      </q-card-main>
      <q-card-actions align="end">
        <q-btn icon-right="save" @click="save" class="bg-positive text-white">
          Salvar
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  //  import {required, email} from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'
  import {
    QCard,
    QCardTitle,
    QCardActions,
    QCardMain,
    QCardSeparator,
    QBtn,
    QIcon,
    QInput
  } from 'quasar'

  export default {
    components: {
      QCardActions,
      QInput,
      QCard,
      QCardTitle,
      QCardMain,
      QCardSeparator,
      QBtn,
      QIcon
    },
    data () {
      return {
        modell: {
          'name': '',
          'alias': ''
        },
        isEdit: false
      }
    },
    methods: {
      ...mapActions([
        'modell_all',
        'modell_store',
        'modell_show',
        'modell_edit',
        'modell_update',
        'modell_patch']),
      close () {
        this.$q.events.$emit('modell-form-toggle', false)
      },
      save () {
        const success = response => {
          this.$q.events.$emit('modell-list-reload')
          this.clearForm()
        }
        const err = response => {
          console.log(response)
        }

        if (this.isEdit) {
          this.modell_update(this.modell).then(success).catch(err)
        }
        else {
          this.modell_store(this.modell).then(success).catch(err)
        }
      },
      clearForm () {
        this.isEdit = false
        this.modell.name = ''
        this.modell.alias = ''
      }
    },
    mounted () {
      this.$q.events.$on('modell-form-save', this.save)
      this.$q.events.$on('modell-form-new', this.clearForm)
      this.$q.events.$on('modell-form-edit', modell => {
        this.$q.events.$emit('modell-form-toggle', true)
        this.modell = modell
        this.isEdit = true
      })
    },
    beforeDestroy () {
      this.$q.events.$off('modell-form-new')
      this.$q.events.$off('modell-form-save')
      this.$q.events.$off('modell-form-edit')
    }
  }
</script>

<style>
</style>
