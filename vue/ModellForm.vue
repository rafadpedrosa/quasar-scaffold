<template>
  <div>
    <q-card>
      <q-card-title>
        Formulário de Usuários

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
            <q-input
                    v-model.trim="user.login"
                    float-label="Login"
                    @input="$v.user.login.$touch"
                    @keyup.enter="$refs.btnSave.click()"
                    :error="$v.user.login.$error"
            ></q-input>
            <validation-message
                    :isError="$v.user.login.$error"
                    :required="!$v.user.login.required"></validation-message>

          </div>
          <div class="col-md-4 input-pad">
            <q-input
                    v-model.trim="user.email"
                    float-label="Email"
                    @input="$v.user.email.$touch"
                    @keyup.enter="$refs.btnSave.click()"
                    :error="$v.user.email.$error"
            >

            </q-input>
            <validation-message
                    :field_name="'email'"
                    :isError="$v.user.email.$error"
                    :email="!$v.user.email.email"
                    :required="!$v.user.email.required"></validation-message>
          </div>
        </div>
      </q-card-main>
      <q-card-actions align="end">
        <q-btn icon-right="save"
               ref="btnSave"
               @click="save"
               loader
               class="bg-positive text-white">
          Salvar
          <div slot="loading">
            Saving...
            <q-spinner-oval>
            </q-spinner-oval>
          </div>
        </q-btn>
      </q-card-actions>
    </q-card>
    <h2></h2>
  </div>
</template>

<script>
  import Alert from '../mixins/AlertMessage'
  import ValidationMessage from '../shared/ValidationMessage'
  import {required, email} from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'
  import {
    QSpinnerOval,
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
    mixins: [Alert],
    components: {
      QSpinnerOval,
      ValidationMessage,
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
        user: {
          login: '',
          email: ''
        },
        isEdit: false,
        pending: false
      }
    },
    validations: {
      user: {
        email: {
          required,
          email
        },
        login: {required}
      },
      validationGroup: ['user.email', 'user.login']

    },
    methods: {
      ...mapActions([
        'user_all',
        'user_store',
        'user_show',
        'user_edit',
        'user_update',
        'user_unique_email',
        'user_patch']),
      close () {
        this.$q.events.$emit('user-form-toggle', false)
      },
      save (event, done) {
        //        if (!this.$v.validationGroup.$invalid) {
        let isEdit = this.isEdit
        const success = response => {
          this.$q.events.$emit('user-list-reload')
          this.clearForm()
          if (isEdit) {
            this.a_updated('Usuário')
          }
          else {
            this.a_created('Usuário')
          }
          done()
        }
        const err = (err) => {
          if (err.response.status === 422) {
            var error = ''
            error = this.createMessage(error, err.response.data.email)
            error = this.createMessage(error, err.response.data.login)
            this.a_negative(error)
          }
          else {
            this.a_negative(err)
          }
          done()
        }

        if (this.isEdit) {
          this.user_update(this.user).then(success).catch(err)
        }
        else {
          this.user_store(this.user).then(success).catch(err)
        }
        //        }
      },
      clearForm () {
        this.$v.$reset()
        this.isEdit = false
        this.user = {
          'login': '',
          'email': ''
        }
      }
    },
    mounted () {
      this.$q.events.$on('user-form-save', done => this.save(null, done))
      this.$q.events.$on('user-form-new', () => {
        this.clearForm()
      })
      this.$q.events.$on('user-form-edit', user => {
        this.$q.events.$emit('user-form-toggle', true)
        this.$v.$reset()
        this.user = Object.assign({}, user)
        this.isEdit = true
      })
    },
    beforeDestroy () {
      this.$q.events.$off('user-form-new')
      this.$q.events.$off('user-form-save')
      this.$q.events.$off('user-form-edit')
    }
  }
</script>

<style>

</style>
