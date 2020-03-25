import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";



export const getBill = (lang , token) => {
    return (dispatch) => {
        Bill(lang, token, dispatch)
    }
};

export const payTax = (lang , order_id , token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'pay-tax',
            method      : 'POST',
            data        : {lang , order_id},
            headers     : {Authorization: token}
        }).then(response => {

            Bill(lang , token , dispatch);

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });

        })
    }
};

const Bill = (lang , token , dispatch ) => {
    axios({
        url         : CONST.url + 'bill',
        method      : 'POST',
        data        : {lang },
        headers     : {Authorization: token}
    }).then(response => {

        dispatch({type:'getBill', payload: response.data});

    })
};
