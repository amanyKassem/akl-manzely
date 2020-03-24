import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
import { Toast } from 'native-base'
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

export const register = (data, props) => {
	return (dispatch) => {
		AsyncStorage.getItem('deviceID').then(device_id => {
			axios({
				url: CONST.url + 'sign-up',
				method: 'POST',
				data: {
					name			    : data.name,
					phone			    : data.phone,
					email			    : data.email,
					gender		        : data.nationalityId,
					country_id		    : data.countryId,
					latitude			: data.latitude,
					longitude			: data.longitude,
					type			    : data.userType == 'chef' ? 'provider' : data.userType,
					address			    : data.cityName,
					provider_name		: data.providerName,
					birthday			: data.date,
					qualification	    : data.qualification,
					device_type	        : Platform.OS,
					delivery_types	    : data.deliveryArr,
					password		    : data.password,
					lang 			    : data.lang,
					device_id
				}
			}).then(response => {
				dispatch({type: 'register', payload: response.data});
				if (response.data.success){
					console.log('message___', response.data.message);
					props.navigation.navigate('ActivtionAccount', {
						code			: response.data.data.code,
						phone			: data.phone,
						deviceId		: device_id,
						device_type	    : Platform.OS,
						password		: data.password,
						token			: response.data.data.token,
					});
				}

				console.log('message', response.data.message);

				Toast.show({
					text        	: response.data.message,
					type			: response.data.success ? "success" : "danger",
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
