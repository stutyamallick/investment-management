import * as actionType from './actionTypes';

const initialState = {
    filteredProperties: null,
    propertyTrackerDetails: null,
    propertyDetails: null,
    manualEditFields: null,
    saveStatus: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_FILTERED_PROPERTIES:
            return { ...state, filteredProperties: action.payload }

        case actionType.GET_PROPERTY_TRACKER_DETAILS:
            return { ...state, propertyTrackerDetails: action.payload }

        case actionType.GET_PROPERTY_DETAILS:
            return { ...state, propertyDetails: action.payload }

        case actionType.GET_ALL_MANUAL_EDIT_FIELDS:
            return { ...state, manualEditFields: action.payload }

        case actionType.SAVE_EDITED_DATA:
            return { ...state, saveStatus: action.payload }
        default:
            return state
    }
}

export default reducer;