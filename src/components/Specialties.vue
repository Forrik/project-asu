
<script setup>
import Delete from './icons/Delete.vue'
import Edit from './icons/Edit.vue'
import Add from './icons/Add.vue'

</script>



<template>
    <div >
    <div class="row">
      <div class="col-3"></div>
        <div class="col-8 content">
        <div class="card">
          <div class="table-responsive">
            <input type="text" v-model="searchQuery" placeholder="Поиск" />
            <div v-if="isLoading" >
              <p class="text-center mt-5 mb-2"><h4>Подождите...</h4></p>
              <span class="loader"></span>
            </div>
         
          <table v-else class="table table-bordered table-hover ">
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
                  <th @click="sortBy('code')">Код
                    <template v-if="sortKey === 'code' && sortDirection['code'] === 1">
                      <i class="bi bi-caret-down-fill"></i>
                    </template>
                    <template v-if="sortKey === 'code' && sortDirection['code'] === -1">
                      <i class="bi bi-caret-up-fill"></i>
                    </template>
                  </th>
                  <th @click="sortBy('name')">Наименование
                    <template v-if="sortKey === 'name' && sortDirection['name'] === 1">
                      <i class="bi bi-caret-down-fill"></i>
                    </template>
                    <template v-if="sortKey === 'name' && sortDirection['name'] === -1">
                      <i class="bi bi-caret-up-fill"></i>
                    </template>
                  </th>
                  <th @click="sortBy('abbreviation')">Аббревиатура
                    <template v-if="sortKey === 'abbreviation' && sortDirection['abbreviation'] === 1">
                      <i class="bi bi-caret-down-fill"></i>
                    </template>
                    <template v-if="sortKey === 'abbreviation' && sortDirection['abbreviation'] === -1">
                      <i class="bi bi-caret-up-fill"></i>
                    </template>
                  </th>
                  <th @click="sortBy('edulevel')">Уровень образования
                    <template v-if="sortKey === 'edulevel' && sortDirection['edulevel'] === 1">
                      <i class="bi bi-caret-down-fill"></i>
                    </template>
                    <template v-if="sortKey === 'edulevel' && sortDirection['edulevel'] === -1">
                      <i class="bi bi-caret-up-fill"></i>
                    </template>
                  </th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(speciality, index) in sortedSpecialities" :key="index">
                  <td>{{speciality.id}}</td>
                  <td>{{speciality.code}}</td>
                  <td>{{speciality.name}}</td>
                  <td>{{speciality.abbreviation}}</td>
                  <td>{{speciality.edulevel.name}}</td>
                  <td><Edit @click="openModalEdit(index)" /></td> 
                  <td> <Delete @click="deleteSpeciality(speciality.id)" /> </td>
                 
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
            
                <a @click="openModal" href="#">   <Add /></a>
             
            
                
              </div>
                
          </div>
        </div>

        <div v-show="modalActiveEdit">
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
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4" >Уровень образования</label>
                <input v-model="form.edulevel" class="form-control form-modal" 
                  placeholder="Введите уровень образования "   type="number" />
              </div>
              <select v-model="form.edulevel" class="form-select form-modal">
                
                <option value="1">Специалитет</option>
                <option value="2">2</option>
                <option value="3">3</option>
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
       
          </div>



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
    </div>
</template>

<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'




