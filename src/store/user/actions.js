import * as actionType from './actionTypes';
import Axios from 'axios';
import { API_URL } from '../../constants/api';

export const getUserData = query => (dispatch) => {
    const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    Axios.get(API_URL.user, {
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType.GET_USER_DATA,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        })
}