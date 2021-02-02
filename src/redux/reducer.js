import actionTypes from "./actionTypes";

const initialState = {
    todos: [],
    sections: [],
}

const reducer = (state = initialState, action) => {
    let { type, value } = action;

    switch (type) {
        case actionTypes.ADD_ITEM:
            return (function () {
                let { sectionKey, itemDate } = value;
                return {
                    ...state,
                    todos: [
                        ...state.todos,
                        {
                            key: Math.random().toString(),
                            done: false,
                            creation: new Date().valueOf(),
                            title: '',
                            section: sectionKey,
                            day: itemDate.toISOString().slice(0, 10),
                            isEditing: true
                        }
                    ],
                };
            })();
        case actionTypes.ADD_SECTION:
            return (function () {
                let newSection = {
                    key: Math.random().toString(),
                    title: "",
                    checkable: false,
                    isEditing: true,
                    creation: new Date().valueOf(),
                    day: value.toISOString().slice(0, 10),
                };
                return {
                    ...state,
                    sections: [
                        ...state.sections,
                        newSection
                    ],
                };
            })();
        case actionTypes.UPDATE_SECTION:
            return (function () {
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
            })();
        case actionTypes.REMOVE_SECTION:
            return (function () {
                let sectionKey = value;
                let sections = [...state.sections];
                let currentSection = sections.find(section => section.key === sectionKey);
                let filteredTodos = [...state.todos].filter(todo => todo.section !== currentSection.title);
                let filteredSections = sections.filter(section => section.key !== sectionKey);
                return {
                    ...state,
                    todos: filteredTodos,
                    sections: filteredSections,
                };
            })();
        default:
            return state;
    }
}

export default reducer;