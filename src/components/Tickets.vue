<template>
  <div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-8 content">
        <CustomError ref="alertComponent" />
        <div>
          <ul class="nav">
            <li class="nav-item" v-on:click="counter = `newTickets`">
              <a
                class="nav-link-graduate"
                :class="{ active: activeIndex === 0 }"
                @click="setActive(0)"
                aria-current="page"
                href="#"
                >Новые</a
              >
            </li>
            <li class="nav-item" v-on:click="counter = `acceptedTickets`">
              <a class="nav-link-graduate" :class="{ active: activeIndex === 1 }" @click="setActive(1)" href="#"
                >Принятые</a
              >
            </li>
            <li class="nav-item" v-on:click="counter = `rejectedTickets`">
              <a class="nav-link-graduate" :class="{ active: activeIndex === 2 }" @click="setActive(2)" href="#"
                >Отклоненные</a
              >
            </li>
          </ul>
          <ul class="nav-tabs"></ul>
          <div class="card">
            <div class="table-responsive">
              <table v-if="counter === `newTickets`" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Дата отправки</th>
                    <th scope="col">Группа</th>
                    <th scope="col">Студент</th>
                    <th scope="col">Мотивационное сообщение</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(newTicket, index) in newTickets" :key="index">
                    <td>{{ newTicket.id }}</td>
                    <td>{{ newTicket.dt_send }}</td>
                    <td>
                      {{ newTicket.student.student_group.speciality.abbreviation }}-{{
                        newTicket.student.student_group.course
                      }}{{ newTicket.student.student_group.number }}
                    </td>
                    <td>
                      {{ newTicket.student.last_name }} {{ newTicket.student.middle_name }}
                      {{ newTicket.student.first_name }}
                    </td>
                    <td>{{ newTicket.comment }}</td>
                    <td>
                      <button @click="acceptTicket(newTicket.id)" class="btn btn-primary btn-sm">Принять</button>
                    </td>
                    <td>
                      <button @click="rejectTicket(newTicket.id)" class="btn btn-primary btn-sm">Отклонить</button>
                    </td>
                  </tr>
                  <tr v-if="newTickets.length === 0">
                    <td colspan="7">Нет новых заявок</td>
                  </tr>
                </tbody>
              </table>

              <table v-else-if="counter === `acceptedTickets`" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Дата отправки</th>
                    <th scope="col">Группа</th>
                    <th scope="col">Студент</th>
                    <th scope="col">Мотивационное сообщение</th>
                    <th scope="col">Дата рассмотрения</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(acceptedTicket, index) in acceptedTickets" :key="index">
                    <td>{{ acceptedTicket.id }}</td>
                    <td>{{ acceptedTicket.dt_send }}</td>
                    <td>   <td>
                      {{ acceptedTicket.student.student_group.speciality.abbreviation }}-{{
                        acceptedTicket.student.student_group.course
                      }}{{ acceptedTicket.student.student_group.number }}
                    </td></td>
                    <td>
                      {{ acceptedTicket.student.last_name }} {{ acceptedTicket.student.middle_name }}
                      {{ acceptedTicket.student.first_name }}
                    </td>
                    <td>{{ acceptedTicket.comment }}</td>
                    <td>{{ acceptedTicket.dt_response }}</td>
                  </tr>
                  <tr v-if="acceptedTickets.length === 0">
                    <td colspan="7">Нет принятых заявок</td>
                  </tr>
                </tbody>
              </table>
              <table v-else-if="counter === `rejectedTickets`" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Дата отправки</th>
                    <th scope="col">Группа</th>
                    <th scope="col">Студент</th>
                    <th scope="col">Мотивационное сообщение</th>
                    <th scope="col">Дата рассмотрения</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(rejectedTicket, index) in rejectedTickets" :key="index">
                    <td>{{ rejectedTicket.id }}</td>
                    <td>{{ rejectedTicket.dt_send }}</td>
                    <td>  {{ rejectedTicket.student.student_group.speciality.abbreviation }}-{{
                      rejectedTicket.student.student_group.course
                    }}{{ rejectedTicket.student.student_group.number }}</td>
                    <td>
                      {{ rejectedTicket.student.last_name }} {{ rejectedTicket.student.middle_name }}
                      {{ rejectedTicket.student.first_name }}
                    </td>
                    <td>{{ rejectedTicket.comment }}</td>
                    <td>{{ rejectedTicket.dt_response }}</td>
                  </tr>
                  <tr v-if="rejectedTickets.length === 0">
                    <td colspan="7">Нет отклоненных заявок</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <CustomConfirm ref="confirmComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";
import CustomError from "./CustomError.vue";
import CustomConfirm from "./CustomConfirm.vue";

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  data() {
    return {
      newTickets: [],
      acceptedTickets: [],
      rejectedTickets: [],
      ticketId: "",
      counter: "newTickets",
      activeIndex: 0,
    };
  },
  mounted() {
    this.getNewTickets();
    this.getAcceptedTickets();
    this.getRejectedTickets();
    this.ticketId = this.$route.params.ticketId;
  },

  components: {
    CustomError,
    CustomConfirm,
  },
  methods: {
    confirmAction(message) {
      this.$refs.confirmComponent
        .show(message)
        .then((confirmed) => {
          if (confirmed) {
            // Выполняем действие
            console.log("Действие выполнено!");
          } else {
            console.log("Действие отменено!");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    showAlert(message) {
      this.$refs.alertComponent.show(message);
    },
    setActive(index) {
      this.activeIndex = index;
    },
    getNewTickets() {
      axios.get(`${API_URL}ticket?ticket_status=1&teacher=${this.userStore.user.id}`).then((response) => {
        this.newTickets = response.data;
        this.isLoading = false;
      });
    },
    getAcceptedTickets() {
      axios.get(`${API_URL}ticket?ticket_status=2&teacher=${this.userStore.user.id}`).then((response) => {
        this.acceptedTickets = response.data;
        this.isLoading = false;
      });
    },
    getRejectedTickets() {
      axios.get(`${API_URL}ticket?ticket_status=3&teacher=${this.userStore.user.id}`).then((response) => {
        this.rejectedTickets = response.data;
        this.isLoading = false;
      });
    },
    acceptTicket(ticketId) {
      this.$refs.confirmComponent.show("Вы действительно хотите принять эту заявку?").then((confirmed) => {
        if (confirmed) {
          let requestSucceeded = false; // Переменная для отслеживания успешности запроса

          axios
            .post(`${API_URL}ticket_status_update/${ticketId}`, { ticket_status: 2 })
            .then(() => {
              requestSucceeded = true; // Устанавливаем, что запрос успешно выполнен
            })
            .catch((error) => {
              this.showAlert(error.response.data.error);
            })
            .finally(() => {
              if (requestSucceeded) {
                // Только если запрос выполнен успешно
                location.reload();
                this.getAcceptedTickets();
              }
            });
        }
      });
    },
    rejectTicket(ticketId) {
      this.$refs.confirmComponent.show("Вы действительно хотите отклонить эту заявку?").then((confirmed) => {
        if (confirmed) {
          axios.post(`${API_URL}ticket_status_update/${ticketId}`, { ticket_status: 3 });
          setTimeout(() => {
            location.reload();
          }, 500);
          this.getAcceptedTickets();
        }
      });
    },
  },
};
</script>

<style>
.btn-primary {
  background-color: #695cfe;
  border: 2px solid #695cfe;
  color: white;
  font-weight: 700;
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:visited {
  background-color: white;
  color: #695cfe;
  border: 2px solid #695cfe;
}
</style>
