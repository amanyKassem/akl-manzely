import axios from "axios";
import CONST from "../consts";

export const getCartInfo = (lang, provider_id , token) => {
    return (dispatch) => {
        CartProducts(lang, provider_id, token, dispatch)
    }
};

export const editCart = (lang , provider_id, id, quantity,  token, props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'update-cart',
            method: 'POST',
            data: {lang , id, quantity},
            headers: {Authorization: token}
        }).then(response => {
            CartProducts(lang , provider_id , token , dispatch, props)
        })

    }
};

export const deleteCart = (lang , provider_id, id, token, props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'delete-cart',
            method: 'POST',
            data: {lang , id},
            headers: {Authorization: token}
        }).then(response => {
            CartProducts(lang , provider_id , token , dispatch, props)
        })

    }
};


const CartProducts = (lang , provider_id , token , dispatch, props ) => {
    axios({
        url         : CONST.url + 'cart-info',
        method      : 'POST',
        headers     : { Authorization: token },
        data        : { lang , provider_id}
    }).then(response => {
        if (!response.data.data.meals){
            props.navigation.navigate('Cart')
        }else
            dispatch({type: 'getCartInfo', payload: response.data});
    });
};