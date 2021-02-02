import actionTypes from "./actionTypes";

export default {
    addItem: (item) => {
        return {
            type: actionTypes.ADD_ITEM,
            value: item
        };
    },
    addSection: (section) => {
        return {
            type: actionTypes.ADD_SECTION,
            value: section
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
};