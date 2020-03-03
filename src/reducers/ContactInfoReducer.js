const INITIAL_STATE = { contactInfo : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getContactInfo':
            return {
                contactInfo: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
