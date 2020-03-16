import axios from "axios";
import CONST from "../consts";


export const getMeals = (lang, category_id , latitude , longitude , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'meals',
            method      : 'POST',
            data        : { lang , category_id, latitude , longitude},
            headers     : { Authorization: token },
        }).then(response => {
            dispatch({type: 'getMeals', payload: response.data});
        });
    }
};
