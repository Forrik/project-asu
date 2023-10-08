<script setup>
import Delete from './icons/Delete.vue'
import Edit from './icons/Edit.vue'
import Next from './icons/Next.vue'
import Add from './icons/Add.vue'

</script>

<template>
    <div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-8 content">

                <div class="graduation-name">Выпуск: {{graduations.year}}, {{graduations.typeGraduation}}</div> 

                 <div>
                  
                    <ul class="nav ">
                        <li class="nav-item"  v-on:click="counter = `summary`" >
                          <a class="nav-link-graduate" :class="{ active: activeIndex === 0 }" @click="setActive(0)" aria-current="page" href="#">Сводка</a>
                        </li>
                        <li class="nav-item"  v-on:click="counter = `hours`" >
                          <a class="nav-link-graduate" :class="{ active: activeIndex === 1 }" @click="setActive(1)" href="#">Часы</a>
                        </li>
                        <li class="nav-item"  v-on:click="counter = `groups`" >
                          <a class="nav-link-graduate" :class="{ active: activeIndex === 2 }" @click="setActive(2)" href="#">Группы</a>
                        </li>
                        <li class="nav-item"  v-on:click="counter = `timeNorm`" >
                          <a class="nav-link-graduate" :class="{ active: activeIndex === 3 }" @click="setActive(3)" href="#">Норма времени</a>
                        </li>
                      </ul>
                      <ul class="nav-tabs"></ul>
                      <div class="card">
                      <div class="table-responsive">
                          <table v-if="counter === `summary`" class="table table-bordered table-hover">



                            <tbody v-for="(user_graduation, index) in user_graduations" :key="index">
                              <tr v-for="(group, gIndex) in user_graduation.groups" :key="gIndex"> 
                                <td v-if="gIndex === 0">{{ user_graduation.id }}</td>
                                <td v-else></td>
                                <td v-if="gIndex === 0">{{ user_graduation.first_name }} {{ user_graduation.middle_name }} {{ user_graduation.last_name }}</td>
                                <td v-else></td>
                                <td>{{ group.group_name }}</td>
                                <tbody style="display:table-cell;">
                                <td  style="display: block;" v-for="(student, sIndex) in group.students">
                                  {{ student.last_name }} {{ student.first_name }} {{ student.middle_name }}
                                </td>
                                Всего студентов - {{ group.students.length }}
                              </tbody>
                              <tr style="display:block; border: none;">
                                <td style="display:block;"  v-for="(student, sIndex) in group.students">
                                  {{ student.hours}} часов
                               
                                </td>
                                Всего часов: {{ group.hours }} часов
                              </tr>
                              </tr>
                            </tbody>
      
                                  <tbody v-if="user_graduations.length === 0"> <tr><td colspan="5"> Нет данных</td></tr></tbody>
                                </table>

                                <table v-else-if="counter === `hours`"  class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                          <th scope="col">№</th>
                                          <th scope="col">Преподаватель</th>
                                          <th scope="col">Количество часов</th>
                                          <th scope="col">Остаток</th>
                                          <th scope="col"></th>
                                          <th scope="col"></th>
                                        </tr>
                                      </thead>
                                      <tbody  v-for="(user_graduation, index) in user_graduations" :key="index">
                                        <tr>
                                          <td> {{user_graduation.id}} </td>
                                          <td >{{user_graduation.first_name}} {{user_graduation.middle_name}} {{user_graduation.last_name}}</td>
                                          <td>{{user_graduation.hours_sum - user_graduation.hours_sum}}</td>
                                          <td> {{user_graduation.hours_sum}}</td>
                                          <td><Edit /></td> 
                                          <td><Delete /></td>
                                        </tr>
                                      
                                      </tbody>
                                      <a @click="openModalHours" href="#">   <Add /></a>
                                      <tbody v-if="user_graduations.length === 0"> <tr><td colspan="6"> Нет данных</td></tr></tbody>
                                </table>
                                <table v-else-if="counter === `groups`"  class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                          <th scope="col">Группа</th>
                                          <th scope="col">Специальность</th>
                                          <th scope="col">Уровень образования</th>
                                          <th scope="col">Курс</th>
                                          <th scope="col">Номер</th>
                                          <th scope="col">Форма обучения</th>
                                          <th scope="col"></th>
                                          <th scope="col"></th>
                                          <th scope="col"></th>
                                        </tr>
                                      </thead>
                                      <tbody v-for="(group, index) in groups" :key="index">
                                        <tr>
                                       <td>{{group.speciality.abbreviation}}-{{group.number}}</td>
                                       <td>{{group.speciality.name}}</td>
                                       <td>{{group.speciality.education_level.name}}</td>
                                       <td>{{group.course}}</td>
                                       <td>{{group.number}}</td>
                                       <td>{{group.education_form.name}}</td>
                                       <td><Edit /></td> 
                                       <td> <Delete /> </td>
                                       <td><Next /></td>
                                        </tr>
                                      </tbody>
                                      <tbody v-if="user_graduations.length === 0"> <tr><td colspan="9"> Нет данных</td></tr></tbody>
                                      <a @click="openModal" href="#">   <Add /></a>
                                </table>
                                <table v-else-if="counter === `timeNorm`"  class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                          <th scope="col">№</th>
                                          <th scope="col">Специальность</th>
                                          <th scope="col">Вид консультирования</th>
                                          <th scope="col">Количество часов</th>
                                          <th scope="col"></th>
                                          <th scope="col"></th>
                                        </tr>
                                      </thead>
                                      <tbody v-for="(time_norm, index) in time_norms" :key="index">
                                        <tr>
                                          <td >{{time_norm.id}}</td>
                                          <td >{{time_norm.speciality.code}} {{time_norm.speciality.name}}  </td>
                                          <td>{{time_norm.consultancy_type.name}}</td>
                                          <td >{{time_norm.hours}}</td>
                                          <td><Edit /></td> 
                                          <td> <Delete /> </td>
                                        </tr>
                                      </tbody>
                                      <tbody v-if="time_norms.length === 0"> <tr><td colspan="6"> Нет данных</td></tr></tbody>
                                     
                                        <a @click="openModal" href="#">   <Add /></a>
                                     
                                </table>
                               
                      </div>
                      </div>
                   
                    
                      
                  </div>
                  
        </div>
        
        </div>

        <div v-show="modalActiveHours" >
          <div  @click="modalActiveHours = false; this.errors=''" class="modal-wrapper" >   </div>
           <div  class="modal-window">
              <h4 class="modal-title py-3 fw-bold">Добавить</h4>
              <svg
              @click="modalActiveHours = false; this.errors=''"
              class="icon-close"
              xmlns="http://www.w3.org/2000/svg"
              height="35"
              viewBox="0 0 16 16"
              width="35"
              
            >
              <polygon
                fill-rule="evenodd"
                points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
              />
            </svg>
            <form  v-on:submit.prevent="submitForm">
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4">Преподаватель</label>
                
                <select v-model="form.teacher"  class="form-select form-modal">
                  <option v-for="teacher in teachers" v-bind:key="teacher.id" :value="teacher.id">{{ teacher.last_name }} {{ teacher.first_name }} {{ teacher.middle_name }}</option>
                </select>
              </div>
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4" >Количество часов</label>
                <input v-model="form.hours" class="form-control form-modal" 
                  placeholder="Введите количество часов" />
              </div>
              <template v-if="errors.length > 0">
                <div class="alert alert-danger mt-3" >
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>
            </template>

          
                <div class="btn-modal-wrapper">
                  <button class="btn-modal">Добавить</button>
                </div>

                

              </form>
              
          
           </div>
       
          </div>
        
    </div>
