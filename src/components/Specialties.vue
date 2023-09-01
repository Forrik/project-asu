
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
          <table  class="table table-bordered table-hover ">
              <thead>
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">Код</th>
                  <th scope="col">Наименование</th>
                  <th scope="col">Аббревиатура</th>
                  <th scope="col">Уровень образования</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody  v-for="(speciality, index) in this.specialities" :key="index">
                <tr>
                  <td>{{speciality.id}}</td>
                  <td>{{speciality.code}}</td>
                  <td>{{speciality.name}}</td>
                  <td>{{speciality.abbreviation}}</td>
                  <td>{{speciality.edulevel}}</td>
                  <td ><Edit /></td>   
                  <td> <Delete @click="deleteSpeciality(speciality.id)" /> </td>
                 
                </tr>
              </tbody>
            </table>
            <div  v-on:click="counter = 111"   class="icon-add">
            
                <a @click="modalActive = !modalActive" href="#">   <Add /></a>
             
            
                
              </div>
                
          </div>
        </div>


        


        <ul class="nav nav-tabs">
        </ul>

       
        

        <div v-show="modalActive" >
          <div  @click="modalActive = false" class="modal-wrapper" >   </div>
           <div  class="modal-window">
              <h4 class="modal-title py-3 fw-bold">Добавить</h4>
              <svg
              @click="modalActive = false"
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
            <form v-on:submit.prevent="submitForm">
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4" >Код</label>
                <input v-model="form.code" class="form-control form-modal" 
                  placeholder="Введите код специальности" />
              </div>
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4" >Наименование</label>
                <input v-model="form.name" class="form-control form-modal" 
                  placeholder="Введите наименование " />
              </div>
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4" >Аббревиатура</label>
                <input v-model="form.abbreviation" class="form-control form-modal" 
                  placeholder="Введите аббревиатуру " />
              </div>
              <div class="form-outline mb-3">
                <label class="form-label fw-bold ms-4" >Уровень образования</label>
                <input v-model="form.edulevel" class="form-control form-modal" 
                  placeholder="Введите уровень образования " />
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
    </div>
</template>


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


</style>

<script>
import axios from 'axios'





export default {
    name: 'Specialties',
    setup() {
      

        
        return {
       
        }
    },

    components: {

    },

    data() {
        return {
          modalActive: false,
          form: {
            code: '',
            name: '',
            abbreviation: '',
            edulevel: ''
          },
          errors: [],
          specialities:[],
          edulevels:[],
        }
    },

    mounted() {
        this.getSpecialities();
        this.getEduLevel();

    },



    methods: {

    getSpecialities() {
        axios.get('http://localhost:8000/api/speciality').then(response => {
            this.specialities = response.data
        })

    },
    getEduLevel() {
        axios.get('http://localhost:8000/api/eduLevel').then(response => {
            this.edulevels = response.data
        })

    },
    deleteSpeciality(specialityId) {
    if(confirm("Вы уверены что хотите удалить карту этого сотрудника?")) {
        axios.delete(`http://localhost:8000/api/speciality/${specialityId}`)
        .then(res=> {
            alert("Специальность удалена")
            this.getSpecialities()
        })
    }
},

    async submitForm() {
        this.errors = []

        if (this.form.code === '') {
            this.errors.push('Вы не ввели код')
        }

        if (this.form.name === '') {
            this.errors.push('Вы не ввели наименование')
        }

        if (this.form.abbreviation === '') {
            this.errors.push('Вы не ввели аббревиатуру')
        }

        if (this.form.edulevel === '') {
            this.errors.push('Вы не ввели уровень образования')
        }

        if (this.errors.length === 0) {
            await axios
                .post('http://localhost:8000/api/speciality/', this.form)
                .then(response => {
                    this.getSpecialities()
                })
        }
    }
}
}
</script>