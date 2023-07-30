const initialStore = { auth: false };

function authStore(state = initialStore, action) {
    
    switch (action.type) {
        case "AUTH":
            return (initialStore.auth = { auth: action.value });
        default:
            return state;
    }
}

export default authStore;
