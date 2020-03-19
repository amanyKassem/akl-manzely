import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";
import {AsyncStorage} from "react-native";


export const profile = (token) => {
    return (dispatch) => {
        axios({
            method      : 'POST',
            url         : CONST.url + 'profile',
            headers     : {Authorization: token}
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data})
        })
    }
}


export const updateProfile = (data) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'edit-profile',
            method      : 'POST',
            headers     : {Authorization: data.token },
            data        : {
                name                : data.name,
                email               : data.email,
                phone               : data.phone,
                country_id          : data.country_id,
                gender              : data.gender,
                latitude            : data.latitude,
                longitude           : data.longitude,
                avatar              : data.avatar,
                cover               : data.cover,
                provider_details    : data.provider_details,
                available           : data.available,
                delivery_types      : data.delivery_types,
                qualification       : data.qualification,
                address             : data.address,
                lang                : data.lang,
            }}).then(response => {

            if (response.data.success) {

                data.props.navigation.navigate('Profile');

                dispatch({type: 'update_profile', data:response.data.data});

            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });

        })
    }
}

export const logout = (token) => {
    return (dispatch) => {
        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'logout',
                method      : 'POST',
                headers     : { Authorization: token },
                data        : { device_id }
            }).then(response => {
                    AsyncStorage.multiRemove(['token', 'auth', 'profile'])
                    dispatch({type: 'logout'})
                }
            )
        });
    }
};

