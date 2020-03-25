import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const getOrderStore = (lang , provider_id , delivery_type , latitude , longitude , token , props) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'add-order',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang , provider_id , delivery_type , latitude , longitude }
        }).then(response => {
            if (response.data.success){
                props.navigation.navigate('ConfirmPayment');
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
