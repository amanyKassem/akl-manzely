import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const getDeliveryTypes = (lang, provider_id, token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'delivery-types',
            method      : 'POST',
			headers     : token ? { Authorization: token } : null,
			data        : { lang, provider_id }
        }).then(response => {
            dispatch({type: 'getDeliveryTypes', payload: response.data})
        })

    }
};
