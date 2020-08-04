const initState = {
    currentUser: null,
    error: null
}

const userReducer = (state=initState, action) => {
    switch (action.type) {
        case "GET_VK_USER_SUCCESS":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    profile: action.user,
                },
            }
        case "GET_VK_USER_ERROR":
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default userReducer;