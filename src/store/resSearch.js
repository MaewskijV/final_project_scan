const initialStore = {
    histograms: [],
    objectSearch: [],
};

function resSearch(state = initialStore, action) {

    switch (action.type) {
        case "setResHistograms":
            return (initialStore.histograms = action.value.data);
        case "setResObjectSearch":
            initialStore.objectSearch = action.value;
            return initialStore;
        default:
            return state;
    }
}

export default resSearch;
