import actionTypes from "./actionTypes";

export default {
    insertItem: (itemDate, sectionKey) => {
        return {
            type: actionTypes.INSERT_ITEM,
            value: { itemDate, sectionKey }
        };
    },
    updateItem: (todoKey, updatedValues) => {
        return {
            type: actionTypes.UPDATE_ITEM,
            value: { todoKey, updatedValues }
        };
    },
    deleteItem: (todoKey) => {
        return {
            type: actionTypes.DELETE_ITEM,
            value: todoKey
        };
    },
    insertSection: (sectionDate) => {
        return {
            type: actionTypes.INSERT_SECTION,
            value: sectionDate
        };
    },
    removeItem: (itemKey) => {
        return {
            type: actionTypes.DELETE_ITEM,
            value: itemKey
        };
    },
    deleteSection: (sectionKey) => {
        return {
            type: actionTypes.DELETE_SECTION,
            value: sectionKey
        };
    },
    updateSection: (sectionKey, updatedValues) => {
        return {
            type: actionTypes.UPDATE_SECTION,
            value: { sectionKey, updatedValues }
        };
    },
    updateUser: (updatedValues) => {
        return {
            type: actionTypes.UPDATE_USER,
            value: updatedValues,
        };
    },
};