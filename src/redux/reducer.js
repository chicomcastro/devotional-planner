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
                    value
                ],
            };
        case actionTypes.ADD_SECTION:
            return {
                ...state,
                sections: [
                    ...state.sections,
                    value
                ],
            };
        case actionTypes.UPDATE_SECTION:
            let sections = [...state.sections];
            let currentSectionIndex = sections.findIndex(section => section.key === value.sectionKey);
            sections[currentSectionIndex] = {
                ...sections[currentSectionIndex],
                isEditing: false,
                title: value.textInput,
            };
            let todos = [...state.todos];
            todos.forEach(todo => {
                if (todo.section === value.sectionKey) {
                    todo.section = value.sectionKey;
                }
            });
            return {
                ...state,
                sections,
                todos,
            };
        default:
            return state;
    }
}

export default reducer;