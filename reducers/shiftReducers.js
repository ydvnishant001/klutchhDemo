import dbData from "../db/data";

const initialState = {
    allShifts: dbData
  };
  
const shiftReducers = (state = initialState, action) => {
    switch (action.type) {
        case "BOOK_SHIFT":
        return {
            ...state,
            allShifts: action.payload,
        };
        case "BOOK_SHIFT_FAILURE":
        return {
            ...state,
        };
        case "CANCEL_BOOKED_SHIFT":
        return {
                ...state,
                allShifts: action.payload,
        };
        case "CANCEL_BOOKED_SHIFT_FAILURE":
        return {
            ...state,
        };
        case "SET_LOADING":
        return {
            ...state,
            allShifts: action.payload,
        };
        case "SET_LOADING_FAILURE":
        return {
            ...state,
        };
        default: 
        return state;
    }
  };
  
  export default shiftReducers;
  