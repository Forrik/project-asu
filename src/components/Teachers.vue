

<script setup>
import Delete from './icons/Delete.vue'
import Edit from './icons/Edit.vue'
import Add from './icons/Add.vue'
</script>

<template>
  
<div class="row">
    <div class="col-3"></div>
  <div class="col-8 content">
    <CustomAlert ref="alertComponent" />
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
            <td v-if="user.academicTitle">{{user.academicTitle.name}}</td>
            <td v-else></td>
            <td v-if="user.academicDegree">{{user.academicDegree.name}}</td>
            <td v-else></td>
            <td>{{user.username}}</td>
            <td>*******</td>
            <td>
                <Edit @click="openModalEdit(index)" />
              </td>
              <td>
                <Delete @click="deleteUser(user.id)" />
              </td>
          </tr>
        </tbody>
      </table>
      <div class="icon-add">
        <Add @click="openModal()" />
      </div>
    </div>
  </div>

 <div>
  <CustomConfirm ref="confirmComponent" />
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
          <label class="form-label fw-bold ms-4" >Должность</label>
          <select v-model="form.position"  class="form-select form-modal">
            
            <option v-for="position in positions" v-bind:value="position.id"  :key="position.id" :value="position.id">
              {{ position.name}}
            </option>

          </select>
        </div>
      </div>
        <div class="form-item">
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4" >Ученое звание</label>
            <select v-model="form.academicTitle"  class="form-select form-modal">
              
              <option v-for="academicTitle in academicTitles" v-bind:value="academicTitle.id"  :key="academicTitle.id" :value="academicTitle.id">
                {{academicTitle.name}}
              </option>
  
            </select>
          </div>
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4" >Ученая степень</label>
            <select v-model="form.academicDegree"  class="form-select form-modal">
              
              <option v-for="academicDegree in academicDegrees" v-bind:value="academicDegree.id"  :key="academicDegree.id" :value="academicDegree.id">
                {{ academicDegree.name}}
              </option>
  
            </select>
          </div>
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4">Логин</label>
            <input v-model="form.username" class="form-control form-modal" 
              placeholder="Введите логин" />
          </div>
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4">Пароль</label>
            <div class="input-group mb-3"><input v-model="form.password" class="form-control form-modal" 
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
            <label class="form-label fw-bold ms-4" >Должность</label>
            <select v-model="form.position"  class="form-select form-modal">
              
              <option v-for="position in positions" v-bind:value="position.id"  :key="position.id" :value="position.id">
                {{ position.name}}
              </option>
  
            </select>
          </div>
        </div>
          <div class="form-item">
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4" >Ученое звание</label>
              <select v-model="form.academicTitle"  class="form-select form-modal">
                
                <option v-for="academicTitle in academicTitles" v-bind:value="academicTitle.id"  :key="academicTitle.id" :value="academicTitle.id">
                  {{academicTitle.name}}
                </option>
    
              </select>
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4" >Ученая степень</label>
              <select v-model="form.academicDegree"  class="form-select form-modal">
                
                <option v-for="academicDegree in academicDegrees" v-bind:value="academicDegree.id"  :key="academicDegree.id" :value="academicDegree.id">
                  {{ academicDegree.name}}
                </option>
    
              </select>
            </div>
            
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Логин</label>
              <input v-model="form.username" class="form-control form-modal" 
                placeholder="Введите логин" />
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Пароль</label>
              <div class="input-group mb-3"><input v-model="form.password" class="form-control form-modal" 
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
            academicTitle: 1,
            academicDegree: 1
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
          position: '',
          academicTitle: '',
          academicDegree: '',
          role: 2,
          sortKey: '',
        },
            
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
    console.log(typeof(a))


  const aValue = a[key];
  const bValue = b[key];

  if (aValue < bValue) return -1 * direction;
  if (aValue > bValue) return 1 * direction;
  return 0;
});
}
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
           
            axios.get('http://localhost:8000/api/user?role=2').then(res => {
              console.log(this.users)
                this.users = res.data
                this.isLoading = false
               
            });
          },

          showAlert(message) {
      this.$refs.alertComponent.show(message);
    },

    

    openModal() {
      this.form = '';
      this.modalActive = true;

    },

    openModalEdit(index) {
    this.form = { ...this.users[index] };
    this.form.academicTitle = this.users[index]?.academicTitle?.id;
    this.form.academicDegree = this.users[index]?.academicDegree?.id;
    this.form.position = this.users[index]?.position?.id;
    // this.form.academicDegree = this.users[index].academicDegree.id;
    // this.form.position = this.users[index].position.id;
    this.modalActiveEdit = true;
  },



          async submitForm() {
        this.errors = []

        if (this.form.first_name === undefined || this.form.first_name.trim() === '') {
            this.errors.push('Вы не ввели имя')
        }

        if (this.form.last_name === undefined || this.form.last_name.trim() === '' ) {
            this.errors.push('Вы не ввели фамилию')
        }

        if (this.form.middle_name === undefined || this.form.middle_name.trim() === '') {
            this.errors.push('Вы не ввели отчество')
        }

        if (this.form.username === undefined || this.form.username.trim() === '') {
            this.errors.push('Вы не ввели логин')
        }

        if (this.form.password === undefined || this.form.password.trim() === '') {
            this.errors.push('Вы не ввели пароль')
        }

        if (this.errors.length === 0) {
            await axios
                .post('http://localhost:8000/api/user/', this.form)
                .then(response => {
                    this.getUsers()
                    this.showAlert("Преподаватель добавлен")
                    this.modalActive = false
                })
        }
    },
          async updateForm() {
        this.errors = []

        if (this.form.first_name === undefined || this.form.first_name.trim() === '') {
            this.errors.push('Вы не ввели имя')
        }

        if (this.form.last_name === undefined || this.form.last_name.trim() === '' ) {
            this.errors.push('Вы не ввели фамилию')
        }

        if (this.form.middle_name === undefined || this.form.middle_name.trim() === '') {
            this.errors.push('Вы не ввели отчество')
        }

        if (this.form.username === undefined || this.form.username.trim() === '') {
            this.errors.push('Вы не ввели логин')
        }


        if (this.errors.length === 0) {
            await axios
                .put(`http://localhost:8000/api/user/${this.form.id}/`, this.form)
                .then(response => {
                    this.getUsers()
                    this.showAlert("Преподаватель обновлен")
                    this.modalActiveEdit = false
                })
        }
    },

          getPosition() {
            axios.get('http://localhost:8000/api/position/').then(res => {
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
        axios.get('http://localhost:8000/api/academic_title/').then(response => {
            this.academicTitles = response.data
        })
      },

      getAcademicDegree() {
          axios.get('http://localhost:8000/api/academic_degree/').then(response => {
              this.academicDegrees = response.data
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
    },

    deleteUser(userId) {
    this.$refs.confirmComponent.show("Вы уверены что хотите удалить учетную запись?")
      .then((confirmed) => {
        if (confirmed) {
          axios.delete(`http://localhost:8000/api/user/${userId}/`)
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

.modal-create-user {
  width: 950px !important;
  height: 550px !important;
  top: 40% !important;
  
}

.form-wrapper {
  display: flex;
}

.form-item {
  margin: 12px;
}

@media (max-width: 950px) {
  .modal-create-user {
  } 

  .form-wrapper {
   
  }
}
  </style>
  