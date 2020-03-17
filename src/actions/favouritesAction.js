import axios from "axios";
import CONST from "../consts";


export const getFavorites = (lang, latitude , longitude , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'favourites',
            method      : 'POST',
            data        : { lang , latitude , longitude},
            headers     : token != null ? { Authorization: token } : null,
        }).then(response => {
            dispatch({type: 'getFavorites', payload: response.data});
        });
    }
};
