import actionTypes from "./actionTypes";

export default {
    addItem: (itemDate, sectionKey) => {
        return {
            type: actionTypes.ADD_ITEM,
            value: { itemDate, sectionKey }
        };
    },
    addSection: (sectionDate) => {
        return {
            type: actionTypes.ADD_SECTION,
            value: sectionDate
        };
    },
    removeItem: (itemKey) => {
        return {
            type: actionTypes.REMOVE_ITEM,
            value: itemKey
        };
    },
    removeSection: (sectionKey) => {
        return {
            type: actionTypes.DELETE_SECTION,
            value: sectionKey
        };
    },
    submitSection: (keyAndUpdatedText) => {
        return {
            type: actionTypes.UPDATE_SECTION,
            value: keyAndUpdatedText
        };
    },
    toggleEditSection: (sectionKey) => {
        return {
            type: actionTypes.TOGGLE_EDIT_SECTION,
            value: sectionKey
        };
    },
};