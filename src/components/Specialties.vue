
  <script setup>
  import Delete from './icons/Delete.vue'
  import Edit from './icons/Edit.vue'
  import Add from './icons/Add.vue'

  </script>



  <template>
      <div >
      <div class="row">
        <CustomAlert ref="alertComponent" />
        <CustomConfirm ref="confirmComponent" />
        <div class="col-3"></div>
          <div class="col-8 content">
           
             
          
          <div class="card">
         
            <div class="table-responsive">
              <!-- <input class="table-search" type="text" v-model="searchQuery" placeholder="Поиск" /> -->
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
                    <th @click="sortBy('education_level')">Уровень образования
                      <template v-if="sortKey === 'education_level' && sortDirection['education_level'] === 1">
                        <i class="bi bi-caret-down-fill"></i>
                      </template>
                      <template v-if="sortKey === 'education_level' && sortDirection['education_level'] === -1">
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
                    <td>{{speciality.education_level.name}}</td>
                    <td><Edit @click="openModalEdit(index)" /></td> 
                    <td> <Delete @click="deleteSpeciality(speciality.id)" /> </td>
                  
                  </tr>
                </tbody>
                <tbody v-if="sortedSpecialities.length === 0"> 
                  <tr>
                    <td colspan="7" class="text-center fw-bold">
                      Пока нет ни одной специальности
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="icon-add">
                  <a @click="openModal" href="#">   <Add /></a>
                </div>
                  
            </div>
          </div>

         

            <div v-show="modalActive" >
              <div @click="closeModal" class="modal-wrapper"></div>
              <div  class="modal-window">
                <h4 class="modal-title py-3 fw-bold">{{ editing ? "Редактировать" : "Добавить" }}</h4>
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
                <form  @submit.prevent="editing ? updateSpeciality() : submitForm()">
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

            
                  <label class="form-label fw-bold ms-4" >Уровень образования</label>
                  <select v-model="form.education_level" class="form-select form-modal">
                    <option v-for="education_level in education_levels" v-bind:value="education_level.id" :key="education_level.id" :value="education_level.id">
                      {{ education_level.name }}
                    </option>
                  
                  </select>
                  
            
    
                  <template v-if="errors.length > 0">
                    <div class="alert alert-danger mt-3" >
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                </template>
    
              
                    <div class="btn-modal-wrapper">
                      <button class="btn-modal">{{ editing ? "Обновить" : "Добавить" }}</button>
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
  import CustomAlert from './CustomAlert.vue'
  import CustomConfirm from './CustomConfirm.vue'




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
            education_level: 1
          },
       
          modalActive: false,
          isLoading: true,
          form: {
            code: '',
            name: '',
            abbreviation: '',
            education_level : '',
          },
          errors: [],
          specialities: [],
          education_levels: [],
          sortKey: '',
          editing: false,
        }
      },

      components: {
        CustomAlert,
        CustomConfirm
  },

    

      mounted() {
          this.getSpecialities();
          this.getEducationLevel();
          this.specialityId = this.$route.params.specialityId;

      },

      computed: {

    sortedSpecialities() {
    return this.specialities.sort((a, b) => {
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
  
        showAlert(message) {
      this.$refs.alertComponent.show(message);
    },
        async updateSpeciality() {
          this.errors = []
          
          if (this.form.code === '' ) {
              this.errors.push(ERRORS.code)
          }

          if (this.form.name === '') {
              this.errors.push(ERRORS.name)
          }

          if (this.form.abbreviation === '') {
              this.errors.push(ERRORS.abbreviation)
          }

          if (this.form.education_level === undefined) {
              this.errors.push(ERRORS.education_level)
          }

          if (this.errors.length === 0) {
              await axios
                  .put(`${API_URL}speciality/${this.form.id}/`, this.form)
                  .then(response => {
                      this.getSpecialities()
                      this.showAlert("Специальность обновлена")
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

        async submitForm() {
          this.errors = []

          if (this.form.code === undefined || this.form.code.trim() === '') {
              this.errors.push(ERRORS.code)
          }

          if (this.form.name === undefined || this.form.name.trim() === '') {
              this.errors.push(ERRORS.name)
          }

          if (this.form.abbreviation === undefined || this.form.abbreviation.trim() === '') {
              this.errors.push(ERRORS.abbreviation)
          }

          if (this.form.education_level === undefined) {
              this.errors.push(ERRORS.education_level)
          }

          if (this.errors.length === 0) {
              await axios
                  .post(`${API_URL}speciality/`, this.form)
                  .then(response => {
                      this.getSpecialities()
                      this.modalActive = false
                      this.showAlert("Специальность добавлена")
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
      this.form = { ...this.specialities[index] };
      this.form.education_level = this.specialities[index]?.education_level?.id;
      this.editing = true;
      this.modalActive = true;
    },

    openModal(index) {
      this.form = { ...this.specialities[index] };
      this.modalActive = true;
    },

    closeModal() {
      this.modalActive = false;
      this.editing = false; 
      this.errors = [];
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
  
          axios.get(`${API_URL}speciality/`).then(response => {
              this.specialities = response.data
              this.isLoading = false
              
          })

      },
      getEducationLevel() {
          axios.get(`${API_URL}edu_level/`).then(response => {
              this.education_levels = response.data
          })

      },
      

      
      deleteSpeciality(specialityId) {
    this.$refs.confirmComponent.show("Вы уверены что хотите удалить эту специальность?")
      .then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}speciality/${specialityId}`)
            .then(res => {
              this.showAlert("Специальность удалена")
              this.getSpecialities()
            })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

    
  }
  }
  </script>

  <style>
  

  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-window {
    position: absolute;
    max-width: 1200px;
    max-height: 90vh;
    background-color: #fff;
    z-index: 101;
    border-radius: 12px;
    overflow-y: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Добавьте следующие две строки для центрирования */
    margin: auto;
    position: fixed;
  }

  .table-search {
    padding: 4px;
    border:none;
    border-bottom:1px solid #757575;
    margin-top: 5px;
    padding-left: 10px;
  }

  .table-search:focus {
    outline: none
  }

  .modal-title {
    display: flex;
    justify-content: center;
  }

  .form-modal {
    width: 450px; 
    margin: 0 30px;
  }

  .btn-modal-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
  }

  .btn-modal {
    width: 150px;
    font-size: 19px;
    padding: 6px 10px;
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
      height: 100%;
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