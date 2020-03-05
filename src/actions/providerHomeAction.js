import axios from "axios";
import CONST from "../consts";


export const getProviderHome = (lang, category_id , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'provider-home',
            method      : 'POST',
            data        : { lang , category_id},
            headers     : { Authorization: token },
        }).then(response => {
            dispatch({type: 'getProviderHome', payload: response.data});
        });
    }
};
