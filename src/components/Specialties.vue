
<script setup>
import Delete from './icons/Delete.vue'
import Edit from './icons/Edit.vue'
import Add from './icons/Add.vue'
import Navigation from './Navigation.vue'
</script>

<template>
    <div >
    <div class="row">
      <div class="col-3"></div>
        <div class="col-8 content">
        <div class="card">
          <div class="table-responsive">
          <table class="table table-bordered table-hover ">
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
              <tbody >
                <tr>
                  <td>1</td>
                  <td>09.05.01</td>
                  <td>Применение и эксплуатация автоматизированных систем специального назначения</td>
                  <td>ЭАС</td>
                  <td>Специалитет</td>
                  <td><Edit /></td>    
                  <td> <Delete /> </td>
                 
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
    </div>
</template>


<style>

</style>