import axios from "axios";
import CONST from "../consts";


export const getContactInfo = lang => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'contact-info',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getContactInfo', payload: response.data});
        });
    }
};
