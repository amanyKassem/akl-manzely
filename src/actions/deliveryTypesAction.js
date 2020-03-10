import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const getDeliveryTypes = lang => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'delivery-types',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getDeliveryTypes', payload: response.data})
        })

    }
};
