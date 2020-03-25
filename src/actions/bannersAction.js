import axios from "axios";
import CONST from "../consts";


export const getBanners = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'banners',
            method      : 'POST',
            headers     : {Authorization: token},
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getBanners', payload: response.data});
        });
    }
};
