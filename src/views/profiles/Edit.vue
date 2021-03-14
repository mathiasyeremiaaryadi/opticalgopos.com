<template>
  <div class="col-md-12 col-lg-12">
    <div class="card mb-4">
      <div class="card-block">
        <h3 class="card-title">Profile</h3>

        <div class="text-center mb-5">
          <img
            src="/images/default-image.jpg"
            alt="profile photo"
            class="circle img-fluid"
            height="auto"
          />
        </div>

        <form class="form" @submit.prevent="submit()">
          <div class="form-group row">
            <label class="col-md-3 col-form-label">Gambar Profile Baru</label>

            <div class="col-md-9">
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input form-control"
                    accept="image/*"
                    id="profile_image"
                    :class="{
                      'is-invalid':
                        file_validation.file_size ||
                        file_validation.file_extension
                    }"
                    @change="get_new_image"
                  />
                  <label class="custom-file-label" for="profile_image">{{
                    label_image
                  }}</label>
                </div>
              </div>

              <template v-if="file_validation.file_size">
                <div class="help-block text-danger">
                  Ukuran file gambar maksimal 1MB
                </div>
              </template>

              <template v-if="file_validation.file_extension">
                <div class="help-block text-danger">
                  File gambar harus dalam format png/jpeg/jpg
                </div>
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Nama</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                placeholder="Nama . . ."
                autocomplete="off"
                v-model="profile.name"
                :class="{ 'is-invalid': $v.profile.name.$error }"
                @blur="$v.profile.name.$touch()"
              />

              <template v-if="$v.profile.name.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.profile.name.required"
                  >Nama wajib diisi</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Email</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                placeholder="Email . . ."
                autocomplete="off"
                v-model="profile.email"
                :class="{ 'is-invalid': $v.profile.email.$error }"
                @blur="$v.profile.email.$touch()"
              />

              <template v-if="$v.profile.email.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.profile.email.required"
                  >Email wajib diisi</span
                >

                <span
                  class="help-block text-danger"
                  v-if="!$v.profile.email.email"
                  >Email harus dalam format email</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Password Baru</label>
            <div class="col-md-9">
              <input
                type="password"
                class="form-control"
                placeholder="Password . . ."
                autocomplete="off"
                v-model="profile.password"
                :class="{ 'is-invalid': $v.profile.password.$error }"
                @blur="$v.profile.password.$touch()"
              />

              <template v-if="$v.profile.password.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.profile.password.minLength"
                  >Password minimal 6 karakter</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Konfirmasi Password</label>
            <div class="col-md-9">
              <input
                type="password"
                class="form-control"
                placeholder="Konfirmasi password . . ."
                autocomplete="off"
                v-model="profile.confirm_password"
                :class="{
                  'is-invalid': $v.profile.confirm_password.$error
                }"
                @blur="$v.profile.confirm_password.$touch()"
              />

              <template v-if="$v.profile.confirm_password.$error">
                <p
                  class="help-block text-danger"
                  v-if="!$v.profile.confirm_password.sameAsPassword"
                >
                  Konfirmasi password tidak sama
                </p>
              </template>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-lg-3 col-md-12 col-12 offset-lg-9">
              <button
                type="submit"
                class="btn btn-lg btn-block btn-success mt-3 text-white"
              >
                Ubah
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'EditProfile',

  created() {
    if (this.logged_user.role === 0) {
      this.edit_admin(this.$route.params.id).then(response => {
        this.profile = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email
        }
      })
    } else {
      this.edit_employee(this.$route.params.id).then(response => {
        this.profile = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email
        }
      })
    }
  },

  data() {
    return {
      label_image: 'Gambar profile . . .',
      file_validation: {
        file_size: false,
        file_extension: false
      },
      new_image: null,
      profile: {
        id: '',
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      }
    }
  },

  validations: {
    profile: {
      name: {
        required
      },

      email: {
        required,
        email
      },

      password: {
        minLength: minLength(6)
      },

      confirm_password: {
        sameAsPassword: sameAs('password')
      }
    }
  },

  computed: {
    ...mapGetters(['logged_user']),

    is_admin() {
      return this.logged_user.role === 0
    },

    is_employee() {
      return this.logged_user.role > 0
    }
  },

  methods: {
    ...mapActions('admin', ['edit_admin']),
    ...mapActions('employee', ['edit_employee']),

    get_new_image(selected_image_file) {
      this.new_image = selected_image_file.target.files[0]

      if (this.new_image) {
        this.label_image = this.new_image.name

        if (this.new_image.size > 1024 * 1024) {
          this.file_validation.file_size = true
        } else {
          this.file_validation.file_size = false
        }

        if (!this.new_image.name.match(/\.(jpg|jpeg|png)$/)) {
          this.file_validation.file_extension = true
        } else {
          this.file_validation.file_extension = false
        }
      }
    },

    submit() {
      this.$v.$touch()

      if (
        !this.$v.$invalid &&
        !this.file_validation.file_size &&
        !this.file_validation.file_extension
      ) {
        return
      }
    }
  }
}
</script>

<style></style>
