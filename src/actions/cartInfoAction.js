import axios from "axios";
import CONST from "../consts";


export const getCartInfo = (lang, provider_id, token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'cart-info',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : { lang , provider_id}
        }).then(response => {
            dispatch({type: 'getCartInfo', payload: response.data});
        });
    }
};
