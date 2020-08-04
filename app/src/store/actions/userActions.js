import bridge from '@vkontakte/vk-bridge';

export const getCurrentUser = () => {
    return (dispatch, getState) => {
        bridge.sendPromise('VKWebAppGetUserInfo', {})
        .then(data => {
            dispatch({ type: "GET_VK_USER_SUCCESS", user: data });
        })
        .catch(err => {
            dispatch({ type: "GET_VK_USER_ERROR", error: err });
        });
    }
};
