import axios from 'axios';

// Fetch queries
export const FETCH_QUERIES_REQUEST = 'FETCH_QUERIES_REQUEST';
export const FETCH_QUERIES_SUCCESS = 'FETCH_QUERIES_SUCCESS';
export const FETCH_QUERIES_FAILURE = 'FETCH_QUERIES_FAILURE';
export const RESET_QUERIES = 'RESET_QUERIES';

export function fetchQueries() {
    return {
        type: FETCH_QUERIES_REQUEST
    };
}

export function fetchQueriesSuccess(queries) {
    return {
        type: FETCH_QUERIES_SUCCESS,
        payload: queries
    };
}

export function fetchQueriesFailure(error) {
    return {
        type: FETCH_QUERIES_FAILURE,
        payload: error
    };
}