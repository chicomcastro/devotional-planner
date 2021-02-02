import actionTypes from "./actionTypes";

const initialState = {
    todos: [],
    sections: [],
}

const reducer = (state = initialState, action) => {
    let { type, value } = action;
    switch (type) {
        case actionTypes.ADD_ITEM:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    value.newItem
                ],
            };
        default:
            return state;
    }
}

export default reducer;