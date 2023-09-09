<script >
import axios from 'axios';

export default {
    name: 'teachers',
    
    data () {
        

        return {
            users: [],
            isLoading: true,
            
        }
    },
    mounted() {
            this.getUsers();
            this.getPosition();
        },

        methods: {
          getUsers() {
           
            axios.get('http://localhost:8000/api/user/').then(res => {
              console.log(this.users)
                this.users = res.data
                this.isLoading = false
               
            });
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
        <Add />
      </div>
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
  