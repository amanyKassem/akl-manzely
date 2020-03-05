import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";
export const productDetails = (lang, meal_id , latitude , longitude ) => {
    return (dispatch) => {
        getProduct(lang, meal_id , latitude , longitude, dispatch)
    }

};

export const changeMealStatus = ( lang , meal_id , token) => {

    return (dispatch) => {

        axios({
            url         : CONST.url + 'change-meal-status',
            method      : 'POST',
            headers     : token != null ? { Authorization: token } : null,
            data        : { lang, meal_id}
        }).then(response => {
            //
            // Toast.show({
            //     text        : response.data.message,
            //     type        : response.data.success ? "success" : "danger",
            //     duration    : 3000,
            //     textStyle       : {
            //         color           : "white",
            //         fontFamily      : 'cairo',
            //         textAlign       : 'center'
            //     }
            // });
        });

    }

};


const getProduct = (lang, meal_id , latitude , longitude , dispatch) => {
    AsyncStorage.getItem('deviceID').then(device_id => {
        axios({
            url: CONST.url + 'meal-info',
            method: 'POST',
            // headers: token != null ? {Authorization: token} : null,
            data: {lang, meal_id , latitude , longitude , device_id}
        }).then(response => {
            dispatch({type: 'productDetails', payload: response.data});
        });
    });
}
