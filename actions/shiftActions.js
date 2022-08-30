  export const bookShift = (id) => {
    return async (dispatch, getState) => {
      try {
        var newData = getState().shiftReducers.allShifts
        var newData2 = newData.map(item => {
            if(item.id === id){
                return{
                  ...item,
                  booked : true,
                }
            }
            return item
        })
          dispatch({type: "BOOK_SHIFT", payload: newData2});
        }
        catch (err) {
        dispatch({ type: "BOOK_SHIFT_FAILURE"});
      }
    };
  };

  export const cancelBookedShift = (id) => {
    return async (dispatch, getState) => {
      try {
        var newData = getState().shiftReducers.allShifts
        var newData2 = newData.map(item => {
            if(item.id === id){
                return{
                  ...item,
                  booked : false,
                }
            }
            return item
        })
        dispatch({type: "CANCEL_BOOKED_SHIFT", payload: newData2});
        }
        catch (err) {
        dispatch({ type: "CANCEL_BOOKED_SHIFT_FAILURE"});
      }
    };
  };

  export const setLoading = (id, val) => {
    return async (dispatch, getState) => {
      try {
        var newData = getState().shiftReducers.allShifts
        var newData2 = newData.map(item => {
            if(item.id === id){
                return{
                  ...item,
                  loading: val
                }
            }
            return item
        })
          dispatch({type: "SET_LOADING", payload: newData2});
        }
        catch (err) {
        dispatch({ type: "SET_LOADING_FAILURE"});
      }
    };
  };