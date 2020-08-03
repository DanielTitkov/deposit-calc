export const updateCalcInput = (inputData) => {
    return (dispatch, getState) => {     
        dispatch({
            type: "UPDATE_CALC_INPUT",
            data: inputData,
        });
    }
};