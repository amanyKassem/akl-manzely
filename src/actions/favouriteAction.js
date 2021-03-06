import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const setFav = (lang , meal_id , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'favourite',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,meal_id }
        }).then(response => {
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
