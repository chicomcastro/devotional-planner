import actionTypes from "./actionTypes";

export default {
    addItem: (item) => {
        return {
            type: actionTypes.ADD_ITEM,
            value: item
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
            type: actionTypes.REMOVE_SECTION,
            value: sectionKey
        };
    },
    updateSection: (keyAndUpdatedText) => {
        return {
            type: actionTypes.UPDATE_SECTION,
            value: keyAndUpdatedText
        };
    },
};