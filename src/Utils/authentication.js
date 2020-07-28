import axios from 'axios'
import { USER_SERVER } from '../Config.js';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'username';
export const TOKEN_SESSION_ATTRIBUTE_NAME = 'access_token';

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${USER_SERVER}/authenticate`, {
            username,
            password
        })
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, this.createJWTToken(token))
        this.setupAxiosInterceptors()
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors() {
        let token = sessionStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()
