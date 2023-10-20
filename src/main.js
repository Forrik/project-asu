import './assets/main.css'
import CustomAlert from './components/CustomAlert.vue'

import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'

import App from './App.vue'
import router from './router'

window.API_URL = 'http://localhost:8000/api/';

window.ERRORS = {

    code: 'Вы не ввели код',
    name: 'Вы не ввели наименование',
    abbreviation: 'Вы не ввели аббревиатуру',
    education_level: 'Вы не ввели уровень образования',
    login: 'Вы не ввели логин',
    password: 'Вы не ввели пароль',
    first_name: 'Вы не ввели имя',
    last_name: 'Вы не ввели фамилию',
    middle_name: 'Вы не ввели отчество',
    teacher: 'Вы не выбрали преподавателя',
    hours: 'Вы не ввели количество часов',

};


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('CustomAlert', CustomAlert)

app.mount('#app')