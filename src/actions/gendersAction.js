import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const getGenders = lang => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'genders',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getGenders', payload: response.data})
        })

    }
};
