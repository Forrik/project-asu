<script setup>
import Delete from "./icons/Delete.vue";
import Edit from "./icons/Edit.vue";
import Add from "./icons/Add.vue";
</script>

<template>
  <div style="position: absolute; top: -50%; left: -10%; width: 100% !important">
    <CustomConfirm ref="confirmComponent" />
    <CustomAlert ref="alertComponent" />
  </div>
  <div class="graduation-name">
    Группа:{{
      group && group.speciality ? group.speciality.abbreviation + "-" + group.course + group.number : "Недоступно"
    }}
  </div>

  <svg
    @click="gear = 2"
    style="float: right; cursor: pointer; position: relative; bottom: 35px; right: 0px"
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z"
      fill="#707070"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z"
      fill="#707070"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.7673 1.01709C10.9925 0.999829 11.2454 0.99993 11.4516 1.00001L12.5484 1.00001C12.7546 0.99993 13.0075 0.999829 13.2327 1.01709C13.4989 1.03749 13.8678 1.08936 14.2634 1.26937C14.7635 1.49689 15.1915 1.85736 15.5007 2.31147C15.7454 2.67075 15.8592 3.0255 15.9246 3.2843C15.9799 3.50334 16.0228 3.75249 16.0577 3.9557L16.1993 4.77635L16.2021 4.77788C16.2369 4.79712 16.2715 4.81659 16.306 4.8363L16.3086 4.83774L17.2455 4.49865C17.4356 4.42978 17.6693 4.34509 17.8835 4.28543C18.1371 4.2148 18.4954 4.13889 18.9216 4.17026C19.4614 4.20998 19.9803 4.39497 20.4235 4.70563C20.7734 4.95095 21.0029 5.23636 21.1546 5.4515C21.2829 5.63326 21.4103 5.84671 21.514 6.02029L22.0158 6.86003C22.1256 7.04345 22.2594 7.26713 22.3627 7.47527C22.4843 7.7203 22.6328 8.07474 22.6777 8.52067C22.7341 9.08222 22.6311 9.64831 22.3803 10.1539C22.1811 10.5554 21.9171 10.8347 21.7169 11.0212C21.5469 11.1795 21.3428 11.3417 21.1755 11.4746L20.5 12L21.1755 12.5254C21.3428 12.6584 21.5469 12.8205 21.7169 12.9789C21.9171 13.1653 22.1811 13.4446 22.3802 13.8461C22.631 14.3517 22.7341 14.9178 22.6776 15.4794C22.6328 15.9253 22.4842 16.2797 22.3626 16.5248C22.2593 16.7329 22.1255 16.9566 22.0158 17.14L21.5138 17.9799C21.4102 18.1535 21.2828 18.3668 21.1546 18.5485C21.0028 18.7637 20.7734 19.0491 20.4234 19.2944C19.9803 19.6051 19.4613 19.7901 18.9216 19.8298C18.4954 19.8612 18.1371 19.7852 17.8835 19.7146C17.6692 19.6549 17.4355 19.5703 17.2454 19.5014L16.3085 19.1623L16.306 19.1638C16.2715 19.1835 16.2369 19.2029 16.2021 19.2222L16.1993 19.2237L16.0577 20.0443C16.0228 20.2475 15.9799 20.4967 15.9246 20.7157C15.8592 20.9745 15.7454 21.3293 15.5007 21.6886C15.1915 22.1427 14.7635 22.5032 14.2634 22.7307C13.8678 22.9107 13.4989 22.9626 13.2327 22.983C13.0074 23.0002 12.7546 23.0001 12.5484 23H11.4516C11.2454 23.0001 10.9925 23.0002 10.7673 22.983C10.5011 22.9626 10.1322 22.9107 9.73655 22.7307C9.23648 22.5032 8.80849 22.1427 8.49926 21.6886C8.25461 21.3293 8.14077 20.9745 8.07542 20.7157C8.02011 20.4967 7.97723 20.2475 7.94225 20.0443L7.80068 19.2237L7.79791 19.2222C7.7631 19.2029 7.72845 19.1835 7.69396 19.1637L7.69142 19.1623L6.75458 19.5014C6.5645 19.5702 6.33078 19.6549 6.11651 19.7146C5.86288 19.7852 5.50463 19.8611 5.07841 19.8298C4.53866 19.7901 4.01971 19.6051 3.57654 19.2944C3.2266 19.0491 2.99714 18.7637 2.84539 18.5485C2.71718 18.3668 2.58974 18.1534 2.4861 17.9798L1.98418 17.14C1.87447 16.9566 1.74067 16.7329 1.63737 16.5248C1.51575 16.2797 1.36719 15.9253 1.32235 15.4794C1.26588 14.9178 1.36897 14.3517 1.61976 13.8461C1.81892 13.4446 2.08289 13.1653 2.28308 12.9789C2.45312 12.8205 2.65717 12.6584 2.82449 12.5254L3.47844 12.0054V11.9947L2.82445 11.4746C2.65712 11.3417 2.45308 11.1795 2.28304 11.0212C2.08285 10.8347 1.81888 10.5554 1.61972 10.1539C1.36893 9.64832 1.26584 9.08224 1.3223 8.52069C1.36714 8.07476 1.51571 7.72032 1.63732 7.47528C1.74062 7.26715 1.87443 7.04347 1.98414 6.86005L2.48605 6.02026C2.58969 5.84669 2.71714 5.63326 2.84534 5.45151C2.9971 5.23637 3.22655 4.95096 3.5765 4.70565C4.01966 4.39498 4.53862 4.20999 5.07837 4.17027C5.50458 4.1389 5.86284 4.21481 6.11646 4.28544C6.33072 4.34511 6.56444 4.4298 6.75451 4.49867L7.69141 4.83775L7.69394 4.8363C7.72844 4.8166 7.7631 4.79712 7.79791 4.77788L7.80068 4.77635L7.94225 3.95571C7.97723 3.7525 8.02011 3.50334 8.07542 3.2843C8.14077 3.0255 8.25461 2.67075 8.49926 2.31147C8.80849 1.85736 9.23648 1.49689 9.73655 1.26937C10.1322 1.08936 10.5011 1.03749 10.7673 1.01709ZM14.0938 4.3363C14.011 3.85634 13.9696 3.61637 13.8476 3.43717C13.7445 3.2858 13.6019 3.16564 13.4352 3.0898C13.2378 3.00002 12.9943 3.00002 12.5073 3.00002H11.4927C11.0057 3.00002 10.7621 3.00002 10.5648 3.0898C10.3981 3.16564 10.2555 3.2858 10.1524 3.43717C10.0304 3.61637 9.98895 3.85634 9.90615 4.3363L9.75012 5.24064C9.69445 5.56333 9.66662 5.72467 9.60765 5.84869C9.54975 5.97047 9.50241 6.03703 9.40636 6.13166C9.30853 6.22804 9.12753 6.3281 8.76554 6.52822C8.73884 6.54298 8.71227 6.55791 8.68582 6.57302C8.33956 6.77078 8.16643 6.86966 8.03785 6.90314C7.91158 6.93602 7.83293 6.94279 7.70289 6.93196C7.57049 6.92094 7.42216 6.86726 7.12551 6.7599L6.11194 6.39308C5.66271 6.2305 5.43809 6.14921 5.22515 6.16488C5.04524 6.17811 4.87225 6.23978 4.72453 6.34333C4.5497 6.46589 4.42715 6.67094 4.18206 7.08103L3.72269 7.84965C3.46394 8.2826 3.33456 8.49907 3.31227 8.72078C3.29345 8.90796 3.32781 9.09665 3.41141 9.26519C3.51042 9.4648 3.7078 9.62177 4.10256 9.9357L4.82745 10.5122C5.07927 10.7124 5.20518 10.8126 5.28411 10.9199C5.36944 11.036 5.40583 11.1114 5.44354 11.2504C5.47844 11.379 5.47844 11.586 5.47844 12C5.47844 12.414 5.47844 12.621 5.44354 12.7497C5.40582 12.8887 5.36944 12.9641 5.28413 13.0801C5.20518 13.1875 5.07927 13.2876 4.82743 13.4879L4.10261 14.0643C3.70785 14.3783 3.51047 14.5352 3.41145 14.7349C3.32785 14.9034 3.29349 15.0921 3.31231 15.2793C3.33461 15.501 3.46398 15.7174 3.72273 16.1504L4.1821 16.919C4.4272 17.3291 4.54974 17.5342 4.72457 17.6567C4.8723 17.7603 5.04528 17.8219 5.2252 17.8352C5.43813 17.8508 5.66275 17.7695 6.11199 17.607L7.12553 17.2402C7.42216 17.1328 7.5705 17.0791 7.7029 17.0681C7.83294 17.0573 7.91159 17.064 8.03786 17.0969C8.16644 17.1304 8.33956 17.2293 8.68582 17.427C8.71228 17.4421 8.73885 17.4571 8.76554 17.4718C9.12753 17.6719 9.30853 17.772 9.40635 17.8684C9.50241 17.963 9.54975 18.0296 9.60765 18.1514C9.66662 18.2754 9.69445 18.4367 9.75012 18.7594L9.90615 19.6637C9.98895 20.1437 10.0304 20.3837 10.1524 20.5629C10.2555 20.7142 10.3981 20.8344 10.5648 20.9102C10.7621 21 11.0057 21 11.4927 21H12.5073C12.9943 21 13.2378 21 13.4352 20.9102C13.6019 20.8344 13.7445 20.7142 13.8476 20.5629C13.9696 20.3837 14.011 20.1437 14.0938 19.6637L14.2499 18.7594C14.3055 18.4367 14.3334 18.2754 14.3923 18.1514C14.4502 18.0296 14.4976 17.963 14.5936 17.8684C14.6915 17.772 14.8725 17.6719 15.2344 17.4718C15.2611 17.4571 15.2877 17.4421 15.3141 17.427C15.6604 17.2293 15.8335 17.1304 15.9621 17.0969C16.0884 17.064 16.167 17.0573 16.2971 17.0681C16.4295 17.0791 16.5778 17.1328 16.8744 17.2402L17.888 17.607C18.3372 17.7696 18.5619 17.8509 18.7748 17.8352C18.9547 17.8219 19.1277 17.7603 19.2754 17.6567C19.4502 17.5342 19.5728 17.3291 19.8179 16.919L20.2773 16.1504C20.536 15.7175 20.6654 15.501 20.6877 15.2793C20.7065 15.0921 20.6721 14.9034 20.5885 14.7349C20.4895 14.5353 20.2921 14.3783 19.8974 14.0643L19.1726 13.4879C18.9207 13.2876 18.7948 13.1875 18.7159 13.0801C18.6306 12.9641 18.5942 12.8887 18.5564 12.7497C18.5215 12.6211 18.5215 12.414 18.5215 12C18.5215 11.586 18.5215 11.379 18.5564 11.2504C18.5942 11.1114 18.6306 11.036 18.7159 10.9199C18.7948 10.8126 18.9207 10.7124 19.1725 10.5122L19.8974 9.9357C20.2922 9.62176 20.4896 9.46479 20.5886 9.26517C20.6722 9.09664 20.7065 8.90795 20.6877 8.72076C20.6654 8.49906 20.5361 8.28259 20.2773 7.84964L19.8179 7.08102C19.5728 6.67093 19.4503 6.46588 19.2755 6.34332C19.1277 6.23977 18.9548 6.1781 18.7748 6.16486C18.5619 6.14919 18.3373 6.23048 17.888 6.39307L16.8745 6.75989C16.5778 6.86725 16.4295 6.92093 16.2971 6.93195C16.167 6.94278 16.0884 6.93601 15.9621 6.90313C15.8335 6.86965 15.6604 6.77077 15.3142 6.57302C15.2877 6.55791 15.2611 6.54298 15.2345 6.52822C14.8725 6.3281 14.6915 6.22804 14.5936 6.13166C14.4976 6.03703 14.4502 5.97047 14.3923 5.84869C14.3334 5.72467 14.3055 5.56332 14.2499 5.24064L14.0938 4.3363Z"
      fill="#707070"
    />
  </svg>

  <div v-if="gear === 1">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Номер ЗК</th>
          <th scope="col">ФИО</th>
          <th scope="col">Основа обучения</th>
          <th scope="col">Логин</th>
          <th scope="col">Пароль</th>
          <th scope="col">Статус</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(student, index) in students" :key="index">
        <tr>
          <td>{{ student.id }}</td>
          <td>{{ student.number_student_book }}</td>
          <td>{{ student.first_name }} {{ student.middle_name }} {{ student.last_name }}</td>
          <td>{{ student.education_base ? student.education_base.name : "" }}</td>
          <td>{{ student.username }}</td>
          <td>
            <span v-if="!student.showPassword" @click="togglePassword(student)" style="cursor: pointer">
              *********
            </span>
            <span v-else @click="togglePassword(student)">
              {{ student.password_text }}
            </span>
          </td>
          <td>{{ student.student_status ? student.student_status.name : "" }}</td>
          <td><Edit @click="openModalEdit(index)" /></td>
          <td><Delete @click="deleteStudent(student.id)" /></td>
        </tr>
      </tbody>
      <tbody v-if="students.length === 0">
        <tr>
          <td colspan="9" class="text-center">Ничего не найдено</td>
        </tr>
      </tbody>
    </table>
    <div class="icon-add">
      <Add @click="openModal()" />
    </div>

    <div v-show="modalActive || modalActiveEdit">
      <div
        @click="
          modalActive = false;
          modalActiveEdit = false;
          this.errors = '';
        "
        class="modal-wrapper"
      ></div>
      <div class="modal-window modal-create-user">
        <h4 class="modal-title py-3 fw-bold">{{ modalTitle }}</h4>
        <svg
          @click="
            modalActive = false;
            modalActiveEdit = false;
            this.errors = '';
          "
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
        <div class="form-wrapper">
          <div class="form-item">
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Фамилия</label>
              <input
                v-model="form.last_name"
                type="text"
                class="form-control form-modal"
                placeholder="Введите тип выпуска "
              />
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Имя</label>
              <input
                v-model="form.first_name"
                type="text"
                class="form-control form-modal"
                placeholder="Введите тип выпуска "
              />
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Отчество</label>
              <input
                v-model="form.middle_name"
                type="text"
                class="form-control form-modal"
                placeholder="Введите тип выпуска "
              />
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Логин</label>
              <input v-model="form.username" type="text" class="form-control form-modal" placeholder="Введите логин" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Номер зачётной книжки</label>
              <input
                v-model="form.number_student_book"
                type="text"
                class="form-control form-modal"
                placeholder="Введите номер зачетной "
              />
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Основа обучения</label>
              <select v-model="form.education_base" class="form-select form-modal">
                <option
                  v-for="education_base in education_bases"
                  v-bind:key="education_base.id"
                  :value="education_base.id"
                >
                  {{ education_base.name }}
                </option>
              </select>
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Статус студента</label>
              <select v-model="form.student_status" class="form-select form-modal">
                <option
                  v-for="student_status in student_statuses"
                  v-bind:key="student_status.id"
                  :value="student_status.id"
                >
                  {{ student_status.name }}
                </option>
              </select>
            </div>
            <div class="form-outline mb-3">
              <label class="form-label fw-bold ms-4">Пароль</label>
              <div class="input-group mb-3">
                <input
                  v-model="form.password_text"
                  class="form-control form-modal"
                  placeholder="Введите или сгенерируйте пароль"
                />
                <button class="btn btn-outline-secondary" @click="generatePassword">Сгенерировать пароль</button>
              </div>
            </div>
          </div>
        </div>

        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>

        <div class="btn-modal-wrapper">
          <button class="btn-modal" @click="modalAction">{{ modalActionText }}</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="gear === 2" style="margin: 15px">
    <ul class="nav">
      <li class="nav-item" v-for="(category, index) in categoriesData" :key="index">
        <a
          class="nav-link-graduate"
          :class="{ active: selectedCategory === category.name }"
          @click="showCategory(category)"
          aria-current="page"
          href="#"
          >{{ category.name }}</a
        >
      </li>
    </ul>

    <div class="card">
      <div v-if="filteredConsultations.length > 0" class="table-responsive">
        <div v-for="(consultation, consultationIndex) in filteredConsultations" :key="consultationIndex">
          <div class="distriburion">Распределенные:</div>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Студент</th>
                <th scope="col">Преподаватель</th>
                <th scope="col">Норма времени</th>
                <th scope="col">Комментарий</th>
                <th scope="col">Статус</th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(relation, relationIndex) in consultation.assigned" :key="relationIndex">
                <td>
                  {{ relation.student.first_name }} {{ relation.student.middle_name }} {{ relation.student.last_name }}
                </td>
                <td>
                  {{ relation.teacher.first_name }} {{ relation.teacher.middle_name }} {{ relation.teacher.last_name }}
                </td>
                <td>{{ consultation.hours }}</td>
                <td>{{ relation.comment }}</td>
                <td>{{ relation.student.student_status ? relation.student.student_status.name : "" }}</td>
                <td><Edit @click="openModalEditConsultancy(relation.id, consultation.is_main)" /></td>
              </tr>
            </tbody>
          </table>
          <div class="icon-add">
            <Add @click="openModalConsultancy(consultation.is_main)" />
          </div>
        </div>
        <div class="distriburion">Нераспределенные:</div>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Студент</th>
              <th scope="col">Преподаватель</th>
              <th scope="col">Норма времени</th>
              <th scope="col">Комментарий</th>
              <th scope="col">Статус</th>
            </tr>
          </thead>

          <tbody v-for="(consultation, index) in filteredConsultations" :key="index">
            <tr v-for="(relation, index) in consultation.not_assigned" :key="index">
              <td>
                {{ relation.first_name }}
                {{ relation.middle_name }}
                {{ relation.last_name }}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {{ relation.student_status ? relation.student_status.name : "" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-show="modalConsultancy">
    <div
      @click="
        modalConsultancy = false;
        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">Добавить</h4>
      <svg
        @click="
          modalConsultancy = false;
          this.errors = '';
        "
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

      <div class="form-wrapper"></div>
      <div class="form-outline mb-3">
        <label class="form-label fw-bold ms-4">Преподаватель</label>
        <select v-model="form.teacher" class="form-select form-modal">
          <option v-for="teacher in teachers" v-bind:key="teacher.id" :value="teacher.id">
            {{ teacher.first_name }} {{ teacher.middle_name }} {{ teacher.last_name }}
          </option>
        </select>
      </div>
      <div class="form-outline mb-3">
        <label class="form-label fw-bold ms-4">Студент</label>
        <select v-model="form.student" class="form-select form-modal">
          <option v-for="student in students" v-bind:key="student.id" :value="student.id">
            {{ student.first_name }} {{ student.middle_name }} {{ student.last_name }}
          </option>
        </select>
      </div>

      <div class="form-outline mb-3">
        <label class="form-label fw-bold ms-4" :for="isMain ? 'comment' : 'comment'">Заявка</label>
        <input
          v-model="selectedField"
          type="text"
          class="form-control form-modal"
          placeholder="Введите текст заявки"
          :id="isMain ? 'comment' : 'comment'"
        />
      </div>

      <template v-if="errors.length > 0">
        <div class="alert alert-danger mt-3">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>
      </template>

      <div class="btn-modal-wrapper">
        <button @click="addConsultancy" class="btn-modal">Добавить</button>
      </div>
    </div>
  </div>

  <div v-show="modalEditConsultancy">
    <div
      @click="
        modalEditConsultancy = false;
        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">Редактировать</h4>
      <svg
        @click="
          modalEditConsultancy = false;
          this.errors = '';
        "
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

      <div class="form-wrapper"></div>
      <div class="form-outline mb-3">
        <label class="form-label fw-bold ms-4">Преподаватель</label>
        <select v-model="form.teacher" class="form-select form-modal">
          <option v-for="teacher in teachers" v-bind:key="teacher.id" :value="teacher.id">
            {{ teacher.first_name }} {{ teacher.middle_name }} {{ teacher.last_name }}
          </option>
        </select>
      </div>
      <div class="form-outline mb-3">
        <label class="form-label fw-bold ms-4">Студент</label>
        <select v-model="form.student" class="form-select form-modal" disabled>
          <option v-for="student in students" v-bind:key="student.id" :value="student.id">
            {{ student.first_name }} {{ student.middle_name }} {{ student.last_name }}
          </option>
        </select>
      </div>

      <div class="form-outline mb-3">
        <label class="form-label fw-bold ms-4" :for="isMain ? 'comment' : 'comment'">Заявка</label>
        <input
          v-model="selectedField"
          type="text"
          class="form-control form-modal"
          placeholder="Введите текст заявки"
          :id="isMain ? 'comment' : 'comment'"
        />
      </div>

      <template v-if="errors.length > 0">
        <div class="alert alert-danger mt-3">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>
      </template>

      <div class="btn-modal-wrapper">
        <button @click="editConsultancy" class="btn-modal">Редактировать</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CustomAlert from "./CustomAlert.vue";
import CustomConfirm from "./CustomConfirm.vue";

export default {
  name: "GroupItem",
  props: {
    groupId: Number,
  },
  data() {
    return {
      activeIndex: 0,
      counter: "Руководство ВКР",
      form: {
        first_name: "",
        last_name: "",
        middle_name: "",
        number_student_book: "",
        education_base: "",
        student_status: "",
        password: "",
        student_group: this.groupId,
        role: 1,
      },
      consultationId: null,
      groups: [],
      group: null,
      modalActiveEdit: false,
      modalEditConsultancy: false,
      modalConsultancy: false,
      errors: [],
      teachers: [],
      students: [],
      education_forms: [],
      gear: 1,
      modalActive: false,
      education_bases: [],
      student_statuses: [],

      students: [],
      errors: [],
      consultations: [],
      categoriesData: [],
      selectedCategory: null,
    };
  },
  mounted() {
    this.getStudents();
    this.getEducationBase();
    this.getStudentStatus();
    this.getConsultations();
    this.getGroup();
    this.getTeachers();
    this.getConsultancyTypes();
    this.getConsultancy();
    this.getTickets();
  },
  computed: {
    filteredConsultations() {
      return this.consultations.filter((consultation) => {
        return consultation.name === this.selectedCategory;
      });
    },
    isMain() {
      return this.form.is_main;
    },
    selectedField: {
      get() {
        return this.isMain ? this.form.comment : this.form.comment;
      },
      set(value) {
        if (this.isMain) {
          this.form.comment = value;
        } else {
          this.form.comment = value;
        }
      },
    },
  },
  components: {
    CustomAlert,
    CustomConfirm,
  },
  created() {
    axios
      .get(`${API_URL}students_by_consultancy/${this.groupId}`)
      .then((response) => {
        this.categoriesData = response.data;

        if (this.categoriesData.length > 0) {
          this.selectedCategory = this.categoriesData.name;
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  },
  methods: {
    showCategory(category) {
      this.selectedCategory = category.name;
      this.form.consultancy_type = category.id;
    },
    async addForm() {
      this.errors = [];

      if (this.form.first_name === undefined || this.form.first_name.trim() === "") {
        this.errors.push(ERRORS.first_name);
      }

      if (this.form.last_name === undefined || this.form.last_name.trim() === "") {
        this.errors.push(ERRORS.last_name);
      }

      if (this.form.middle_name === undefined || this.form.middle_name.trim() === "") {
        this.errors.push(ERRORS.middle_name);
      }

      if (this.form.username === undefined || this.form.username.trim() === "") {
        this.errors.push(ERRORS.login);
      }

      if (this.form.password_text === undefined || this.form.password_text.trim() === "") {
        this.errors.push(ERRORS.password);
      } else {
        this.form.password = this.form.password_text;
      }

      if (this.errors.length === 0) {
        this.form.student_group = this.groupId; // Добавьте информацию о группе студента
        await axios
          .post(`${API_URL}user/`, this.form)
          .then((response) => {
            this.modalActive = false;
            this.getStudents();

            this.showAlert("Информация добавлена");
          })
          .catch((error) => {
            Object.keys(error.response.data).forEach((field) => {
              if (Array.isArray(error.response.data[field])) {
                error.response.data[field].forEach((errorMessage) => {
                  this.errors.push(`${field}: ${errorMessage}`);
                });
              } else if (typeof error.response.data[field] === "string") {
                this.errors.push(`${field}: ${error.response.data[field]}`);
              } else {
                this.errors.push(`${field}: An unknown error occurred`);
              }
            });
          });
      }
    },
    async submitForm() {
      this.errors = [];

      if (this.form.first_name === undefined || this.form.first_name.trim() === "") {
        this.errors.push(ERRORS.first_name);
      }

      if (this.form.last_name === undefined || this.form.last_name.trim() === "") {
        this.errors.push(ERRORS.last_name);
      }

      if (this.form.middle_name === undefined || this.form.middle_name.trim() === "") {
        this.errors.push(ERRORS.middle_name);
      }

      if (this.form.username === undefined || this.form.username.trim() === "") {
        this.errors.push(ERRORS.login);
      }

      if (this.form.password_text === undefined || this.form.password_text.trim() === "") {
        this.errors.push(ERRORS.password);
      } else {
        this.form.password = this.form.password_text;
      }

      if (this.errors.length === 0) {
        await axios
          .patch(`${API_URL}user/${this.form.id}/`, this.form)
          .then((response) => {
            this.getStudents();
            this.modalActiveEdit = false;
            this.showAlert("Информация обновлена");
          })
          .catch((error) => {
            Object.keys(error.response.data).forEach((field) => {
              if (Array.isArray(error.response.data[field])) {
                error.response.data[field].forEach((errorMessage) => {
                  this.errors.push(`${field}: ${errorMessage}`);
                });
              } else if (typeof error.response.data[field] === "string") {
                this.errors.push(`${field}: ${error.response.data[field]}`);
              } else {
                this.errors.push(`${field}: An unknown error occurred`);
              }
            });
          });
      }
    },

    async addConsultancy() {
      this.errors = [];

      if (this.errors.length === 0) {
        let patchURL = "";
        if (this.form.is_main) {
          // Если консультация is_main, используйте один URL
          patchURL = `${API_URL}ticket/`;
        } else {
          // В противном случае, используйте другой URL
          patchURL = `${API_URL}consultancy/`;
        }

        this.form.ticket_status = 2;
        await axios
          .post(patchURL, this.form)
          .then((response) => {
            this.getConsultations();
            this.modalConsultancy = false;
            this.showAlert("Информация добавлена");
          })
          .catch((error) => {
            Object.keys(error.response.data).forEach((field) => {
              if (Array.isArray(error.response.data[field])) {
                error.response.data[field].forEach((errorMessage) => {
                  this.errors.push(`${field}: ${errorMessage}`);
                });
              } else if (typeof error.response.data[field] === "string") {
                this.errors.push(`${field}: ${error.response.data[field]}`);
              } else {
                this.errors.push(`${field}: An unknown error occurred`);
              }
            });
          });
      }
    },

    async editConsultancy() {
      this.errors = [];

      if (this.errors.length === 0) {
        let patchURL = "";
        if (this.form.is_main) {
          // Если консультация is_main, используйте один URL
          patchURL = `${API_URL}ticket/${this.form.id}/`;
        } else {
          // В противном случае, используйте другой URL
          patchURL = `${API_URL}consultancy/${this.form.id}/`;
        }

        await axios
          .put(patchURL, this.form)
          .then((response) => {
            this.getConsultations();
            this.modalEditConsultancy = false;
            this.showAlert("Информация обновлена");
          })
          .catch((error) => {
            Object.keys(error.response.data).forEach((field) => {
              if (Array.isArray(error.response.data[field])) {
                error.response.data[field].forEach((errorMessage) => {
                  this.errors.push(`${field}: ${errorMessage}`);
                });
              } else if (typeof error.response.data[field] === "string") {
                this.errors.push(`${field}: ${error.response.data[field]}`);
              } else {
                this.errors.push(`${field}: An unknown error occurred`);
              }
            });
          });
      }
    },

    togglePassword(student) {
      student.showPassword = !student.showPassword;
    },

    showAlert(message) {
      this.$refs.alertComponent.show(message);
    },

    generatePassword() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&()";
      let generatedPassword = "";

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        generatedPassword += chars[randomIndex];
      }

      this.form.password = generatedPassword;
      this.form.password_text = generatedPassword;
    },
    getStudents() {
      axios.get(`${API_URL}user_unsafe?student_group=${this.groupId}`).then((res) => {
        console.log(this.groupId);
        this.students = res.data;
      });
    },

    getGroup() {
      axios.get(`${API_URL}student_group/${this.groupId}`).then((res) => {
        this.group = res.data;
      });
    },
    getEducationBase() {
      axios.get(`${API_URL}education_base/`).then((response) => {
        this.education_bases = response.data;
      });
    },
    getStudentStatus() {
      axios.get(`${API_URL}stud_status/`).then((response) => {
        this.student_statuses = response.data;
      });
    },

    getConsultations() {
      axios.get(`${API_URL}students_by_consultancy/${this.groupId}`).then((response) => {
        this.consultations = response.data;
      });
    },

    getConsultancy() {
      axios.get(`http://localhost:8000/api/consultancy/`).then((response) => {
        this.consultancies = response.data;
        console.log(this.consultancies);
      });
    },

    getConsultancyTypes() {
      axios.get(`${API_URL}consultancy_type/`).then((response) => {
        this.consultancy_types = response.data;
      });
    },
    getTeachers() {
      axios.get(`${API_URL}user?role=2`).then((res) => {
        this.teachers = res.data;
        this.isLoading = false;
        console.log(this.teachers);
      });
    },

    getTickets() {
      axios.get(`${API_URL}ticket/`).then((response) => {
        this.tickets = response.data;
        this.isLoading = false;
        console.log(this.tickets);
      });
    },

    setActive(index) {
      this.activeIndex = index;
    },
    deleteStudent(StudentId) {
      this.$refs.confirmComponent
        .show("Вы уверены что хотите удалить учетную запись этого студента?")
        .then((confirmed) => {
          if (confirmed) {
            axios.delete(`${API_URL}user/${StudentId}`).then((response) => {
              this.getStudents();
              this.showAlert("Учетная запись студента удалена");
            });
          }
        });
    },
    openModalEdit(StudentId) {
      this.modalTitle = "Редактировать";
      this.modalAction = this.submitForm;
      this.modalActionText = "Редактировать";

      this.form = { ...this.students[StudentId] };
      this.modalActiveEdit = true;
      this.form.first_name = this.students[StudentId]?.first_name;
      this.form.last_name = this.students[StudentId]?.last_name;
      this.form.middle_name = this.students[StudentId]?.middle_name;
      this.form.number_student_book = this.students[StudentId]?.number_student_book;
      this.form.username = this.students[StudentId]?.username;
      this.form.education_base = this.students[StudentId]?.education_base?.id;
      this.form.student_status = this.students[StudentId]?.student_status?.id;
      this.form.password_text = this.students[StudentId]?.password_text;

      this.form.role = this.students[StudentId]?.role?.id;
    },
    openModal() {
      this.modalActive = true;
      this.modalTitle = "Добавить";
      this.modalAction = this.addForm;
      this.modalActionText = "Добавить";
      this.form = {
        role: 1,
      };
    },
    openModalConsultancy(isMain) {
      if (typeof isMain !== "undefined") {
        this.form.is_main = isMain;
        this.modalConsultancy = true;
        this.form.dt_send = new Date().toLocaleDateString("ru-RU");
        this.form.teacher = "";
        this.form.student = "";

        this.form.comment = "";
      } else {
        this.modalConsultancy = true;
        this.form.is_main = false;
        this.form.dt_send = new Date().toLocaleDateString("ru-RU");
        this.form.teacher = "";
        this.form.student = "";
        this.form.comment = "";
      }
    },

    openModalEditConsultancy(consultationId, isMain) {
      // Найдите консультацию с указанным consultationId в массиве this.consultancies
      const consultation = this.consultancies.find((consultation) => consultation.id === consultationId);

      // Найдите главную консультацию с указанным consultationId в массиве this.tickets
      const isMainConsultation = this.tickets.find((consultation) => consultation.id === consultationId);

      console.log(consultation);
      console.log(isMainConsultation);

      if (isMain) {
        const dtSendDate = new Date();
        this.form.id = isMainConsultation.id;
        this.form.teacher = isMainConsultation.teacher.id;
        this.form.student = isMainConsultation.student.id;
        this.form.comment = isMainConsultation.comment;
        this.form.dt_send = dtSendDate.toLocaleDateString("ru-RU");

        this.form.is_main = true;
      } else {
        this.form.id = consultation.id;
        this.form.teacher = consultation.teacher;
        this.form.student = consultation.student;
        this.form.comment = consultation.comment;
        this.form.is_main = false;
      }

      this.modalEditConsultancy = true;
    },
    // openModalEditConsultancy(consultationId) {
    //   const isMainConsultation = this.categoriesData.find((consultation) =>
    //     categoriesData.is_main === true ? consultation.id === consultationId : (categoriesData.id = consultationId)
    //   );
    //   // Найдите консультацию с указанным consultationId в массиве this.consultations
    //   const consultation = this.consultancies.find((consultation) => consultation.id === consultationId);
    //   console.log(consultation);
    //   // Теперь, consultation должен содержать данные консультации
    //   if (consultation) {
    //     // Заполните данные для редактирования
    //     this.form.id = consultation.id;
    //     this.form.teacher = consultation.teacher ? consultation.teacher : null;
    //     this.form.student = consultation.student ? consultation.student : null;
    //     this.form.comment = consultation.comment;
    //     console.log(this.form.teacher);
    //     // Откройте модальное окно редактирования
    //     this.modalEditConsultancy = true;
    //   }
    // },
  },
  watch: {
    groupId: "getGroup",
  },
};
</script>

<style>
.distriburion {
  font-size: 20px;
  margin: 30px 0 0 20px;
  font-weight: 700;
}
</style>
