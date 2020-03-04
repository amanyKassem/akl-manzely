import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const complaint = (complaint , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'complaint',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {complaint}
        }).then(response => {
            dispatch({type: 'complaint', payload: response.data});

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
        });

    }
};
