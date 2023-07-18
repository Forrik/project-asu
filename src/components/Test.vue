<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
 
DataTable.use(DataTablesCore);
 

</script>
 
<template>
   <div class="row">
    <div class="col-3"></div>
    <div class="col-8">
        <DataTable :data="data" class="table table-striped table-bordered table-light table-responsive">
            <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Отчество</th>
                    
               
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in this.users" :key="index">
                    <td > {{user.id}} </td>
                    <td >{{user.firstName}}</td>
                    <td >{{user.middleName}}</td>
                </tr>
            </tbody>
        </DataTable>
    </div>
   </div>
</template>

<script>
import axios from 'axios';
import DataTable from 'datatables.net-vue3'

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