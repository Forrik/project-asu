<script setup>
import Delete from './icons/Delete.vue'
import Edit from './icons/Edit.vue'
import Next from './icons/Next.vue'
import Add from './icons/Add.vue'

</script>

<template>
    <div>
        <div class="row" >
        
            <CustomAlert ref="alertComponent" />
            <CustomConfirm ref="confirmComponent" />
    
         
            <div class="col-3"></div>
            <div class="col-8 content">
                <div >
                  <div v-if="showGroupItem ">
                    <button @click="this.showGroupItem = false; this.showTable = true;
                    " class="btn btn-primary">Назад</button></div>
                  <div class="graduation-name">Выпуск: {{graduations.year}}, {{graduations.graduation_type}}</div> 
                
                </div>
                

                 <div >
                  
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
                                <td> {{ group.group_name }}</td>
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
                                <div  v-else-if="counter === `hours`" >
                                <table class="table table-bordered table-hover">
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
                                      <tbody v-for="(user_graduation, index) in user_graduations" :key="index">
                                        <tr>
                                          <td> {{user_graduation.vkr_hours.id}} </td>
                                          <td >{{user_graduation.first_name}} {{user_graduation.middle_name}} {{user_graduation.last_name}}</td>
                                          <td>{{user_graduation.vkr_hours.hours}}</td>
                                          <td>{{user_graduation.vkr_hours.hours - user_graduation.hours_sum}}</td>
                                          <td><Edit @click="openModalEditHours(index)" /></td>  
                                          <td><Delete @click="deleteVkrHours(user_graduation.vkr_hours.id)" /></td>
                                        </tr>
                                      
                                      </tbody>
                                      
                                    
                                      <tbody v-if="user_graduations.length === 0"> <tr><td colspan="6"> Часы начнут отображаться после того, как преподаватель примет заявку</td></tr></tbody>
                                </table>
                                <div class="icon-add">
                                  <Add @click="openModalAddHours" />
                                </div>
                              </div>
                           <div v-if="showTable && counter === 'groups'">
                              <table   class="table table-bordered table-hover">
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
                                   <td>{{group.speciality.abbreviation}}-{{group.course}}{{group.number}}</td>
                                   <td>{{group.speciality.name}}</td>
                                   <td>{{group.speciality.education_level.name}}</td>
                                   <td>{{group.course}}</td>
                                   <td>{{group.number}}</td>
                                   <td>{{group.education_form.name}}</td>
                                   <td><Edit @click="openModalEditGroups(index)" /></td> 
                                   <td> <Delete @click="deleteGroup(group.id)" /> </td>
                                   <td>
                                      <Next @next-clicked="handleNextClick" :group="parseInt(group.id)"  />
                                  </td>
                                    </tr>
                                  </tbody>
                                
                                  <tbody v-if="groups.length === 0"> <tr><td colspan="9"> Нет данных</td></tr></tbody>
                                  
                              
            
                            </table>
                            <div class="icon-add">
                              <Add @click="openModalAddGroups" />
                            </div>
                           
                            </div>
                        <GroupItem v-if="showGroupItem" :groupId="selectedGroupId" />
                            
                              <div  v-else-if="counter === `timeNorm`">
                                <table  class="table table-bordered table-hover">
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
                                          <td>{{ time_norm.speciality ? time_norm.speciality.code : "" }} {{ time_norm.speciality ? time_norm.speciality.name : "" }}</td>
                                          <td>{{time_norm.consultancy_type.name}}</td>
                                          <td >{{time_norm.hours}}</td>
                                          <td><Edit @click="editTimeNorm(index)"/></td> 
                                          <td> <Delete @click="deleteTimeNorm(time_norm.id)" /> </td>
                                        </tr>
                                      </tbody>
                                      <tbody v-if="time_norms.length === 0"> <tr><td colspan="6"> Нет данных</td></tr></tbody>
                                    
                                </table>
                                <div class="icon-add">
                                  <Add @click="openModalAddTimeNorm" />
                                </div>
                              </div>
                      </div>
                      </div>
                   
                    
                      
                  </div>
                  
        </div>
        
        </div>
        

        <div v-show="openModalTimeNorm" >         
          <div  @click="openModalTimeNorm = false; this.errors=''" class="modal-wrapper" />
           <div  class="modal-window">
              <h4 class="modal-title py-3 fw-bold">Добавить</h4>
              <svg
              @click="openModalTimeNorm = false; this.errors=''"
              class="icon-close"
              xmlns="http://www.w3.org/2000/svg"
              height="35"
              viewBox="0 0 16 16"
              width="35">
              <polygon
                fill-rule="evenodd"
                points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
              />
            </svg>
            <div >
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4">Специальность</label>
                
                <select v-model="form.speciality"  class="form-select form-modal">
                  <option v-for="speciality in specialities" v-bind:key="speciality.id" :value="speciality.id">{{ speciality.code }} {{ speciality.name }}</option>
                </select>
              </div>
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4" >Вид консультации</label>
                <select v-model="form.consultancy_type" class="form-select form-modal" >
                  <option v-for="consultancy_type in consultancy_types" v-bind:key="consultancy_type.id" :value="consultancy_type.id">{{ consultancy_type.name }}</option>
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
                  <button @click="addTimeNorm" class="btn-modal">Добавить</button>
                </div>
               </div>
           </div>
          </div>

        <div v-show="openModalEditTimeNorm" >         
          <div  @click="openModalEditTimeNorm = false; this.errors=''" class="modal-wrapper" />
           <div  class="modal-window">
              <h4 class="modal-title py-3 fw-bold">Редактировать</h4>
              <svg
              @click="openModalEditTimeNorm = false; this.errors=''"
              class="icon-close"
              xmlns="http://www.w3.org/2000/svg"
              height="35"
              viewBox="0 0 16 16"
              width="35">
              <polygon
                fill-rule="evenodd"
                points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
              />
            </svg>
            <div >
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4">Специальность</label>
                
                <select v-model="form.speciality"  class="form-select form-modal">
                  <option v-for="speciality in specialities" v-bind:key="speciality.id" :value="speciality.id">{{ speciality.code }} {{ speciality.name }}</option>
                </select>
              </div>
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4" >Вид консультации</label>
                <select v-model="form.consultancy_type" class="form-select form-modal" >
                  <option v-for="consultancy_type in consultancy_types" v-bind:key="consultancy_type.id" :value="consultancy_type.id">{{ consultancy_type.name }}</option>
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
                  <button @click="editNormTime" class="btn-modal">Редактировать</button>
                </div>
               </div>
           </div>
          </div>

          <div v-show="openModalHours">
            <div @click="closeModal" class="modal-wrapper"></div>
            <div class="modal-window">
              <h4 class="modal-title py-3 fw-bold">{{ modalTitle }}</h4>
              <svg @click="closeModal" class="icon-close" xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 0 16 16" width="35">
                <polygon fill-rule="evenodd" points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414" />
              </svg>
              <div>
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4">Преподаватель</label>
                  <select v-model="form.teacher" class="form-select form-modal">
                    <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.first_name }} {{ teacher.middle_name }} {{ teacher.last_name }}</option>
                  </select>
                </div>
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4">Количество часов</label>
                  <input v-model="form.hours" class="form-control form-modal" placeholder="Введите количество часов" />
                </div>
                <template v-if="errors.length > 0">
                  <div class="alert alert-danger mt-3">
                    <p v-for="error in errors" :key="error">{{ error }}</p>
                  </div>
                </template>
                <div class="btn-modal-wrapper">
                  <button @click="submitForm" class="btn-modal">{{ actionButtonText }}</button>
                </div>
              </div>
            </div>
          </div>

          


          

          <div v-show="modalAddGroups" >         
            <div  @click="modalAddGroups = false; this.errors=''" class="modal-wrapper" />
             <div  class="modal-window">
                <h4 class="modal-title py-3 fw-bold">Добавить</h4>
                <svg
                @click="modalAddGroups = false; this.errors=''"
                class="icon-close"
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 0 16 16"
                width="35">
                <polygon
                  fill-rule="evenodd"
                  points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
                />
              </svg>
              <div >
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4">Специальность</label>
                  
                  <select v-model="form.speciality"  class="form-select form-modal">
                    <option v-for="speciality in specialities" v-bind:key="speciality.id" :value="speciality.id">{{ speciality.code }} {{ speciality.name }}</option>
                  </select>
                </div>
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4" >Форма обучения</label>
                  <select v-model="form.education_form" class="form-select form-modal" >
                    <option v-for="education_form in education_forms" v-bind:key="education_form.id" :value="education_form.id">{{ education_form.name }}</option>
                  </select>
                </div>
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4" >Курс</label>
                  <input v-model="form.course" class="form-control form-modal" 
                    placeholder="Введите курс" />
                </div>
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4" >Номер группы</label>
                  <input v-model="form.number" class="form-control form-modal" 
                    placeholder="Введите номер группы" />
                </div>
           
       
                <template v-if="errors.length > 0">
                  <div class="alert alert-danger mt-3" >
                      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                  </div>
              </template>
  
            
                  <div class="btn-modal-wrapper">
                    <button @click="addGroup" class="btn-modal">Добавить</button>
                  </div>
                 </div>
             </div>
            </div>


          <div v-show="openModalEditGroup" >         
            <div  @click="openModalEditGroup = false; this.errors=''" class="modal-wrapper" />
             <div  class="modal-window">
                <h4 class="modal-title py-3 fw-bold">Редактировать</h4>
                <svg
                @click="openModalEditGroup = false; this.errors=''"
                class="icon-close"
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 0 16 16"
                width="35">
                <polygon
                  fill-rule="evenodd"
                  points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
                />
              </svg>
              <div >
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4">Специальность</label>
                  
                  <select v-model="form.speciality"  class="form-select form-modal">
                    <option v-for="speciality in specialities" v-bind:key="speciality.id" :value="speciality.id">{{ speciality.code }} {{ speciality.name }}</option>
                  </select>
                </div>
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4" >Форма обучения</label>
                  <select v-model="form.education_form" class="form-select form-modal" >
                    <option v-for="education_form in education_forms" v-bind:key="education_form.id" :value="education_form.id">{{ education_form.name }}</option>
                  </select>
                </div>
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4" >Курс</label>
                  <input v-model="form.course" class="form-control form-modal" 
                    placeholder="Введите курс" />
                </div>
                <div class="form-outline mb-3">
                  <label class="form-label fw-bold ms-4" >Номер группы</label>
                  <input v-model="form.number" class="form-control form-modal" 
                    placeholder="Введите номер группы" />
                </div>
           
       
                <template v-if="errors.length > 0">
                  <div class="alert alert-danger mt-3" >
                      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                  </div>
              </template>
  
            
                  <div class="btn-modal-wrapper">
                    <button @click="editGroup" class="btn-modal">Редактировать</button>
                  </div>
                 </div>
             </div>
            </div>
        

         
 
        
    </div>
    

       