</template>

<script >
import axios from 'axios';

export default {
    name: 'Graduation',
    
    data () {
        

        return {
            
            counter: 'summary',
            activeIndex: 0,
            users: [],
            isLoading: true,
            groups: [],
            user_graduations: [],
            graduations: [],
            time_norms: [],
            modalActiveHours: false,
            modalActiveHoursEdit: false,
            form: {
                teacher: '',
                hours: '',
            },
            errors: [],
        }
    },
    mounted() {
            this.getUsers();
            this.getGroups();
            this.getGraduationUser();
            this.getGraduation();
            this.getTimeNorm();
        },
    computed: {
      graduationId() {
      return this.$route.params.graduationId
    },


    },

        methods: {
          getUsers() {
           
            axios.get('http://localhost:8000/api/user?role=2').then(res => {
                
                this.users = res.data
                this.isLoading = false
                
            });
          },
          getGraduationUser() {
            axios.get(`http://localhost:8000/api/user_graduation/${this.graduationId}`).then(res => {
              this.user_graduations = res.data
              this.isLoading = false
            })
          },

          getGroups() {
            axios.get(`http://localhost:8000/api/student_group?graduation=${this.graduationId}`).then(res => {
              this.groups = res.data
              this.isLoading = false
            })
          },
          getGraduation() {
          axios.get(`http://localhost:8000/api/graduation/${this.graduationId}/`).then(res => {
            console.log(res.data)
            console.log(this.graduationId)
            this.graduations = res.data
          })

},
          getTimeNorm() {
            axios.get(`http://localhost:8000/api/time_norm?graduation=${this.graduationId}`).then(res =>{
              this.time_norms = res.data
              console.log(this.time_norms)
            })
          },
          
          
          deleteUser(userId) {
           if(confirm('Вы уверены, что хотите удалить учетную запись?')) {
            axios.delete(`http://localhost:8000/api/user/${userId}`).then(res => {
                alert('Карта сотрудника удалена');
                location.reload();
                this.getCards();
            })
           }
          },
          setActive(index) {
            this.activeIndex = index
        },  
      
        openModalHours(index) {
this.form = { ...this.graduations[index] };
this.modalActiveHours = true;
},


        },
}
</script>

<style>

.table-grouped {
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.graduation-name {
  font-weight: 700;
  font-size: 20px;
  color: #707070;
  margin-bottom: 5px;
}

</style>