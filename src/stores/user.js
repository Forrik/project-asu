import {
    defineStore
} from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            isAdmin: false,
            isTeacher: false,
            isStudent: false,
            id: null,
            first_name: null,
            middle_name: null,
            last_name: null,
            role_id: null,
            role_name: null,
            email: null,
            access: null,
            refresh: null,
            avatar: null,

        }
    }),

    actions: {
        initStore() {
            console.log('initStore', localStorage.getItem('user.access'))

            if (localStorage.getItem('user.access')) {
                console.log('User has access!')

                this.user.access = localStorage.getItem('user.access')
                this.user.refresh = localStorage.getItem('user.refresh')
                this.user.id = localStorage.getItem('user.id')
                this.user.first_name = localStorage.getItem('user.first_name')
                this.user.middle_name = localStorage.getItem('user.middle_name')
                this.user.last_name = localStorage.getItem('user.last_name')
                this.user.role_id = localStorage.getItem('user.role_id')
                this.user.role_name = localStorage.getItem('user.role_name')
                this.user.email = localStorage.getItem('user.email')
                this.user.avatar = localStorage.getItem('user.avatar')
                this.user.isAuthenticated = true
                if (this.user.role_name === 'Специалист УМР') {
                    this.user.isAdmin = true
                }
                if (this.user.role_name === 'Преподаватель') {
                    this.user.isTeacher = true
                }
                if (this.user.role_name === 'Студент') {
                    this.user.isStudent = true
                }


                this.refreshToken()

                console.log('Initialized user:', this.user)
            }
        },

        setToken(data) {
            console.log('setToken', data)

            this.user.access = data.access
            this.user.refresh = data.refresh
            this.user.isAuthenticated = true

            localStorage.setItem('user.access', data.access)
            localStorage.setItem('user.refresh', data.refresh)

            console.log('user.access: ', localStorage.getItem('user.access'))
        },

        removeToken() {
            console.log('removeToken')

            this.user.refresh = null,
                this.user.access = null,
                this.user.isAuthenticated = false,
                this.user.id = null,
                this.user.first_name = null,
                this.user.middle_name = null,
                this.user.last_name = null,
                this.user.role_id = null,
                this.user.role_name = null,
                this.user.email = null,
                this.user.avatar = null,

                localStorage.setItem('user.access', '')
            localStorage.setItem('user.refresh', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.first_name', '')
            localStorage.setItem('user.middle_name', '')
            localStorage.setItem('user.last_name', '')
            localStorage.setItem('user.role_id', '')
            localStorage.setItem('user.role_name', '')
            localStorage.setItem('user.email', '')
            localStorage.setItem('user.avatar', '')
        },

        setUserInfo(user) {
            console.log('setUserInfo', user)

            this.user.id = user.id
            this.user.first_name = user.first_name
            this.user.middle_name = user.middle_name
            this.user.last_name = user.last_name
            this.user.role_id = user.role.id
            this.user.role_name = user.role.name
            this.user.email = user.email
            this.user.avatar = user.avatar

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.first_name', this.user.first_name)
            localStorage.setItem('user.middle_name', this.user.middle_name)
            localStorage.setItem('user.last_name', this.user.last_name)
            localStorage.setItem('user.role_id', this.user.role_id)
            localStorage.setItem('user.role_name', this.user.role_name)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.avatar', this.user.avatar)
            console.log('User Role', this.user.role)
            console.log('User', this.user)
            console.log(localStorage.getItem('user.role'))
        },

        refreshToken() {
            axios.post(`${API_URL}refresh/`, {
                    refresh: this.user.refresh
                })
                .then((response) => {
                    this.user.access = response.data.access

                    localStorage.setItem('user.access', response.data.access)

                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                })
                .catch((error) => {
                    console.log(error)

                    this.removeToken()
                })
        },
    }
})