<template>
    <div class="row">
        <div class="col-4"></div>
        <div class="col-7 content">
            <div class="col-lg-8 mb-4 mb-sm-5">
                <div class="card card-style1 border-0">
                    <div  class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                        <div  class="row align-items-center">
                      
                            <div  class="col-lg-12 px-xl-12 ">
                                <div class="profile__fio d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 w-100 rounded ps-2">
                                    <h3 class="h2 text-white mb-0 fw-bold"> {{user.last_name}} {{user.first_name}} {{user.middle_name}} </h3>
                                    <span class="text-light fw-bold fs-4" v-if="user.role">{{user.role.name}}</span>
                                </div>
                                <ul class="list-unstyled mb-1-9 ps-2 mt-4">

                                    
                                    <li class="mb-2 mb-xl-3 display-28 fs-5"><span class="display-26 text-secondary me-2 font-weight-600 fw-bold" v-if="user.number_student_book">Номер зачётной книжки: {{user.number_student_book}}</span> </li>

                                    <li class="mb-2 mb-xl-3 display-28 fs-5"> <span class="display-26 text-secondary me-2 font-weight-600 fw-bold" v-if="user.studentGroup">
                                        Специальность: {{user.studentGroup.speciality_id.code}} {{user.studentGroup.speciality_id.name}}
                                    </span></li>

                                    <li class="mb-2 mb-xl-3 display-28 fs-5"><span class="display-26 text-secondary me-2 font-weight-600 fw-bold" v-if="user.eduLevel">Уровень образования: {{ user.eduLevel.name }}</span> </li>

                                    <li class="mb-2 mb-xl-3 display-28 fs-5"><span class="display-26 text-secondary me-2 font-weight-600 fw-bold" v-if="user.studentGroup">Группа: {{user.studentGroup.speciality_id.abbreviation}}-{{user.studentGroup.number}}</span> </li>

                                    <li class="mb-2 mb-xl-3 display-28 fs-5"><span class="display-26 text-secondary me-2 font-weight-600 fw-bold" v-if="user.educationBase">Основа обучения: {{user.educationBase.name}}</span></li>

                                    <li v-if="user.position" class="mb-2 mb-xl-3 display-28 fs-5"><span class="display-26 text-secondary me-2 font-weight-600 fw-bold" v-if="user.position">Должность: {{user.position.name}}</span></li>

                                    <li class="mb-2 mb-xl-3 display-28 fs-5">
                                        <span class="display-26 text-secondary me-2 font-weight-600 fw-bold" v-if="user.academicTitle">Учёное звание: {{user.academicTitle.name}}</span> 
                                        
                                    </li>
                                    <li class="mb-2 mb-xl-3 display-28 fs-5">
                                        <span class="display-26 text-secondary me-2 font-weight-600 fw-bold" v-if="user.academicDegree">Учёная степень: {{user.academicDegree.name}}</span></li>
                                
                                    
                                  

                                    


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
.profile__fio {
    background-color: #695CFE;
}
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