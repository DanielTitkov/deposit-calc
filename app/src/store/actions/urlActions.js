import { parseQueryString } from "../../helper/url";

export const getValidationQuery = (response) => {
    return (dispatch, getState) => {
        const queryParams = parseQueryString(window.location.search);
        const hashParams = parseQueryString(window.location.hash);
        // fix comma encoding for validation
        queryParams.vk_access_token_settings = decodeURIComponent(queryParams.vk_access_token_settings);
        dispatch({ type: "GET_VK_QUERY", query: queryParams, hash: hashParams });
    }
};

export const getInputData = () => {
    return (dispatch, getState) => {
        const urlParams = parseQueryString(window.location.hash, true);
        const ifGiven = (given, def) => (given ? given : def);
        dispatch({ type: "GET_INPUT_DATA", data: {
            inflationControl: ifGiven(urlParams && urlParams.inflationControl, false),
            mortgageRate: ifGiven(urlParams && urlParams.inflationValue, 0),
            mortgagePeriod: ifGiven(urlParams && urlParams.mortgageRate, 8),
            assetPrice: ifGiven(urlParams && urlParams.mortgagePeriod, 15),
            rentPrice: ifGiven(urlParams && urlParams.assetPrice, 5000000),
            rentCoef: ifGiven(urlParams && urlParams.rentPrice, 25000),
            depositRate: ifGiven(urlParams && urlParams.rentCoef, 0.005),
            inflationValue: ifGiven(urlParams && urlParams.depositRate, 4),
        } });
    }
};

