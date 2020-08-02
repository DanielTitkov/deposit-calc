const initState = {
    error: null,
    loading: false,
}

const calcReducer = (state=initState, action) => {
    switch (action.type) {
        // case "SET_ACTIVE_SHEET":
        //     return {
        //         ...state,
        //         activeSheet: action.sheet && action.sheet.blueprint ? ({
        //             ...action.sheet
        //         }) : null
        //     };
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