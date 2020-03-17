import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const addCart = (lang ,meal_id , provider_id , quantity , token , props) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'add-cart',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang , meal_id , provider_id , quantity }
        }).then(response => {
            if (response.data.success){
                props.navigation.navigate('Cart');
            }
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
