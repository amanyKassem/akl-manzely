import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const getCountries = lang => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'countries',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getCountries', payload: response.data})
        })

    }
};
