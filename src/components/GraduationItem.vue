<template>
    <div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-8 content">
                 <div>
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

                                <thead>
                                    <tr>
                                      <th scope="col">№</th>
                                      <th scope="col">Преподаватель</th>
                                      <th scope="col">Группа</th>
                                      <th scope="col">Студент</th>
                                      <th scope="col">Количество часов</th>
                                    </tr>
                                  </thead>
                                  <tbody v-for="(user_graduation, index) in user_graduations" :key="index">
                                    <tr v-for="(group, gIndex) in user_graduation.groups" :key="gIndex">
                                      <td>{{ user_graduation.id }}</td>
                                      <td>{{ user_graduation.first_name }} {{ user_graduation.middle_name }} {{ user_graduation.last_name }}</td>
                                      <td>{{ group.group_name }}</td>
                                      <td class="table-grouped">
                                        <tr v-for="(student, sIndex) in group.students" :key="sIndex">
                                        <td style="align-items: center; justify-content: center"> {{ student.first_name }} {{ student.middle_name }} {{ student.last_name}}</td>
                                        <td> - {{ student.hours}} часов</td>
                                      
                                       </tr>
                                       <td>сумма часов - {{ user_graduation.hours_sum}} </td>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <table v-else-if="counter === `hours`"  class="table table-bordered table-hover">
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
                                      <tbody >
                                        <tr v-for="(user, index) in this.users" :key="index">
                                          <td > {{user.id}} </td>
                                          <td >{{user.first_name}}</td>
                                          <td >{{user.middle_name}}</td>
                                          <td >{{user.last_name}}</td>
                                          <td>Edit</td>
                                          <td>Delete</td>
                                        </tr>
                                      </tbody>
                                </table>
                                <table v-else-if="counter === `groups`"  class="table table-bordered table-hover">
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
                                      <tbody >
                                        <tr v-for="(group, index) in this.groups" :key="index">
                                          <td>{{group.speciality_id.abbreviation}}-{{group.number}}</td>
                                          <td>{{group.speciality_id.name}}</td>
                                          <td>{{group.speciality_id.edulevel.name}}</td>
                                          <td>{{group.course}} </td>
                                          <td>{{ group.number}}</td>
                                          <td>{{group.eduForm_id.name}}</td>
                                        </tr>
                                      </tbody>
                                </table>
                                <table v-else-if="counter === `timeNorm`"  class="table table-bordered table-hover">
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
                                      <tbody >
                                        <tr v-for="(user, index) in this.users" :key="index">
                                          <td > {{user.id}} </td>
                                          <td >{{user.first_name}}</td>
                                          <td >{{user.middle_name}}</td>
                                          <td >{{user.last_name}}</td>
                                          <td>Edit</td>
                                          <td>Delete</td>
                                        </tr>
                                      </tbody>
                                </table>
                      </div>
                      </div>
                   
                    
                      
                  </div>
        </div>
        </div>
    </div>
</template>

<script >
import axios from 'axios';

export default {
    name: 'Graduation',
    
    data () {
        

        return {
            users: [],
            isLoading: true,
            groups: [],
            user_graduations: [],
            
        }
    },
    mounted() {
            this.getUsers();
            this.getGroups();
            
            this.getGraduationUser();
        },
    computed: {
      graduationId() {
      return this.$route.params.graduationId;
    }
    },

        methods: {
          getUsers() {
           
            axios.get('http://localhost:8000/api/user?role=2').then(res => {
                
                this.users = res.data
                this.isLoading = false
               
            });
          },
          getGraduationUser() {
            axios.get(`http://localhost:8000/api/user_graduation/${this.graduationId}`).then(res => {
              this.user_graduations = res.data
              this.isLoading = false
            })
          },

          getGroups() {
            axios.get('http://localhost:8000/api/student_group/').then(res => {
              
              this.groups = res.data
              this.isLoading = false
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

<style>

.table-grouped {
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>