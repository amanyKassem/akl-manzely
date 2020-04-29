import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const addMeal = (lang , price , preparation_time , category_id , images , discount , additions , token , props) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'add-meal',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang , price , preparation_time , category_id , images , discount , additions }
        }).then(response => {
            if (response.data.success){
                props.navigation.navigate('Home');
            }

            dispatch({ type: 'setMeal', payload: response.data });

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


export const editMeal = (lang, meal_id , price , preparation_time , category_id , images , discount , additions, deleted_images , token , props) => {
	return (dispatch) => {
		axios({
			url         : CONST.url + 'update-meal',
			method      : 'POST',
			headers     : { Authorization: token },
			data        : {lang , meal_id, price , preparation_time , category_id , images , discount , additions, deleted_images }
		}).then(response => {
			if (response.data.success){
				props.navigation.navigate('Home');
			}

			dispatch({ type: 'setMeal', payload: response.data });

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
