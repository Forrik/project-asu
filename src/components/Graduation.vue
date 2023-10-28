<script setup>
import Delete from './icons/Delete.vue'
import Edit from './icons/Edit.vue'
import Add from './icons/Add.vue'
import Next from './icons/Next.vue'
</script>

<template>
    <div class="row">
      <CustomConfirm ref="confirmComponent" />
      <CustomAlert ref="alertComponent" />
        <div class="col-3"></div>
        <div class="col-8 content">
           
            <div class="card">
                <div class="table-responsive">
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
                        <th @click="sortBy('year')">Выпуск
                          <template v-if="sortKey === 'year' && sortDirection['year'] === 1">
                            <i class="bi bi-caret-down-fill"></i>
                          </template>
                          <template v-if="sortKey === 'year' && sortDirection['year'] === -1">
                            <i class="bi bi-caret-up-fill"></i>
                          </template>
                        </th>
                        <th @click="sortBy('year')">Год
                          <template v-if="sortKey === 'year' && sortDirection['year'] === 1">
                            <i class="bi bi-caret-down-fill"></i>
                          </template>
                          <template v-if="sortKey === 'year' && sortDirection['year'] === -1">
                            <i class="bi bi-caret-up-fill"></i>
                          </template>
                        </th>
                        <th @click="sortBy('graduation_type')">Тип выпуска
                          <template v-if="sortKey === 'graduation_type' && sortDirection['graduation_type'] === 1">
                            <i class="bi bi-caret-down-fill"></i>
                          </template>
                          <template v-if="sortKey === 'graduation_type' && sortDirection['graduation_type'] === -1">
                            <i class="bi bi-caret-up-fill"></i>
                          </template>
                        </th>
                        
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(graduation, index) in sortedGraduations" :key="index">
                        <td>{{graduation.id}}</td>
                        <td>{{graduation.year}} {{graduation.graduation_type}}</td>
                        <td>{{graduation.year}}</td>
                        <td>{{graduation.graduation_type}}</td>
                        <td><Edit @click="openModalEdit(index)" /></td> 
                        <td> <Delete @click="deleteGraduation(graduation.id)" /> </td>
                        <td>
                        <RouterLink :to="{ path: '/graduation/'+ graduation.id}">
                        <Next />
                      </RouterLink>
                    </td>
                      </tr>
                    </tbody>
                    <tbody v-if="sortedGraduations.length === 0"> 
                      <tr>
                        <td colspan="7" class="text-center fw-bold">
                          Пока нет ни одного выпуска
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="icon-add">
                  
                      <a @click="openModal" href="#">   <Add /></a>
                    </div>
                </div>
              </div>
             
              
              <div v-show="modalActiveEdit">
                <div   @click="modalActiveEdit = false; this.errors=''" class="modal-wrapper" >   </div>
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
                  <form v-on:submit.prevent="updateGraduation">
                    <div class="form-outline mb-3">
                      <label class="form-label fw-bold ms-4">Тип выпуска</label>
                      
                      <input v-model="form.graduation_type" type="text"  class="form-control form-modal" placeholder="Введите тип выпуска " />
                    </div>
                    <div class="form-outline mb-3">
                      <label class="form-label fw-bold ms-4" >Год</label>
                      <input v-model="form.year" type="number" class="form-control form-modal" 
                        placeholder="Введите год" />
                    </div>
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
                        <label class="form-label fw-bold ms-4">Тип выпуска</label>
                        
                        <input v-model="form.graduation_type" class="form-control form-modal" 
                          placeholder="Введите тип выпуска" />
                      </div>
                      <div class="form-outline mb-3">
                        <label class="form-label fw-bold ms-4" >Год</label>
                        <input v-model="form.year" class="form-control form-modal" 
                          placeholder="Введите год" />
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
    </div>

</template>

<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'
import { ref } from 'vue';
import CustomAlert from './CustomAlert.vue'
import CustomConfirm from './CustomConfirm.vue'

export default {
    name: 'Graduation',
    directives: { mask },
        setup() {
            const activeIndex = ref(100);

            function setActive(index) {
      activeIndex.value = index;
    }
            
            return {
                activeIndex,
                setActive,
            }
        },
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
          graduation_type: '',
          year: '',
        },
        errors: [],
        graduations: [],
        edulevels: [],
        sortKey: ''
        }
    },

   
    mounted() {
        this.getGraduation();
        this.getEduLevel();
        this.specialityId = this.$route.params.specialityId;

    }, 

    components: {
        CustomAlert,
        CustomConfirm
  },

    computed: {

  sortedGraduations() {
  return this.graduations.sort((a, b) => {
    const key = this.sortKey;
    const direction = this.sortDirection[key];
   


    const aValue = a[key];
    const bValue = b[key];

    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  });
}
    },

    methods: {

     

async updateGraduation() {
  this.errors = []
  
  if (this.form.graduation_type === '' ) {
      this.errors.push('Вы не ввели тип выпуска')
  }

  if (this.form.year === '') {
      this.errors.push('Вы не ввели год')
  }

  if (this.errors.length === 0) {
      await axios
          .put(`${API_URL}graduation/${this.form.id}/`, this.form)
          .then(response => {
              this.getGraduation()
              this.showAlert("Тип выпуска обновлен")
              this.modalActiveEdit = false
          }).catch(error => {
            Object.keys(error.response.data).forEach(field => {
        error.response.data[field].forEach(errorMessage => {
            this.errors.push(`${field}: ${errorMessage}`);
        });
    });
          })
  }
},

async submitForm() {
  this.errors = []

  if (this.form.graduation_type === undefined) {
      this.errors.push('Вы не ввели тип выпуска')
  }

  if (this.form.year === undefined ) {
      this.errors.push('Вы не ввели год')
  }

  if (this.errors.length === 0) {
      await axios
          .post(`${API_URL}graduation/`, this.form)
          .then(response => {
              this.getGraduation()
                this.showAlert("Тип выпуска добавлен")
              this.modalActive = false
          }).catch(error => {
            Object.keys(error.response.data).forEach(field => {
        error.response.data[field].forEach(errorMessage => {
            this.errors.push(`${field}: ${errorMessage}`);
        });
    });
          })
  }
},



openModalEdit(index) {
this.form = { ...this.graduations[index] };
this.modalActiveEdit = true;
},


openModal(index) {
  this.form = { ...this.graduations[index] };
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

getGraduation() {
  axios.get(`${API_URL}graduation/`).then(response => {
      this.graduations = response.data
      this.isLoading = false
  })
},
getEduLevel() {
  axios.get(`${API_URL}edu_level/`).then(response => {
      this.edulevels = response.data
  })

},

showAlert(message) {
      this.$refs.alertComponent.show(message);
    },




deleteGraduation(GraduationId) {
  this.$refs.confirmComponent.show("Вы уверены что хотите удалить эту специальность?")
    .then((confirmed) => {
      if (confirmed) {
        axios.delete(`${API_URL}graduation/${GraduationId}`).then(response => {
          this.getGraduation()
          this.showAlert("Тип выпуска удален")
        })
      }
    })
}

}
    
}
</script>

<style>

.nav-link-graduate{
    font-weight: 700;
    font-size: 20px;
    padding: 5px 15px 0 15px;
    margin-right: 5px;
    color: #707070;
   
}

.nav-link-graduate:hover{
    color: #695CFE;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    border: 1px solid #707070;
    
}

.nav-link-graduate.active{
    color: #695CFE;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    border: 1px solid #707070;
  
}

.nav-tabs {
    border-bottom: 1px solid #707070;
    
}


</style>