</template>

<script >
import axios from 'axios';
import GroupItem from './GroupItem.vue';
import CustomAlert from './CustomAlert.vue'
import CustomConfirm from './CustomConfirm.vue'

export default {
    name: 'GraduationItem',
    
    data () {
        

        return {
            
            counter: 'summary',
            activeIndex: 0,
            teachers: [],
            isLoading: true,
            groups: [],
            user_graduations: [],
            graduations: [],
            time_norms: [],
            showGroupItem: false,
            showTable: true,
            openModalTimeNorm: false,
            openModalEditTimeNorm: false,
            openModalHours: false,
            editingMode: false,
            vkr_hours: [],
            selectedGroupId: null,
            form: {
                teacher: '',
                hours: '',
                speciality: '',
                course: '',
                number: '',
                education_form: '',
                graduation: this.graduationId,

            },
            errors: [],
        }
    },
    mounted() {
            this.getTeachers();
            this.getGroups();
            this.getGraduationUser();
            this.getGraduation();
            this.getTimeNorm();
            this.getSpecialities();
            this.getEduForm();
            this.getVkrHours();
            this.getConsultants()
            
            
        },
    computed: {
      graduationId() {
      return this.$route.params.graduationId
    },
    modalTitle() {
      return this.form.id ? "Редактировать" : "Добавить";
    },
    actionButtonText() {
      return this.form.id ? "Сохранить" : "Добавить";
    }
  },
    components: {
      GroupItem,
      CustomAlert,
      CustomConfirm,
    },


    

        methods: {
          closeModal() {
      this.openModalHours = false;

      this.errors = [];
    },
          confirmAction(message) {
      this.$refs.confirmComponent.show(message)
        .then((confirmed) => {
          if (confirmed) {
          
           
          } else {
            
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    
    showAlert(message) {
      this.$refs.alertComponent.show(message);
    },

          async addTimeNorm() {
  this.errors = [];

  if (this.form.speciality === undefined || this.form.speciality === "") {
    this.errors.push('Вы не ввели специальность');
  }

  if (this.form.consultancy_type === undefined || this.form.consultancy_type === "") {
    this.errors.push('Вы не ввели вид консультации');
  }

  if (this.form.hours === undefined || this.form.hours.trim() === "") {
    this.errors.push('Вы не ввели количество часов');
  }

  this.form.graduation = this.graduationId;
  if (this.errors.length === 0) {
    await axios
      .post(`${API_URL}time_norm/`, this.form)
      .then(response => {
        this.openModalTimeNorm = false;
        this.showAlert("Норма времени добавлена")
        this.getTimeNorm();
      }).catch(error => {
        this.errors.push(error.response.data.error);
      });

  }
},

  async editNormTime(){
    this.errors = [];

if (this.form.speciality === undefined || this.form.speciality === "") {
  this.errors.push('Вы не ввели специальность');
}

if (this.form.consultancy_type === undefined || this.form.consultancy_type === "") {
  this.errors.push('Вы не ввели вид консультации');
}

if (this.form.hours === undefined || this.form.hours.trim() === "") {
  this.errors.push('Вы не ввели количество часов');
}

this.form.graduation = this.graduationId;
if (this.errors.length === 0) {
  await axios
    .patch(`${API_URL}time_norm/${this.form.id}/`, this.form)
    .then(response => {
      this.openModalEditTimeNorm = false;
      this.getTimeNorm();
      this.showAlert("Норма времени обновлена")
    }).catch(error => {
      Object.keys(error.response.data).forEach(field => {
        error.response.data[field].forEach(errorMessage => {
            this.errors.push(`${field}: ${errorMessage}`);
        });
      });
    });
}
  },
  async addGroup(){
    this.errors = [];

    if (this.form.speciality === undefined || this.form.speciality === "") {
  this.errors.push('Вы не ввели специальность');
}

if (this.form.education_form === undefined || this.form.education_form === "") {
  this.errors.push('Вы не ввели форму обучения');
}

if (this.form.course === undefined || this.form.course === "") {
  this.errors.push('Вы не ввели курс');
}

if (this.form.number === undefined || this.form.number === "") {
  this.errors.push('Вы не ввели номер группы');
}

this.form.graduation = this.graduationId;
if (this.errors.length === 0) {
  await axios
    .post(`${API_URL}student_group/`, this.form)
    .then(response => {
      this.modalAddGroups = false;
      this.getGroups();
      this.showAlert("Норма времени обновлена")
    }).catch(error => {
      this.errors.push(error.response.data.error);
    })
}

  },
  async editGroup(){
    this.errors = [];

    if (this.form.speciality === undefined || this.form.speciality === "") {
  this.errors.push('Вы не ввели специальность');
}

if (this.form.education_form === undefined || this.form.education_form === "") {
  this.errors.push('Вы не ввели форму обучения');
}

if (this.form.course === undefined || this.form.course === "") {
  this.errors.push('Вы не ввели курс');
}

if (this.form.number === undefined || this.form.number === "") {
  this.errors.push('Вы не ввели номер группы');
}

this.form.graduation = this.graduationId;
if (this.errors.length === 0) {
  await axios
    .patch(`${API_URL}student_group/${this.form.id}/`, this.form)
    .then(response => {
      this.openModalEditGroup = false;
      this.getGroups();
      this.showAlert("Норма времени обновлена")
    }).catch(error => {
      this.errors.push(error.response.data.error);
    })
}

  },
async submitForm() {
  this.errors = [];

  if (!this.form.teacher) {
    this.errors.push(ERRORS.teacher);
  }

  if (!this.form.hours) {
    this.errors.push(ERRORS.hours);
  }

  this.form.year = this.graduations.year;

  if (this.errors.length === 0) {
    try {
      if (this.editingMode) {
        // Режим редактирования
        await axios.patch(`${API_URL}vkr_hours/${this.form.id}/`, this.form);
      } else {
        // Режим добавления
        await axios.post(`${API_URL}vkr_hours/`, this.form);
      }

      this.closeModal();
      this.showAlert("Часы преподавателя " + (this.editingMode ? "отредактированы" : "добавлены"));
      this.getGraduationUser();
    } catch (error) {
      this.errors.push(error.response.data.error);
    }
  }
},
    


handleNextClick(group) {
    this.selectedGroupId = group;
    this.showGroupItem = true;
    this.showTable = false;
  },
          toggleViews() {
    this.showGroupItem = !this.showGroupItem;
    this.showTable = !this.showTable;
  },

          getTeachers() {
          
            axios.get(`${API_URL}user?role=2`).then(res => {
                
                this.teachers = res.data
                this.isLoading = false
                
            });
          },
          getGraduationUser() {
            axios.get(`${API_URL}user_graduation/${this.graduationId}`).then(res => {
              this.user_graduations = res.data
              this.isLoading = false
            })
          },
          
          getVkrHours() {
            axios.get(`${API_URL}vkr_hours/`).then(res => {
              this.vkr_hours = res.data

              
            })
          },

          getConsultants() {
            axios.get(`${API_URL}consultancy_type/`).then(res => {
              this.consultancy_types = res.data
              this.isLoading = false
            })
          },

          getGroups() {
            axios.get(`${API_URL}student_group?graduation=${this.graduationId}`).then(res => {
              this.groups = res.data
              this.isLoading = false
            })
          },
          getGraduation() {
          axios.get(`${API_URL}graduation/${this.graduationId}/`).then(res => {

            this.graduations = res.data
          })

},
          getEduForm(){
            axios.get(`${API_URL}edu_form/`).then(res =>{
              this.education_forms = res.data

            })
          },
          getTimeNorm() {
            axios.get(`${API_URL}time_norm?graduation=${this.graduationId}`).then(res =>{
              this.time_norms = res.data
             
            })
          },

          getSpecialities() {
            axios.get(`${API_URL}speciality/`).then(res => {
              this.specialities = res.data
            })
          },
          
       
          
          deleteUser(userId) {
            this.$refs.confirmComponent.show("Вы уверены что хотите удалить учетную запись?").then((confirmed) => {
              if (confirmed) {
                axios.delete(`${API_URL}user/${userId}`).then(res => {
                  this.showAlert("Учетная запись удалена");
                  this.getUsers();

                })
              }
            })
          },

          

          deleteTimeNorm(timeNormId) {
            this.$refs.confirmComponent.show('Вы уверены, что хотите удалить норму?').then((confirmed) => {
              if (confirmed) {
                axios.delete(`${API_URL}time_norm/${timeNormId}`).then(res => {
                  this.showAlert('Норма удалена');
                
                    this.getTimeNorm();
                })
              }
            })
          },
          

          deleteVkrHours(vkrHoursId) {
            this.$refs.confirmComponent.show('Вы уверены, что хотите удалить часы на ВКР? (убедитесь, что у преподавателя нет принятых заявок)').then((confirmed) => {
              if (confirmed) {
                axios.delete(`${API_URL}vkr_hours/${vkrHoursId}`).then(res => {
                  this.showAlert('Часы удалены');
                
                    this.getVkrHours();
                })
              }
            })
          },
          deleteGroup(groupId) {
            this.$refs.confirmComponent.show('Вы уверены, что хотите удалить группу?').then((confirmed) => {
              if (confirmed) {
                axios.delete(`${API_URL}student_group/${groupId}`).then(res => {
                  this.showAlert('Группа удалена');
                   
                    this.getGroups();
                })
              }
            })
          },
          setActive(index) {
            this.activeIndex = index
        },  

        openModalAddTimeNorm(index) {
          this.form={
            speciality: '',
            consultancy_type: '',
            hours: '',
            graduation: this.graduationId,
          }
          
          this.openModalTimeNorm = true;
        },

        openModalAddGroups(index) {
          this.form={
            speciality: '',
            course: '',
            number: '',
            education_form: '',
            graduation: this.graduationId,
          }
          
          this.modalAddGroups = true;
        },

        openModalAddHours(index) {
  this.form = {
    teacher: "",
    hours: "",

    graduation: this.graduationId,
  };
  this.openModalHours = true;
  this.editingMode = false; // В режиме добавления
},
openModalEditHours(index) {
  this.form = {
    teacher: this.user_graduations[index]?.id,
    hours: this.user_graduations[index]?.vkr_hours?.hours,
    graduation: this.graduationId,
    id: this.user_graduations[index]?.vkr_hours?.id,
  };
  this.openModalHours = true;
  this.editingMode = true; // В режиме редактирования
},

openModalEditGroups(index) {
  this.form = {
    id: this.groups[index]?.id,
    speciality: this.groups[index]?.speciality?.id,
    course: this.groups[index]?.course,
    number: this.groups[index]?.number,
    education_form: this.groups[index]?.education_form?.id,
    graduation: this.graduationId,
  }
  this.openModalEditGroup = true;
},
editTimeNorm(index) {
  this.form = {
    id: this.time_norms[index]?.id,
    speciality: this.time_norms[index]?.speciality?.id,
    consultancy_type: this.time_norms[index]?.consultancy_type?.id,
    hours: this.time_norms[index]?.hours,
    graduation: this.graduationId,
  };
 
  this.openModalEditTimeNorm = true;
}
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