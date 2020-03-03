import axios from 'axios';
import { AsyncStorage } from 'react-native';
import CONST from '../consts';

export const userLogin = ({phone, password, deviceId , device_type }, lang) => {
    return (dispatch) => {

        dispatch({type: 'login_user'});

        axios.post(
            CONST.url + 'sign-in',
            {phone, password, lang, device_id: deviceId , device_type})
            .then(
                response => handelLogin(dispatch, response.data)
            )
            .catch(
                error => console.warn(error.data)
            );
    };
};

export const tempAuth = () => {
    return (dispatch) => {
        dispatch({type: 'temp_auth'});
    };
};

const handelLogin = (dispatch, data) => {
    if (!data.success){
        loginFailed(dispatch, data)
    }else{
        loginSuccess(dispatch, data)
    }
};


const loginSuccess = (dispatch, data) => {
    AsyncStorage.setItem('token', JSON.stringify(data.data.token))
        .then(() => dispatch({type: 'login_success', data }));
};

const loginFailed = (dispatch, error) => {
    dispatch({type: 'login_failed', error});
};
