import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const getBanks = lang => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'banks',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getBanks', payload: response.data})
        })

    }
};
