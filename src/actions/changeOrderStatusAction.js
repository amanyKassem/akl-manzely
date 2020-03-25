import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const changeOrderStatus = (lang ,order_id , action , reason , payment_type , token , props ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'change-order-status',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang , order_id , action , reason , payment_type }
        }).then(response => {
            if (response.data.success){
                props.navigation.navigate('MyOrders');
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
