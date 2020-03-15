import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const addCategory = (lang , name_ar , name_en , category_id , token , props) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'add-category',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang , name_ar , name_en , category_id}
        }).then(response => {
            if (response.data.success){
                props.navigation.navigate('Home');
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
