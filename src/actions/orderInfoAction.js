import axios from "axios";
import CONST from "../consts";


export const getOrderInfo = (lang, order_id , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'order-info',
            method      : 'POST',
            data        : { lang , order_id},
            headers     : token != null ? { Authorization: token } : null,
        }).then(response => {
            dispatch({type: 'getOrderInfo', payload: response.data});
        });
    }
};
