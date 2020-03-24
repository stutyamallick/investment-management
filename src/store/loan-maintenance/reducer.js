import * as actionType from './actionTypes';

const initialState = {
    dummyRef: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.DUMMY_REF:
            return { ...state, dummyRef: action.payload }

        default:
            return state
    }
}

export default reducer;