const INITIAL_STATE = { providerHome : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProviderHome':
            return {
                providerHome: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
