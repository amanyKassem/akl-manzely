import axios from "axios";
import CONST from "../consts";


export const getOffers = (lang, latitude , longitude , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'meal-offers',
            method      : 'POST',
            data        : { lang , latitude , longitude},
            headers     : token != null ? { Authorization: token } : null,
        }).then(response => {
            dispatch({type: 'getOffers', payload: response.data});
        });
    }
};
