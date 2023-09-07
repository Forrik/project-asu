<template>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-8 content">
            <div class="col-lg-12 mb-4 mb-sm-5">
                <div class="card card-style1 border-0">
                    <div  class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                        <div  class="row align-items-center">
                      
                            <div  class="col-lg-6 px-xl-10">
                                <div class="bg-primary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 w-100 rounded">
                                    <h3 class="h2 text-white mb-0">{{user.first_name}} {{user.middle_name}} {{user.last_name}}</h3>
                                    <span class="text-light">Студент</span>
                                </div>
                                <ul class="list-unstyled mb-1-9">
                                    <li v-if="user.position" class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Должность:</span>{{user.position}}</li>

                                    <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600" v-if="user.number_student_book">Зачетная книжка:</span> {{user.number_student_book}}</li>
                                    <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Уровень подготовки:</span> Специалитет</li>
                                    <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Курс:</span> 4 курс</li>
                                    <li class="display-28"><span class="display-26 text-secondary me-2 font-weight-600">Группа:</span>ЭАС-411</li>
                                </ul>
                                <ul class="social-icon-style1 list-unstyled mb-0 ps-0">
                                    <li><a href="#!"><i class="ti-twitter-alt"></i></a></li>
                                    <li><a href="#!"><i class="ti-facebook"></i></a></li>
                                    <li><a href="#!"><i class="ti-pinterest"></i></a></li>
                                    <li><a href="#!"><i class="ti-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
import axios from 'axios'


import { useUserStore } from '@/stores/user.js'
import { useToastStore } from '@/stores/toast.js'


export default {
    name: 'Profile',
    setup() {
      
        const userStore = useUserStore()
        const toastStore = useToastStore()
        
        return {
            userStore,
            toastStore

        }
    },

    components: {

    },

    data() {
        return {

            user:[]
        }
    },

    mounted() {
        this.getUser();
    },



    methods: {

    getUser() {
        axios.get('http://localhost:8000/api/me').then(response => {
            this.user = response.data
        })

    }

    },
}
</script>