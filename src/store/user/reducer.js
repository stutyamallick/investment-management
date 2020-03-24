import * as actionType from './actionTypes';

const initialState = {
    userData: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_USER_DATA:
            return { ...state, userData: action.payload }

        default:
            return state
    }
}

export default reducer;