export default {
    name: 'Specialties',
    directives: { mask },
   
    data() {
      return {
        searchQuery: '',
        sortDirection: {
          id: 1,
          code: 1,
          name: 1,
          abbreviation: 1,
          edulevel: 1
        },
        modalActiveEdit: false,
        modalActive: false,
        isLoading: true,
        form: {
          code: '',
          name: '',
          abbreviation: '',
          edulevel : '',
        },
        errors: [],
        specialities: [],
        edulevels: [],
        sortKey: ''
      }
    },

   

    mounted() {
        this.getSpecialities();
        this.getEduLevel();
        this.specialityId = this.$route.params.specialityId;

    },

    computed: {
      filteredSpecialities() {
    if (this.searchQuery === '') {
      return this.specialities;
    }

    const query = this.searchQuery.toLowerCase();
    return this.specialities.filter((speciality) => {
      return (
        speciality.code.toLowerCase().includes(query) ||
        speciality.name.toLowerCase().includes(query) ||
        speciality.abbreviation.toLowerCase().includes(query) ||
        speciality.edulevel.toLowerCase().includes(query)
      );
    });
  },

  sortedSpecialities() {
  return this.specialities.sort((a, b) => {
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

      async updateSpeciality() {
        this.errors = []
        
        if (this.form.code === '' ) {
            this.errors.push('Вы не ввели код')
        }

        if (this.form.name === '') {
            this.errors.push('Вы не ввели наименование')
        }

        if (this.form.abbreviation === '') {
            this.errors.push('Вы не ввели аббревиатуру')
        }

        if (this.errors.length === 0) {
            await axios
                .put(`http://localhost:8000/api/speciality/${this.form.id}/`, this.form)
                .then(response => {
                    this.getSpecialities()
                    alert("Специальность обновлена")
                    this.modalActiveEdit = false
                })
        }
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

      

      openModalEdit(index) {
  this.form = { ...this.specialities[index] };
  this.modalActiveEdit = true;
},

      // openModalEdit(specialityId) {
      //   this.form = { ...this.specialities.find(speciality => speciality.id === specialityId) };
      //   this.modalActiveEdit = true;

      // },
      openModal(index) {
        this.form = { ...this.specialities[index] };
        this.modalActive = true;
      },

      sortBy(key) {
        if (this.sortKey === key) {
          this.sortDirection[key] *= -1;
        } else {
          this.sortKey = key;
          this.sortDirection[key] = 1;
        }
        
      },

    getSpecialities() {
 
        axios.get('http://localhost:8000/api/speciality').then(response => {
            this.specialities = response.data
            this.isLoading = false
            
        })

    },
    getEduLevel() {
        axios.get('http://localhost:8000/api/edu_level/').then(response => {
            this.edulevels = response.data
        })

    },

    
    deleteSpeciality(specialityId) {
    if(confirm("Вы уверены что хотите удалить эту специальность?")) {
        axios.delete(`http://localhost:8000/api/speciality/${specialityId}`)
        .then(res=> {
            alert("Специальность удалена")
            this.getSpecialities()
        })
    }
},

   
}
}
</script>

<style>

.modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0, 0.5);
  z-index: 100;
}

.modal-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 700px;
  background-color: #fff;
  z-index: 101;
}


.modal-title {
  display: flex;
  justify-content: center;
}

.form-modal {
  width: 450px; 
  margin: 0 auto;
}

.btn-modal-wrapper {
  display: flex;
  justify-content: center;
}

.btn-modal {
  width: 150px;
  font-size: 19px;
  padding: 5px 10px;
  border: none;
  background-color: #fff;
  font-weight: 700;
  cursor: pointer;
  color: #707070;
  margin-top: 20px;
}

.btn-modal:hover {
  background-color: #695CFE;
  color: #fff;
  border-radius: 6px;
  transition: var(--tran-03);
}
.icon-close {
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 20px;
}

@media screen and (max-width: 500px) {
  .modal-window {
    width: 400px;
    height: 700px;

  }

  .form-modal {
    width: 350px;
  }
}
@media screen and (max-width: 400px) {
  .modal-window {
    width: 300px;
    height: 700px;

  }

  .form-modal {
    width: 250px;
  }

  .modal-wrapper {
    height: 200vh;
  }
}
@media screen and (max-width: 300px) {
  .modal-window {
    width: 200px;
    height: 700px;

  }

  .form-modal {
    width: 150px;
  }


}

</style>