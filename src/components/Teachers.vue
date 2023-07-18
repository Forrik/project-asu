<script >
import axios from 'axios';

export default {
    name: 'teachers',
    
    data () {
        

        return {
            users: []
            
        }
    },
    mounted() {
            this.getUsers();


            // const body = document.querySelector("body"),
            // table = body.querySelector("table")

            // if (body.classList.contains("dark")) {
            //   table.classList.toggle(".table-dark");
            // } else {
            //   table.classList.toggle("table-light");
            // }

       

        },

        methods: {
          getUsers() {
            axios.get('https://62b6e7ae6999cce2e809e977.mockapi.io/users').then(res => {
                this.users = res.data


            });
          },
          
          
          deleteUser(userId) {
           if(confirm('Вы уверены, что хотите удалить учетную запись?')) {
            axios.delete(`https://62b6e7ae6999cce2e809e977.mockapi.io/users/${userId}`).then(res => {
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
    <table class="table table-bordered table-hover ">
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
            <td >{{user.firstName}}</td>
            <td >{{user.middleName}}</td>
            <td >{{user.lastName}}</td>
            <td >{{user.jobTitle}}</td>
            <td >{{user.jobArea}}</td>
            <td >{{user.jobType}}</td>
            <td>Логин</td>
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



table {
    text-align: center;
}

@media (max-width: 1200px) {

    }
  </style>
  