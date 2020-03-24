import * as actionType from './actionTypes';
import Axios from 'axios';
// import { API_URL } from '../../constants/api';

export const getDummyRef = query => (dispatch) => {
    const headers = {
        authorization: 'Bearer ' + localStorage.getItem('adal.idtoken')
    }
    Axios.get('https://dev.streamimapi.com/api/v1/Property/'+query, {
        headers: headers
    })
    .then((response)=>{
        dispatch({
            type: actionType.DUMMY_REF,
            payload: response.data
        })
    })
    .catch((error)=>{
        console.log('Error while fetching data. ',error)
    })
}