import { combineReducers } from 'redux';

const INITIAL_STATE = {
    listData: [],
    favouriteList: []
};

const stackReducer = (state = INITIAL_STATE, action) => {
    let filterData;
    let newState;
    switch (action.type) {
        case 'list':
            return {
                ...state,
                listData: action.payload.data
            };

        case 'add':

            filterData = action.payload.data.filter((data) => data.char_id === action.payload.char_id)[0];
           // state.favouriteList.push(filterData.char_id);
            newState = [...state.favouriteList,filterData.char_id];


            return {
                ...state,
                favouriteList: newState
            };

        case 'remove':
            filterData = state.favouriteList.filter((data) => data !== action.payload.char_id);
            // state.favouriteList.push(filterData);
            newState = filterData;
            console.log('favouriteList' + JSON.stringify(newState));
            console.log('removeData' + JSON.stringify(newState));

            return {
                ...state,
                favouriteList: newState
            };

        default:
            return state
    }
};

export default combineReducers({
    favourite: stackReducer
});