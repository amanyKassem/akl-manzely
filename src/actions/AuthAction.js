import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
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

export const register = (data, props, lang) => {
	return (dispatch) => {
		AsyncStorage.getItem('deviceID').then(device_id => {
			axios({
				url: CONST.url + 'sign-up',
				method: 'POST',
				data: {
					name			    : data.name,
					email			    : data.email,
					phone			    : data.phone,
					gender		        : data.gender,
					country_id		    : data.country_id,
					category_id		    : data.category_id,
					latitude			: data.latitude,
					longitude			: data.longitude,
					type			    : data.type,
					address			    : data.address,
					provider_name		: data.provider_name,
					birthday			: data.birthday,
					qualification	    : data.qualification,
					device_type	        : Platform.OS,
					password		    : data.password,
					device_id,
					lang
				}
			}).then(response => {
				dispatch({type: 'register', payload: response.data});
				if (response.data.key === 1){
					props.navigation.navigate('ActivationCode', {
						code			: response.data.data.code,
						user_id			: response.data.data.id,
						phone			: data.phone,
						password		: data.password,
						deviceId		: device_id
					});
				}

				Toast.show({
					text        	: response.data.msg,
					type			: response.data.key === 1 ? "success" : "danger",
					duration    	: 3000,
					textStyle   	: {
						color       	: "white",
						fontFamily  	: 'cairo',
						textAlign   	: 'center'
					}
				});

			})
		})

	}
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
