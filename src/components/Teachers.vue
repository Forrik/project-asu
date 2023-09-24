<script >
import axios from 'axios';

export default {
    name: 'teachers',
    
    data () {
        

        return {
            users: [],
            errors: [],
            isLoading: true,
            modalActiveEdit: false,
            modalActive: false,
            form: {
          username: '',
          password: '',
          position: '',
          studentGroup: '',
          educationBase: '',
          academicTitle: '',
          academicDegree: '',
          eduLevel: '',
          vkrHours: '',
          teacher_groups: '',
        },
            
        }
    },
    mounted() {
            this.getUsers();
            this.getPosition();
        },

        methods: {
          getUsers() {
           
            axios.get('http://localhost:8000/api/user?role=2').then(res => {
              console.log(this.users)
                this.users = res.data
                this.isLoading = false
               
            });
          },

          createUser() {
            axios.post('http://localhost:8000/api/user/', {
              username: this.form.username,
              password: this.form.password,
              position: this.form.position,
              studentGroup: this.form.studentGroup,
              educationBase: this.form.educationBase,
              academicTitle: this.form.academicTitle,
              academicDegree: this.form.academicDegree,
              eduLevel: this.form.eduLevel,
              vkrHours: this.form.vkrHours,
              teacher_groups: this.form.teacher_groups,
            }).then(res => {
                alert('Карта сотрудника добавлена');
            })
            
          },

          async submitForm() {
        this.errors = []

        if (this.form.code === undefined) {
            this.errors.push('Вы не ввели код')
        }

        if (this.form.name === undefined ) {
            this.errors.push('Вы не ввели наименование')
        }

        if (this.form.abbreviation === undefined || this.form.abbreviation.trim === '') {
            this.errors.push('Вы не ввели аббревиатуру')
        }

        if (this.form.edulevel === undefined) {
            this.errors.push('Вы не ввели уровень образования')
        }

        if (this.errors.length === 0) {
            await axios
                .post('http://localhost:8000/api/speciality/', this.form)
                .then(response => {
                    this.getSpecialities()
                    alert("Специальность добавлена")
                    this.modalActive = false
                })
        }
    },

          getPosition() {

            axios.get('http://localhost:8000/api/position/').then(res => {
                this.position = res.data

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
          }  
        },
}
</script>

<script setup>
import Delete from './icons/Delete.vue'
import Edit from './icons/Edit.vue'
import Add from './icons/Add.vue'
</script>

<template>
  
<div class="row">
    <div class="col-3"></div>
  <div class="col-8 content">
  <div class="card">
    <div class="table-responsive">
      <div v-if="isLoading" >
        <p class="text-center mt-5 mb-2"><h4>Подождите...</h4></p>
        <span class="loader"></span>
      </div>
    <table v-else class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Фамилия</th>
            <th scope="col">Имя</th>
            <th scope="col">Отчество</th>
            <th scope="col">Должность</th>
            <th scope="col">Ученое звание</th>
            <th scope="col">Ученая степень</th>
            <th scope="col">Логин</th>
            <th scope="col">Пароль</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(user, index) in this.users" :key="index">
            <td > {{user.id}} </td>
            <td >{{user.first_name}}</td>
            <td >{{user.middle_name}}</td>
            <td >{{user.last_name}}</td>
            <td v-if="user.position">{{user.position.name}}</td>
            <td v-else></td>
            <td v-if="user.academicTitle">{{user.academicTitle.name}}</td>
            <td v-else></td>
            <td v-if="user.academicDegree">{{user.academicDegree.name}}</td>
            <td v-else></td>
            <td>{{user.username}}</td>
            <td>Пароль</td>
            <td>
                <Edit />
              </td>
              <td>
                <Delete @click="deleteUser(user.id)" />
              </td>
          </tr>
        </tbody>
      </table>
      <div class="icon-add">
        <Add @click="modalActive = !modalActive" />
      </div>
    </div>
  </div>

  <!-- <div v-show="modalActiveEdit">
    <div   @click="modalActiveEdit = false;this.errors=''" class="modal-wrapper" >   </div>
     <div  class="modal-window">
        <h4 class="modal-title py-3 fw-bold">Редактировать</h4>
        <svg
        @click="modalActiveEdit = false;this.errors=''"
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
      <form v-on:submit.prevent="updateSpeciality">
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Код</label>
          
          <input v-model="form.code" class="form-control form-modal" placeholder="Введите код специальности" v-mask="'##.##.##'" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4" >Наименование</label>
          <input v-model="form.name" class="form-control form-modal" 
            placeholder="Введите наименование "  minlength="6" maxlength="100" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4" >Аббревиатура</label>
          <input v-model="form.abbreviation" class="form-control form-modal" 
            placeholder="Введите аббревиатуру " minlength="2" maxlength="10" />
        </div>
        <select v-model="form.edulevel"  class="form-select form-modal">
         
          <option v-for="edulevel in edulevels" v-bind:value="edulevel.id"  :key="edulevel.id" :value="edulevel.id">
            {{ edulevel.name}}
          </option>

        </select>

        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3" >
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
      </template>

    
          <div class="btn-modal-wrapper">
            <button class="btn-modal">Обновить</button>
          </div>

          

        </form>
        
    
     </div>
 
    </div> -->

  <div v-show="modalActive" >
    <div  @click="modalActive = false; this.errors=''" class="modal-wrapper" >   </div>
     <div  class="modal-window">
        <h4 class="modal-title py-3 fw-bold">Добавить</h4>
        <svg
        @click="modalActive = false; this.errors=''"
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
          <label class="form-label fw-bold ms-4">Код</label>
          
          <input v-model="form.code" class="form-control form-modal" 
            placeholder="Введите код специальности"  v-mask="'##.##.##'" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4" >Наименование</label>
          <input v-model="form.name" class="form-control form-modal" 
            placeholder="Введите наименование"  minlength="6" maxlength="100" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4" >Аббревиатура</label>
          <input v-model="form.abbreviation" minlength="2" maxlength="10" class="form-control form-modal" 
            placeholder="Введите аббревиатуру" />
        </div>

  
       
        <select v-model="form.edulevel"  class="form-select form-modal">
       
          <option v-for="edulevel in edulevels" v-bind:value="edulevel.id"  :key="edulevel.id" :value="edulevel.id">
            {{ edulevel.name}}
          </option>

        </select>
   

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
</div>
  </template>


  
  <style>

  .loader {
    width: 38px;
    height: 38px;
    display: block;
    margin: 15px auto 0;
    position: relative;
    border: 3px solid #695CFE;
    border-radius: 50%;
    box-sizing: border-box;
    animation: animloader 2s linear infinite;
  }
  .loader::after {
    content: '';  
    box-sizing: border-box;
    width: 6px;
    height: 24px;
    background: #695CFE;
    transform: rotate(-45deg);
    position: absolute;
    bottom: -20px;
    left: 34px;
  }
  
  @keyframes animloader {
    0% {
      transform: translate(-10px, -10px);
    }
    25% {
      transform: translate(-10px, 10px);
    }
    50% {
      transform: translate(10px, 10px);
    }
    75% {
      transform: translate(10px, -10px);
    }
    100% {
      transform: translate(-10px, -10px);
    }
  }   


table {
    text-align: center;
}

@media (max-width: 1200px) {

    }
  </style>
  