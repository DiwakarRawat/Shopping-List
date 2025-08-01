
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, UPDATE_ITEM } from '../actions/types';


const initialState = {
    items: [],
    loading: false
}

export default function itemReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case UPDATE_ITEM: // <-- New case for updating an item
            return {
                ...state,
                items: state.items.map(item =>
                    item._id === action.payload._id ? action.payload : item
                )
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}