const INITIAL_STATE = { meals : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getMeals':
            return {
                meals: action.payload.data,
                loader: !!action.payload.success
            };
        default:
            return state;
    }
};
