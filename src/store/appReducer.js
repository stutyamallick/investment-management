import { combineReducers } from 'redux';
import performanceReducer from './performance/reducer';
import userReducer from './user/reducer'
import propertyReducer from './property-maintenance/reducer'

const rootReducer = combineReducers({
    performance: performanceReducer,
    user: userReducer,
    property: propertyReducer
})

const initialState = rootReducer({}, {});

const combineReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        state = initialState;
    }
    return rootReducer(state, action);
};

export default combineReducer;