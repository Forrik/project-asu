<template>
    <div  v-if="userStore.user.isAuthenticated">
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
                   
                    <table v-else class="table table-bordered table-hover ">
                        <thead>
                          <tr>
                            <th>№</th>
                            <th>Дата отправки</th>
                            <th>Преподаватель</th>
                            <th>Мотивационное сообщение</th>
                            <th>Статус заявки</th>
                            <th>Дата рассмотрения</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(ticket, index) in tickets" :key="index">
                            <td>{{ticket.id}}</td>
                            <td>{{ticket.dt_send}}</td>
                            <td>{{ticket.teacher.last_name}} {{ticket.teacher.first_name}} {{ticket.teacher.middle_name}}</td>
                            <td>{{ticket.message}}</td>
                            <td>{{ticket.ticketStatus.name}}</td>
                            <td>{{ticket.dt_response}}</td>
                          </tr>
                          <tr v-show="tickets.length === 0">
                            <td colspan="6">Заявок нет</td>
                          </tr>
                        </tbody>
                        
                      </table>
                      <div class="btn-modal-wrapper">
                        <button @click="openModal" class="btn-modal btn-my-ticket"><i class="bi bi-clipboard2-check-fill"></i> Создать заявку</button>
                      </div> 
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
                      <form  v-on:submit.prevent="AcceptTicket">
                        <div class="form-outline mb-3">
                          <label class="form-label fw-bold ms-4" >Преподаватель</label>
                          <select v-model="form.teacher"  class="form-select form-modal">
                            <option v-for="teacher in teachers" v-bind:key="teacher.id" :value="teacher.id">{{ teacher.last_name }} {{ teacher.first_name }} {{ teacher.middle_name }}</option>
                          </select>
                        </div>
                       
                        <div class="form-outline mb-3">
                          <label class="form-label fw-bold ms-4" >Мотивационное сообщение</label>
                          <textarea v-model="form.message" class="form-control form-message" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                      
        
                  
                       

                   
          
                        <template v-if="errors.length > 0">
                          <div class="alert alert-danger mt-3" >
                              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                          </div>
                      </template>
          
                    
                          <div class="btn-modal-wrapper">
                            <button type="submit" class="btn-modal">Добавить</button>
                          </div>
          
                          
          
                        </form>
                        
                    
                     </div>
                 
                    </div>
                    <CustomConfirm ref="confirmComponent" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import CustomAlert from './CustomAlert.vue'
import CustomConfirm from './CustomConfirm.vue'

export default {

  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
    data () {
        

        return {
          tickets: [],
          isLoading: true,
          modalActive: false,
          form: {
             message: '',
             teacher: '',
          },
          errors: [],

        }
    },

    mounted() {
      this.getMyTickets();
      this.getTeachers();
    },

    components: {
        CustomAlert,
        CustomConfirm
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

      async AcceptTicket() {
        this.errors = []
        
            await axios
            .post(`http://localhost:8000/api/ticket_create/`, this.form) 
            .then(response => {
                this.getMyTickets()
                this.modalActive = false

            })
    },

    openModal(index) {
        this.form = { ...this.tickets[index] };
        this.modalActive = true;
      },
      getMyTickets() {
      axios.get(`http://localhost:8000/api/ticket?student=${this.userStore.user.id}`).then(response => {
          this.tickets = response.data
          this.isLoading = false
      })
      },
      getTeachers() {
        axios.get('http://localhost:8000/api/user?role=2').then(response => {
          this.teachers = response.data
        })
      }

    }
}
</script>

<style>

.btn-my-ticket{
  width: 200px;
  margin-bottom: 25px;
}

.form-message {
  max-height:300px; 
  width:90%; 
  margin: 0 auto
}

</style>