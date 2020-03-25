import axios from "axios";
import CONST from "../consts";


export const getOrders = (lang, status , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'orders',
            method      : 'POST',
            data        : { lang , status},
            headers     : token != null ? { Authorization: token } : null,
        }).then(response => {
            dispatch({type: 'getOrders', payload: response.data});
        });
    }
};
