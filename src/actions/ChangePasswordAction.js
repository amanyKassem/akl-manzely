import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const getChangePassword = (lang , old_password , new_password , token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'change-password',
            method      : 'POST',
            data        : {lang, old_password , new_password},
            headers     : {Authorization: token}
        }).then(response => {

            dispatch({type: 'getChangePassword', payload: response.data});

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });

        })

    }
};
