

<script setup>
import Delete from './icons/Delete.vue'
import Edit from './icons/Edit.vue'
import Add from './icons/Add.vue'
</script>

<template>
  <CustomAlert ref="alertComponent" />
  <CustomConfirm ref="confirmComponent" />
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
            <th @click="sortBy('id')">№
              <template v-if="sortKey === 'id' && sortDirection['id'] === 1">
                <i class="bi bi-caret-down-fill"></i>
              </template>
              <template v-if="sortKey === 'id' && sortDirection['id'] === -1">
                <i class="bi bi-caret-up-fill"></i>
              </template>
            </th>
            <th @click="sortBy('last_name')">Фамилия
              <template v-if="sortKey === 'last_name' && sortDirection['last_name'] === 1">
                <i class="bi bi-caret-down-fill"></i>
              </template>
              <template v-if="sortKey === 'last_name' && sortDirection['last_name'] === -1">
                <i class="bi bi-caret-up-fill"></i>
              </template>
            </th>
           <th @click="sortBy('first_name')">Имя
              <template v-if="sortKey === 'first_name' && sortDirection['first_name'] === 1">
                <i class="bi bi-caret-down-fill"></i>
              </template>
              <template v-if="sortKey === 'first_name' && sortDirection['first_name'] === -1">
                <i class="bi bi-caret-up-fill"></i>
              </template>

           </th>
            <th @click="sortBy('middle_name')">Отчество
              <template v-if="sortKey === 'middle_name' && sortDirection['middle_name'] === 1">
                <i class="bi bi-caret-down-fill"></i>
              </template>
              <template v-if="sortKey === 'middle_name' && sortDirection['middle_name'] === -1">
                <i class="bi bi-caret-up-fill"></i>
              </template>
            </th>
            <th>Должность</th>
            <th scope="col">Ученое звание</th>
            <th scope="col">Ученая степень</th>
            <th scope="col">Логин</th>
            <th scope="col">Пароль</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(user, index) in sortedTeachers" :key="index">
            <td > {{user.id}} </td>
            <td >{{user.first_name}}</td>
            <td >{{user.middle_name}}</td>
            <td >{{user.last_name}}</td>
            <td v-if="user.position">{{user.position.name}}</td>
            <td v-else></td>
            <td v-if="user.academic_title">{{user.academic_title.name}}</td>
            <td v-else></td>
            <td v-if="user.academic_degree">{{user.academic_degree.name}}</td>
            <td v-else></td>
            <td>{{user.username}}</td>
            <td> 
              <span v-if="!user.showPassword" @click="togglePassword(user)" style="cursor: pointer;">
              *********
            </span>
            <span v-else @click="togglePassword(user)">
              {{ user.password_text }}
            </span></td>
            <td>
                <Edit @click="openModalEdit(index)" />
              </td>
              <td>
                <Delete @click="deleteUser(user.id)" />
              </td>
          </tr>
        </tbody>
        <tbody v-if="sortedTeachers.length === 0"> 
          <tr>
            <td colspan="11" class="text-center fw-bold">
              Пока нет ни одного преподавателя
            </td>
          </tr>
        </tbody>
      </table>
      <div class="icon-add">
        <Add @click="openModal()" />
      </div>
    </div>
  </div>

 

  <div v-show="modalActive" >
    <div  @click="modalActive = false; this.errors=''" class="modal-wrapper" ></div>
     <div  class="modal-window modal-create-user">
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
      <div>
      <div class="form-wrapper">
        <div class="form-item">
          <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Фамилия</label>
          <input v-model="form.last_name" class="form-control form-modal" 
            placeholder="Введите фамилию" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Имя</label>
          <input v-model="form.first_name" class="form-control form-modal" 
            placeholder="Введите имя" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Отчество</label>
          <input v-model="form.middle_name" class="form-control form-modal" 
            placeholder="Введите отчество" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Логин</label>
          <input v-model="form.username" class="form-control form-modal" 
            placeholder="Введите логин" />
        </div>
      </div>
        <div class="form-item">
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4" >Должность</label>
            <select v-model="form.position"  class="form-select form-modal">
              
              <option v-for="position in positions" v-bind:value="position.id"  :key="position.id" :value="position.id">
                {{ position.name}}
              </option>
  
            </select>
          </div>
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4" >Ученое звание</label>
            <select v-model="form.academic_title" class="form-select form-modal">
              <option v-for="academic_title in academic_titles" :value="academic_title.id">{{ academic_title.name }}</option>
            </select>
          </div>
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4" >Ученая степень</label>
            <select v-model="form.academic_degree" class="form-select form-modal">
              <option v-for="academic_degree in academic_degrees" :value="academic_degree.id">{{ academic_degree.name }}</option>
            </select>
          </div>
         
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4">Пароль</label>
            <div class="input-group mb-3"><input v-model="form.password_text" class="form-control form-modal" 
              placeholder="Введите или сгенерируйте пароль" />
              <button class="btn btn-outline-secondary" @click="generatePassword">Сгенерировать пароль</button></div>
            
          </div>
        </div>
      </div>
        
       

       
   

        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3" >
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
      </template>

    
          <div class="btn-modal-wrapper">
            <button @click="submitForm" class="btn-modal">Добавить</button>
          </div>

          

        </div>
        
    
     </div>
 
    </div>

    
    <div v-show="modalActiveEdit" >
      <div  @click="modalActiveEdit = false; this.errors=''" class="modal-wrapper" ></div>
       <div  class="modal-window modal-create-user">
          <h4 class="modal-title py-3 fw-bold">Добавить</h4>
          <svg
          @click="modalActiveEdit = false; this.errors=''"
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
        <div>
        <div class="form-wrapper">
          <div class="form-item">
            <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4">Фамилия</label>
            <input v-model="form.last_name" class="form-control form-modal" 
              placeholder="Введите фамилию" />
          </div>
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4">Имя</label>
            <input v-model="form.first_name" class="form-control form-modal" 
              placeholder="Введите имя" />
          </div>
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4">Отчество</label>
            <input v-model="form.middle_name" class="form-control form-modal" 
              placeholder="Введите отчество" />
          </div>

          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4">Логин</label>
            <input v-model="form.username" class="form-control form-modal" 
              placeholder="Введите логин" />
          </div>
        </div>
          <div class="form-item">
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4" >Должность</label>
              <select v-model="form.position"  class="form-select form-modal">
                
                <option v-for="position in positions" v-bind:value="position.id"  :key="position.id" :value="position.id">
                  {{ position.name}}
                </option>
    
              </select>
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4" >Ученое звание</label>
              <select v-model="form.academic_title"  class="form-select form-modal">
                
                <option v-for="academic_title in academic_titles" v-bind:value="academic_title.id"  :key="academic_title.id" :value="academic_title.id">
                  {{academic_title.name}}
                </option>
    
              </select>
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4" >Ученая степень</label>
              <select v-model="form.academic_degree"  class="form-select form-modal">
                
                <option v-for="academic_degree in academic_degrees" v-bind:value="academic_degree.id"  :key="academic_degree.id" :value="academic_degree.id">
                  {{ academic_degree.name}}
                </option>
    
              </select>
            </div>
            
          
             <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Пароль</label>
              <div class="input-group mb-3">
                <input v-model="form.password_text" class="form-control form-modal" placeholder="Введите или сгенерируйте пароль" />
                <button class="btn btn-outline-secondary" @click="generatePassword">Сгенерировать пароль</button>
              </div>
            </div>
          </div>
        </div>
          
         
  
         
     
  
          <template v-if="errors.length > 0">
            <div class="alert alert-danger mt-3" >
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
        </template>
  
      
            <div class="btn-modal-wrapper">
              <button @click="updateForm" class="btn-modal">Обновить</button>
            </div>
  
            
  
          </div>
          
      
       </div>
   
      </div>
