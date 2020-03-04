import axios from "axios";
import CONST from "../consts";


export const getCategories = (lang, parent_id) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'categories',
            method      : 'POST',
            data        : { lang , parent_id}
        }).then(response => {
            dispatch({type: 'getCategories', payload: response.data});
        });
    }
};
