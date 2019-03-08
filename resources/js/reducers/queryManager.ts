import {
    FETCH_QUERIES_REQUEST, FETCH_QUERIES_SUCCESS, FETCH_QUERIES_FAILURE, RESET_QUERIES,
} from '../actions';


const INITIAL_STATE = {
    queriesList: {
        queries: [],
        error: null,
        loading: false
    },
};

export default function (state = INITIAL_STATE, action) {
    let error;

    switch (action.type) {

        case FETCH_QUERIES_REQUEST: // start fetching queries and set loading = true
            return {
                ...state,
                queriesList: {
                    queries: [],
                    error: null,
                    loading: true
                }
            };

        case FETCH_QUERIES_SUCCESS: // return list of queries and make loading = false
            return {
                ...state,
                queriesList: {
                    queries: action.payload,
                    error: null,
                    loading: false
                }
            };

        case FETCH_QUERIES_FAILURE: // return error and make loading = false
            error = action.payload || {message: action.payload.message}; // 2nd one is network or server down errors
            return {
                ...state,
                queriesList: {
                    queries: [],
                    error: error,
                    loading: false
                }
            };

        case RESET_QUERIES: // reset queryList to initial state
            return {
                ...state,
                queriesList: {
                    queries: [],
                    error: null,
                    loading: false
                }
            };

        default:
            return state;
    }
}
