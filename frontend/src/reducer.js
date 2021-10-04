export const initialState = {
    loggedIn: false,
    email: "",
    sellerId: ""
};

const reducer = (state, action) => {
    console.log(action)

    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case 'SET_SELLER_CREDENTIALS':
            return {
                ...state,
                email: action.email,
                sellerLoggedIn: action.loggedIn,
                sellerId: action.sellerId
            }
        default:
            return state;
    }


}

export default reducer;