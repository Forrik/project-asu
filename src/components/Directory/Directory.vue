<script setup>
import Delete from "../icons/Delete.vue";
import Edit from "../icons/Edit.vue";
import Add from "../icons/Add.vue";
import CustomAlert from "../CustomAlert.vue";
import CustomConfirm from "../CustomConfirm.vue";
</script>

<template>
  <div class="row">
    <CustomAlert ref="alertComponent" />
    <CustomConfirm ref="confirmComponent" />
    <div class="col-3"></div>
    <div class="col-8 content">
      <div v-if="showCards">
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <Card :title="'Должность'" @showTable="showTable('positions')" />
          <Card :title="'Ученое звание'" @showTable="showTable('academicTitles')" />
          <Card :title="'Ученая степень'" @showTable="showTable('academicDegrees')" />
          <Card :title="'Статус студента'" @showTable="showTable('studentStatus')" />
        </div>
      </div>
      <div v-if="showCards">
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <Card :title="'Тип консультации'" @showTable="showTable('consultationTypes')" />
          <Card :title="'Уровень образования'" @showTable="showTable('educationLevels')" />
          <Card :title="'Форма обучения'" @showTable="showTable('educationForms')" />
          <Card :title="'Основа образования'" @showTable="showTable('educationBases')" />
        </div>
      </div>

      <div v-if="!showCards">
        <button @click="goBack" class="btn btn-primary">Назад</button>
      </div>
      <div class="card">
        <div class="table-responsive">
          <div v-if="showPositions">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Должность</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(position, index) in positions" :key="index">
                  <td>{{ position.id }}</td>
                  <td>{{ position.name }}</td>
                  <td><Edit @click="openModaLPosition(index)" /></td>
                  <td><Delete @click="deletePosition(position.id)" /></td>
                </tr>
                <tr v-if="positions.length === 0">
                  <td colspan="4">Здесь пока ничего нет</td>
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
              <Add @click="openModaLPosition()" />
            </div>
          </div>

          <div v-if="showAcademicTitles">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Аббревиатура</th>
                  <th>Ученое звание</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(academic_title, index) in academic_titles" :key="index">
                  <td>{{ academic_title.id }}</td>
                  <td>{{ academic_title.abbreviation }}</td>
                  <td>{{ academic_title.name }}</td>
                  <td><Edit @click="openModalAcademicTitle(index)" /></td>
                  <td><Delete @click="deleteAcademicTitle(academic_title.id)" /></td>
                </tr>
                <tr v-if="academic_titles.length === 0">
                  <td colspan="4">Здесь пока ничего нет</td>
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
              <Add @click="openModalAcademicTitle()" />
            </div>
          </div>

          <div v-if="showAcademicDegree">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Аббревиатура</th>
                  <th>Ученая степень</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(academic_degree, index) in academic_degrees" :key="index">
                  <td>{{ academic_degree.id }}</td>
                  <td>{{ academic_degree.abbreviation }}</td>
                  <td>{{ academic_degree.name }}</td>
                  <td><Edit @click="openModalAcademicDegree(index)" /></td>
                  <td><Delete @click="deleteAcademicDegree(academic_degree.id)" /></td>
                </tr>
                <tr v-if="academic_degrees.length === 0">
                  <td colspan="4">Здесь пока ничего нет</td>
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
              <Add @click="openModalAcademicDegree()" />
            </div>
          </div>

          <div v-if="showStudentStatus">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Статус студента</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student_status, index) in student_statuses" :key="index">
                  <td>{{ student_status.id }}</td>
                  <td>{{ student_status.name }}</td>
                  <td><Edit @click="openModalStudentStatus(index)" /></td>
                  <td><Delete @click="deleteStudentStatus(student_status.id)" /></td>
                </tr>
                <tr v-if="student_statuses.length === 0">
                  <td colspan="4">Здесь пока ничего нет</td>
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
              <Add @click="openModalStudentStatus()" />
            </div>
          </div>

          <div v-if="showConsultationTypes">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Тип консультации</th>
                  <th>Основной</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(consultancy_type, index) in consultancy_types" :key="index">
                  <td>{{ consultancy_type.id }}</td>
                  <td>{{ consultancy_type.name }}</td>
                  <td>{{ consultancy_type.is_main === true ? "Да" : "Нет" }}</td>
                  <td><Edit @click="openModalConsultancyType(index)" /></td>
                  <td><Delete @click="deleteConsultancyType(consultancy_type.id)" /></td>
                </tr>
                <tr v-if="consultancy_types.length === 0">
                  <td colspan="4">Здесь пока ничего нет</td>
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
              <Add @click="openModalConsultancyType()" />
            </div>
          </div>

          <div v-if="showEducationLevels">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Уровень образования</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(education_level, index) in education_levels" :key="index">
                  <td>{{ education_level.id }}</td>
                  <td>{{ education_level.name }}</td>
                  <td><Edit @click="openModalEducationLevel(index)" /></td>
                  <td><Delete @click="deleteEducationLevel(education_level.id)" /></td>
                </tr>
                <tr v-if="education_levels.length === 0">
                  <td colspan="4">Здесь пока ничего нет</td>
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
              <Add @click="openModalEducationLevel()" />
            </div>
          </div>

          <div v-if="showEducationForms">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Форма обучения</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(education_form, index) in education_forms" :key="index">
                  <td>{{ education_form.id }}</td>
                  <td>{{ education_form.name }}</td>
                  <td><Edit @click="openModalEducationForm(index)" /></td>
                  <td><Delete @click="deleteEducationForm(education_form.id)" /></td>
                </tr>
                <tr v-if="education_forms.length === 0">
                  <td colspan="4">Здесь пока ничего нет</td>
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
              <Add @click="openModalEducationForm()" />
            </div>
          </div>

          <div v-if="showEducationBase">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Уровень образования</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(education_base, index) in education_bases" :key="index">
                  <td>{{ education_base.id }}</td>
                  <td>{{ education_base.name }}</td>
                  <td><Edit @click="openModalEducationBase(index)" /></td>
                  <td><Delete @click="deleteEducationBase(education_base.id)" /></td>
                </tr>
                <tr v-if="education_bases.length === 0">
                  <td colspan="4">Здесь пока ничего нет</td>
                </tr>
              </tbody>
            </table>
            <div class="icon-add">
              <Add @click="openModalEducationBase()" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="modalPosition">
    <div
      @click="
        closeModal();
        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">{{ isEditing ? "Редактировать" : "Добавить" }}</h4>
      <svg
        @click="
          closeModal();
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
      <div>
        <div class="form-wrapper">
          <div class="form-outline mb-3">
            <label class="form-label fw-bold ms-4">Должность</label>
            <input v-model="form.name" class="form-control form-modal" placeholder="Введите должность" />
          </div>
        </div>
        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>
        <div class="btn-modal-wrapper">
          <button @click="saveRecord('position', 'positions')" class="btn-modal">
            {{ isEditing ? "Редактировать" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-show="modalAcademicTitle">
    <div
      @click="
        modalAcademicTitle = false;

        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">{{ isEditing ? "Редактировать" : "Добавить" }}</h4>
      <svg
        @click="
          modalAcademicTitle = false;

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
      <div>
        <div class="form-wrapper"></div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Ученое звание</label>
          <input v-model="form.name" class="form-control form-modal" placeholder="Введите ученое звание" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Аббревиатура</label>
          <input v-model="form.abbreviation" class="form-control form-modal" placeholder="Введите аббревиатуру" />
        </div>
        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>
        <div class="btn-modal-wrapper">
          <button @click="saveRecord('academic_title', 'academic_titles')" class="btn-modal">
            {{ isEditing ? "Редактировать" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-show="modalAcademicDegree">
    <div
      @click="
        modalAcademicDegree = false;

        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">{{ isEditing ? "Редактировать" : "Добавить" }}</h4>
      <svg
        @click="
          modalAcademicDegree = false;

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
      <div>
        <div class="form-wrapper"></div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Ученая степень</label>
          <input v-model="form.name" class="form-control form-modal" placeholder="Введите ученую степень" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Аббревиатура</label>
          <input v-model="form.abbreviation" class="form-control form-modal" placeholder="Введите аббревиатуру" />
        </div>
        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>
        <div class="btn-modal-wrapper">
          <button @click="saveRecord('academic_degree', 'academic_degrees')" class="btn-modal">
            {{ isEditing ? "Редактировать" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-show="modalStudentStatus">
    <div
      @click="
        modalStudentStatus = false;

        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">{{ isEditing ? "Редактировать" : "Добавить" }}</h4>
      <svg
        @click="
          modalStudentStatus = false;

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
      <div>
        <div class="form-wrapper"></div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Статус студента</label>
          <input v-model="form.name" class="form-control form-modal" placeholder="Введите статус студента" />
        </div>
        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>
        <div class="btn-modal-wrapper">
          <button @click="saveRecord('stud_status', 'student_statuses')" class="btn-modal">
            {{ isEditing ? "Редактировать" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-show="modalConsultancyType">
    <div
      @click="
        modalConsultancyType = false;

        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">{{ isEditing ? "Редактировать" : "Добавить" }}</h4>
      <svg
        @click="
          modalConsultancyType = false;

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
      <div>
        <div class="form-wrapper"></div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Тип консультации</label>
          <input v-model="form.name" class="form-control form-modal" placeholder="Введите тип консультации" />
        </div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4 checkbox_label">Главный тип консультации</label>

          <input class="form-check-input checkbox" role="switch" type="checkbox" v-model="form.is_main" />
        </div>

        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>
        <div class="btn-modal-wrapper">
          <button @click="saveRecord('consultancy_type', 'consultancy_types')" class="btn-modal">
            {{ isEditing ? "Редактировать" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-show="modalEducationLevel">
    <div
      @click="
        modalEducationLevel = false;

        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">{{ isEditing ? "Редактировать" : "Добавить" }}</h4>
      <svg
        @click="
          modalEducationLevel = false;

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
      <div>
        <div class="form-wrapper"></div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Тип консультации</label>
          <input v-model="form.name" class="form-control form-modal" placeholder="Введите тип консультации" />
        </div>

        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>
        <div class="btn-modal-wrapper">
          <button @click="saveRecord('edu_level', 'education_levels')" class="btn-modal">
            {{ isEditing ? "Редактировать" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-show="modalEducationForm">
    <div
      @click="
        modalEducationForm = false;

        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">{{ isEditing ? "Редактировать" : "Добавить" }}</h4>
      <svg
        @click="
          modalEducationForm = false;

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
      <div>
        <div class="form-wrapper"></div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Форма обучения</label>
          <input v-model="form.name" class="form-control form-modal" placeholder="Введите форму обучения" />
        </div>

        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>
        <div class="btn-modal-wrapper">
          <button @click="saveRecord('edu_form', 'education_forms')" class="btn-modal">
            {{ isEditing ? "Редактировать" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-show="modalEducationBase">
    <div
      @click="
        modalEducationBase = false;

        this.errors = '';
      "
      class="modal-wrapper"
    ></div>
    <div class="modal-window modal-create-user">
      <h4 class="modal-title py-3 fw-bold">{{ isEditing ? "Редактировать" : "Добавить" }}</h4>
      <svg
        @click="
          modalEducationBase = false;

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
      <div>
        <div class="form-wrapper"></div>
        <div class="form-outline mb-3">
          <label class="form-label fw-bold ms-4">Основа обучения</label>
          <input v-model="form.name" class="form-control form-modal" placeholder="Введите основу обучения" />
        </div>

        <template v-if="errors.length > 0">
          <div class="alert alert-danger mt-3">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>
        <div class="btn-modal-wrapper">
          <button @click="saveRecord('education_base', 'education_bases')" class="btn-modal">
            {{ isEditing ? "Редактировать" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./Card.vue";

export default {
  name: "Directory",
  data() {
    return {
      showCards: true,
      showPositions: false,
      showAcademicTitles: false,
      showAcademicDegrees: false,
      showStudentStatus: false,
      showConsultationTypes: false,
      showEducationLevels: false,
      showEducationForms: false,
      showEducationBase: false,
      modalActiveEdit: false,
      modalPosition: false,
      modalAcademicTitle: false,
      isEditing: false,
      positions: [],
      academic_titles: [],
      academic_degrees: [],
      student_statuses: [],
      consultancy_types: [],
      education_levels: [],
      education_forms: [],
      education_bases: [],
      errors: [],
      form: {
        name: "",
      },
    };
  },
  components: {
    CustomAlert,
    CustomConfirm,
    Card,
  },
  mounted() {
    this.getPositions();
    this.getAcademicTitles();
    this.getAcademicDegrees();
    this.getStudentStatus();
    this.getConsultancyTypes();
    this.getEducationLevels();
    this.getEducationForms();
    this.getEducationBases();
  },
  methods: {
    handleErrors(error) {
      Object.keys(error.response.data).forEach((field) => {
        if (Array.isArray(error.response.data[field])) {
          error.response.data[field].forEach((errorMessage) => {
            this.errors.push(`${field}: ${errorMessage}`);
          });
        }
      });
    },
    confirmAction(message) {
      this.$refs.confirmComponent
        .show(message)
        .then((confirmed) => {
          if (confirmed) {
          } else {
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    showAlert(message) {
      this.$refs.alertComponent.show(message);
    },
    showTable(type) {
      this.showCards = false;
      this.showPositions = false;
      this.showAcademicTitles = false;
      this.showAcademicDegree = false;
      this.showStudentStatus = false;
      this.showConsultationTypes = false;
      this.showEducationLevels = false;
      this.showEducationForms = false;
      this.showEducationBase = false;

      if (type === "positions") {
        this.showPositions = true;
      } else if (type === "academicTitles") {
        this.showAcademicTitles = true;
      } else if (type === "academicDegrees") {
        this.showAcademicDegree = true;
      } else if (type === "studentStatus") {
        this.showStudentStatus = true;
      } else if (type === "consultationTypes") {
        this.showConsultationTypes = true;
      } else if (type === "educationLevels") {
        this.showEducationLevels = true;
      } else if (type === "educationForms") {
        this.showEducationForms = true;
      } else if (type === "educationBases") {
        this.showEducationBase = true;
      }
    },

    goBack() {
      this.showCards = true;
      this.showPositions = false;
      this.showAcademicTitles = false;
      this.showAcademicDegree = false;
      this.showStudentStatus = false;
      this.showConsultationTypes = false;
      this.showEducationLevels = false;
      this.showEducationForms = false;
      this.showEducationBase = false;
    },

    openModaLPosition(index) {
      this.isEditing = index !== undefined;
      this.modalPosition = true;
      this.form = index !== undefined ? { ...this.positions[index] } : {};
    },

    openModalAcademicTitle(index) {
      this.isEditing = index !== undefined;
      this.modalAcademicTitle = true;
      this.form = index !== undefined ? { ...this.academic_titles[index] } : {};
    },

    openModalAcademicDegree(index) {
      this.isEditing = index !== undefined;
      this.modalAcademicDegree = true;
      this.form = index !== undefined ? { ...this.academic_degrees[index] } : {};
    },

    openModalStudentStatus(index) {
      this.isEditing = index !== undefined;
      this.modalStudentStatus = true;
      this.form = index !== undefined ? { ...this.student_statuses[index] } : {};
    },

    openModalConsultancyType(index) {
      this.isEditing = index !== undefined;
      this.modalConsultancyType = true;
      this.form = index !== undefined ? { ...this.consultancy_types[index] } : {};
    },
    openModalEducationLevel(index) {
      this.isEditing = index !== undefined;
      this.modalEducationLevel = true;
      this.form = index !== undefined ? { ...this.education_levels[index] } : {};
    },
    openModalEducationForm(index) {
      this.isEditing = index !== undefined;
      this.modalEducationForm = true;
      this.form = index !== undefined ? { ...this.education_forms[index] } : {};
    },
    openModalEducationBase(index) {
      this.isEditing = index !== undefined;
      this.modalEducationBase = true;
      this.form = index !== undefined ? { ...this.education_bases[index] } : {};
    },

    closeModal() {
      this.modalPosition = false;
      this.isEditing = false;
    },
    deletePosition(id) {
      this.$refs.confirmComponent.show("Вы уверены что хотите удалить эту должность?").then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}position/${id}`).then((res) => {
            this.showAlert("Должность удалена");
            this.getPositions();
          });
        }
      });
    },

    deleteAcademicTitle(id) {
      this.$refs.confirmComponent.show("Вы уверены что хотите удалить эту ученное звание?").then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}academic_title/${id}`).then((res) => {
            this.showAlert("Ученое звание удалено");
            this.getAcademicTitles();
          });
        }
      });
    },
    deleteAcademicDegree(id) {
      this.$refs.confirmComponent.show("Вы уверены что хотите удалить это ученную степень?").then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}academic_degree/${id}`).then((res) => {
            this.showAlert("Ученная степень удалена");
            this.getAcademicDegrees();
          });
        }
      });
    },

    deleteStudentStatus(id) {
      this.$refs.confirmComponent.show("Вы уверены что хотите удалить этот статус студента?").then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}stud_status/${id}`).then((res) => {
            this.showAlert("Статус студента удален");
            this.getStudentStatus();
          });
        }
      });
    },

    deleteConsultancyType(id) {
      this.$refs.confirmComponent.show("Вы уверены что хотите удалить этот тип консультации?").then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}consultancy_type/${id}`).then((res) => {
            this.showAlert("Тип консультации удален");
            this.getConsultancyTypes();
          });
        }
      });
    },
    deleteEducationLevel(id) {
      this.$refs.confirmComponent.show("Вы уверены что хотите удалить этот уровень образования?").then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}edu_level/${id}`).then((res) => {
            this.showAlert("Уровень образования удален");
            this.getEducationLevels();
          });
        }
      });
    },

    deleteEducationForm(id) {
      this.$refs.confirmComponent.show("Вы уверены что хотите удалить эту форму образования?").then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}edu_form/${id}`).then((res) => {
            this.showAlert("Форма образования удалена");
            this.getEducationForms();
          });
        }
      });
    },
    deleteEducationBase(id) {
      this.$refs.confirmComponent.show("Вы уверены что хотите удалить эту основу обучения?").then((confirmed) => {
        if (confirmed) {
          axios.delete(`${API_URL}education_base/${id}`).then((res) => {
            this.showAlert("Основа обучения удалена");
            this.getEducationBases();
          });
        }
      });
    },
    async saveRecord(endpoint, dataProperty) {
      this.errors = [];

      if (this.form.name === undefined || this.form.name.trim() === "") {
        this.errors.push("Имя не может быть пустым");
      }

      if (this.errors.length === 0) {
        try {
          if (this.isEditing) {
            const recordId = this.form.id;
            await axios.put(`${API_URL}${endpoint}/${recordId}/`, this.form);
          } else {
            await axios.post(`${API_URL}${endpoint}/`, this.form);
          }

          // После успешного сохранения или редактирования записи, вызываем fetchData для обновления списка
          this.fetchData(endpoint, dataProperty);

          this.modalPosition = false;
          this.modalAcademicDegree = false;
          this.modalAcademicTitle = false;
          this.modalStudentStatus = false;
          this.modalConsultancyType = false;
          this.modalEducationLevel = false;
          this.modalEducationForm = false;
          this.modalEducationBase = false;
          this.form.name = "";
          this.form.abbreviation = "";
          this.isEditing = false;
          this.showAlert("Запись успешно обновлена");
        } catch (error) {
          this.handleErrors(error);
        }
      }
    },

    async fetchData(endpoint, dataProperty) {
      try {
        const response = await axios.get(`${API_URL}${endpoint}/`);
        this[dataProperty] = response.data;
      } catch (error) {
        console.error(`Error fetching data for ${endpoint}:`, error);
      }
    },

    getPositions() {
      this.fetchData("position", "positions");
    },
    getAcademicTitles() {
      this.fetchData("academic_title", "academic_titles");
    },
    getAcademicDegrees() {
      this.fetchData("academic_degree", "academic_degrees");
    },
    getStudentStatus() {
      this.fetchData("stud_status", "student_statuses");
    },
    getConsultancyTypes() {
      this.fetchData("consultancy_type", "consultancy_types");
    },
    getEducationLevels() {
      this.fetchData("edu_level", "education_levels");
    },
    getEducationForms() {
      this.fetchData("edu_form", "education_forms");
    },
    getEducationBases() {
      this.fetchData("education_base", "education_bases");
    },
  },
};
</script>

<style scoped>
.checkbox {
  margin-left: 10px;
  width: 20px;
  height: 20px;
  border: 1px solid black;
}

.checkbox_label {
  font-size: 18px;
}
</style>
