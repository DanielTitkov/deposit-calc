const initState = {
    vkquery: null,
    inputData: null,
}

const urlReducer = (state=initState, action) => {
    switch (action.type) {
        case "GET_VK_QUERY":
            return {
                ...state,
                vkquery: {
                    query: action.query,
                    hash: action.hash
                }
            }
        case "GET_INPUT_DATA":
            return {
                ...state,
                inputData: action.data,
            }
        default:
            return state;
    }
}

export default urlReducer;