const INITIAL_STATE = {deliveryTypes : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getDeliveryTypes':{
            return {
                deliveryTypes        : action.payload.data,
                loader       : !!action.payload.success
            };
        }
        default:
            return state;
    }
};
