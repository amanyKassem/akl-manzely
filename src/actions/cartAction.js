import axios from "axios";
import CONST from "../consts";


export const getCarts = (lang, token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'carts',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getCarts', payload: response.data});
        });
    }
};
