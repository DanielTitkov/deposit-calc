const initState = {
    inputData: null,
    error: null,
    loading: false,
}

const calcReducer = (state=initState, action) => {
    switch (action.type) {
        case "UPDATE_CALC_INPUT":
            return {
                ...state,
                inputData: action.data,
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}

export default calcReducer;