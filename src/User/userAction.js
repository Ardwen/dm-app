import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_ART_ITEMS_USER,
    REMOVE_CART_ITEM_USER
} from './types.js';
import { USER_SERVER } from '../Config.js';

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    //const data = new FormData(dataToSubmit)
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(_id) {
    const request = axios.get(`${USER_SERVER}/addToCart?productId=${_id}`)
        .then(response => response.data);

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}



export function getArtItems(museumeId) {
    const request = axios.get(`${USER_SERVER}/${museumeId}/arts`)
        .then(response => {
            return response.data;
        });
    return {
        type: GET_ART_ITEMS_USER,
        payload: request
    }
}




export function removeArtItem(id) {
    const request = axios.get(`/removeArtItem()?id=${id}`)
        .then(response => {
            return response.data;
        });
    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}