</div>
</div>
  </template>


  <script >
import axios from 'axios';
import CustomAlert from './CustomAlert.vue'
import CustomConfirm from './CustomConfirm.vue'

export default {
    name: 'teachers',
    
    data () {
        

        return {
          sortDirection: {
            id: 1,
            username: 1,
            first_name: 1,
            last_name: 1,
            middle_name: 1,
            position: 1,
            academic_title: 1,
            academic_degree: 1
          },
          sortKey: '',
            users: [],
           
            errors: [],
            isLoading: true,
            modalActive: false,
            modalActiveEdit: false,

            form: {
          first_name: '',
          last_name: '',
          middle_name: '',
          username: '',
          password: '',
          password_text: '',
          position: '',
          academic_title: '',
          academic_degree: '',
          role: 2,
          sortKey: '',
          
        },
        positions: [],
        academic_titles: [],
        academic_degrees: [],
            
        }
    },
    mounted() {
            this.getUsers();
            this.getPosition();
            this.getAcademicTitle();
            this.getAcademicDegree();
        },

        components: {
        CustomAlert,
        CustomConfirm
  },

  
  computed: {

sortedTeachers() {
return this.users.sort((a, b) => {
  const key = this.sortKey;
  const direction = this.sortDirection[key];
   


  const aValue = a[key];
  const bValue = b[key];

  if (aValue < bValue) return -1 * direction;
  if (aValue > bValue) return 1 * direction;
  return 0;
});
},
displayedPassword: {
      get() {
        return this.form.password_text;
      },
      set(value) {
        this.form.password_text = value;
        
      },
    },
  },

        methods: {

    

          confirmAction(message) {
      this.$refs.confirmComponent.show(message)
        .then((confirmed) => {
          if (confirmed) {
            // Выполняем действие
            console.log('Действие выполнено!');
          } else {
            console.log('Действие отменено!');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

       
          getUsers() {
           
            axios.get(`${API_URL}user_unsafe?role=2`).then(res => {
             
                this.users = res.data
                this.isLoading = false
               
            });
          },

          showAlert(message) {
      this.$refs.alertComponent.show(message);
    },

    

    openModal() {
      this.form = {
        first_name: '',
        last_name: '',
        middle_name: '',
        username: '',
        password_text: '',
        position: '',
        academic_title: '',
        academic_degree: '',
        role: 2,
        sortKey: '',
      };
      this.modalActive = true;
      
     
      
      
    },

    openModalEdit(index) {
    this.form = { ...this.users[index] };
    this.form.academic_title = this.users[index]?.academic_title?.id;
    this.form.academic_degree = this.users[index]?.academic_degree?.id;
    this.form.position = this.users[index]?.position?.id;
    this.form.role = this.users[index]?.role?.id;
    this.form.password_text = this.users[index]?.password_text;
   
    this.modalActiveEdit = true;
  },



  async submitForm() {
  this.errors = [];

  if (this.form.first_name === undefined || this.form.first_name.trim() === '') {
    this.errors.push(ERRORS.first_name);
  }

  if (this.form.last_name === undefined || this.form.last_name.trim() === '') {
    this.errors.push(ERRORS.last_name);
  }

  if (this.form.middle_name === undefined || this.form.middle_name.trim() === '') {
    this.errors.push(ERRORS.middle_name);
  }

  if (this.form.username === undefined || this.form.username.trim() === '') {
    this.errors.push(ERRORS.login);
  }

  if (this.form.password_text === undefined || this.form.password_text.trim() === '') {
    this.errors.push(ERRORS.password);
  } else {
    this.form.password = this.form.password_text;
  }

  if (this.errors.length === 0) {
    await axios
      .post(`${API_URL}user_unsafe/`, this.form)
      .then(response => {
        this.getUsers();
        this.showAlert("Преподаватель добавлен");
        this.modalActive = false;
      })
      .catch(error => {
        Object.keys(error.response.data).forEach(field => {
          error.response.data[field].forEach(errorMessage => {
            this.errors.push(`${field}: ${errorMessage}`);
          });
        });
      });
  }
},

    async updateForm() {
  this.errors = [];

  if (this.form.first_name === undefined || this.form.first_name.trim() === '') {
    this.errors.push(ERRORS.first_name);
  }

  if (this.form.last_name === undefined || this.form.last_name.trim() === '') {
    this.errors.push(ERRORS.last_name);
  }

  if (this.form.middle_name === undefined || this.form.middle_name.trim() === '') {
    this.errors.push(ERRORS.middle_name);
  }

  if (this.form.username === undefined || this.form.username.trim() === '') {
    this.errors.push(ERRORS.login);
  }

  if (this.form.password_text === undefined || this.form.password_text.trim() === '') {
    this.errors.push(ERRORS.password);
  } else {
    this.form.password = this.form.password_text;
  }

  if (this.errors.length === 0) {
    await axios
      .patch(`${API_URL}user_unsafe/${this.form.id}/`, this.form)
      .then(response => {
        this.getUsers();
        this.showAlert("Преподаватель обновлен");
        this.modalActiveEdit = false;
      })
      .catch(error => {
        Object.keys(error.response.data).forEach(field => {
          error.response.data[field].forEach(errorMessage => {
            this.errors.push(`${field}: ${errorMessage}`);
          });
        });
      });
  }
},

          getPosition() {
            axios.get(`${API_URL}position/`).then(res => {
                this.positions = res.data

            })
          },
           

          sortBy(key) {
          if (this.sortKey === key) {
            this.sortDirection[key] *= -1;
          } else {
            this.sortKey = key;
            this.sortDirection[key] = 1;
          }
          
        },

      getAcademicTitle() {
        axios.get(`${API_URL}academic_title/`).then(response => {
            this.academic_titles = response.data
        })
      },

      getAcademicDegree() {
          axios.get(`${API_URL}academic_degree/`).then(response => {
              this.academic_degrees = response.data
          })

      },
      generatePassword() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&()';
      let generatedPassword = '';

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        generatedPassword += chars[randomIndex];
      }

      this.form.password = generatedPassword; 
      this.form.password_text = generatedPassword; 
    },

    togglePassword(user) {
      user.showPassword = !user.showPassword;
    },

    deleteUser(userId) {
    this.$refs.confirmComponent.show("Вы уверены что хотите удалить учетную запись?")
      .then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}user/${userId}/`)
            .then(res => {
              this.showAlert("Учетная запись удалена");
              this.getUsers()
            })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
        },
}
</script>

  
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
    margin-bottom: 0 !important;
}



.form-wrapper {
  display: flex;
}

.form-item {
  margin: 12px;
}

@media (max-width: 950px) {
  

  .form-wrapper {
   
  }
}
  </style>
  