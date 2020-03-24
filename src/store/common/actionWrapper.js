// import * as actionType from './actionTypes';
import Axios from 'axios';
import { API_URL, API_HEADERS } from '../../constants/api';

export const actionWrapper = (apiName, params, actionType) => (dispatch) => {
    const headers = {
        authorization: `${API_HEADERS.authName}${localStorage.getItem(API_HEADERS.authToken)}`
    };

    // console.log(apiName, params, actionType);

    Axios.get(API_URL[apiName], {
        params: params,
        headers: headers
    })
        .then((response) => {
            dispatch({
                type: actionType,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log('Error while fetching data. ', error)
        })
}
