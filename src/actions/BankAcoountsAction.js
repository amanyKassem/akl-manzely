import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";


export const getBankAcoounts = (lang , token) => {
    return (dispatch) => {
        bankAcoounts(lang, token, dispatch)
    }
};

export const deleteBankAcoounts = (lang , id, token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'delete-bank-account',
            method      : 'POST',
            data        : {lang , id},
            headers     : {Authorization: token}
        }).then(response => {

            bankAcoounts(lang , token , dispatch);

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

const bankAcoounts = (lang , token , dispatch ) => {
    axios({
        url         : CONST.url + 'bank-accounts',
        method      : 'POST',
        data        : {lang },
        headers     : {Authorization: token}
    }).then(response => {

        dispatch({type:'getBankAcoounts', payload: response.data});

    })
};

export const addBankAcoounts = (national_id ,image, account_number , iban_number , bank_id, props, lang, token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'add-bank-account',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang , national_id ,image, account_number , iban_number , bank_id}
        }).then(response => {
            bankAcoounts(lang , token , dispatch);

            if (response.data.success){
                props.navigation.navigate('BankAccounts');
            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });

        })

    }
};

export const editBankAcoounts = (id , national_id ,image, account_number , iban_number , bank_id, props, lang, token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'edit-bank-account',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang , id , national_id ,image, account_number , iban_number , bank_id}
        }).then(response => {

             bankAcoounts(lang , token , dispatch);

            if (response.data.success){
                props.navigation.navigate('BankAccounts');
            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });

        })

    }
};