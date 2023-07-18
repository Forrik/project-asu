<template>

    <section class="vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img   src="./icons/KnowledgeIcon.png"
                class="img-fluid photos" alt="Sample image">
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form v-on:submit.prevent="submitForm">
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" v-model="form.email"  placeholder="Введите email"  class="form-control form-control-lg"
                   >
                  <label class="form-label fw-bold text-body-tertiary" >Email адрес</label>
                </div>


      
                <!-- Password input -->
                <div class="form-outline mb-3">
                  <input type="password" v-model="form.password" class="form-control form-control-lg"
                    placeholder="Введите пароль" />
                  <label class="form-label fw-bold text-body-tertiary" >Пароль</label>
                </div>
      
                <div class="d-flex justify-content-between align-items-center">
                  <!-- Checkbox -->
                  <div class="form-check mb-0">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label class="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" class="text-body">Forgot password?</a>
                </div>

                <template v-if="errors.length > 0">
                    <div class="alert alert-danger mt-3" >
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                </template>

      
                <div class="text-center text-lg-start mt-4 pt-2">
                  <button class="btn btn-primary btn-lg"
                    style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>

                </div>
      
              </form>
            </div>
          </div>
        </div>

      </section>
</template>

<script>
import axios from 'axios'

import { useUserStore } from '@/stores/user.js'

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    data() {
        return {
            form: {
                email: 'mail@mail.ru',
                password: '',
            },
            errors: []
        }
    },
    methods: {
        async submitForm() {
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Вы не ввели email')
            }

            if (this.form.password === '') {
                this.errors.push('Вы не ввели пароль')
            }

            if (this.errors.length === 0) {
                await axios
                    .post('http://localhost:8000/api/login/', this.form)
                    .then(response => {
                        this.userStore.setToken(response.data)

                        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                    })
                    .catch(error => {
                        console.log('error', error)

                        this.errors.push('Неправильная связка логин - пароль, проверьте правильность написания')
                    })
            }
            
            if (this.errors.length === 0) {
                await axios
                    .get('http://localhost:8000/api/me/')
                    .then(response => {
                        this.userStore.setUserInfo(response.data)

                        this.$router.push('/')
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        }
    }
}
</script>

<style>



.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
.h-custom {
height: calc(100% - 73px);
}
@media (max-width: 450px) {
.h-custom {
height: 100%;
}
}
</style>