import actionTypes from "./actionTypes";

const initialState = {
    todos: [],
    sections: [],
    logs: [],
}

const reducer = (state = initialState, action) => {
    let { type, value } = action;

    state.logs.push(action);

    switch (type) {

        // ---
        // TODOs
        // ---
        case actionTypes.INSERT_ITEM:
            return (function () {
                let { sectionKey, itemDate } = value;
                return {
                    ...state,
                    todos: [
                        ...state.todos,
                        {
                            key: new Date().valueOf(),
                            done: false,
                            creation: new Date().valueOf(),
                            title: '',
                            section: sectionKey,
                            day: itemDate.toISOString().slice(0, 10),
                        }
                    ],
                };
            })();
        case actionTypes.UPDATE_ITEM:
            return (function () {
                let todos = [...state.todos];
                let currentTodoIndex = todos.findIndex(todo => todo.key === value.todoKey);
                todos[currentTodoIndex] = {
                    ...todos[currentTodoIndex],
                    ...value.updatedValues,
                    lastUpdate: new Date().valueOf(),
                };
                return {
                    ...state,
                    todos,
                };
            })();
        case actionTypes.DELETE_ITEM:
            return (function () {
                let todoKey = value;
                let todos = [...state.todos];
                let filteredTodos = todos.filter(todo => todo.key !== todoKey);
                return {
                    ...state,
                    todos: filteredTodos,
                };
            })();

        // ---
        // Sections
        // ---
        case actionTypes.INSERT_SECTION:
            return (function () {
                let newSection = {
                    key: new Date().valueOf(),
                    title: "",
                    checkable: true,
                    collapsed: false,
                    lastUpdate: new Date().valueOf(),
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
                    ...value.updatedValues,
                    lastUpdate: new Date().valueOf(),
                };
                return {
                    ...state,
                    sections,
                };
            })();
        case actionTypes.TOGGLE_EDIT_SECTION:
            return (function () {
                let sectionKey = value;
                let sections = [...state.sections];
                let currentSectionIndex = sections.findIndex(section => section.key === sectionKey);
                sections[currentSectionIndex] = {
                    ...sections[currentSectionIndex],
                    lastUpdate: new Date().valueOf(),
                };
                return {
                    ...state,
                    sections,
                };
            })();
        case actionTypes.DELETE_SECTION:
            return (function () {
                let sectionKey = value;
                let sections = [...state.sections];
                let filteredTodos = [...state.todos].filter(todo => todo.section !== sectionKey);
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