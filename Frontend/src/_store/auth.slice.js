import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

import { history, fetchWrapper } from '_helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        error: null
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
        localStorage.removeItem('user');
        history.navigate('/login');
    }
}

function createExtraActions() {
    const baseUrl = `${fetchWrapper.api_url}/api`;

    return {
        login: login(),
        signup: signup()
    };    

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ email, password }) => await fetchWrapper.post(`${baseUrl}/login`, { email, password })
        );
    }

    function signup() {
        return createAsyncThunk(
            `${name}/signup`,
            async ( data ) => await fetchWrapper.post(`${baseUrl}/register`, data)
        );
    }
}

function createExtraReducers() {
    return {
        ...login(),
        ...signup()
    };

    function login() {
        let { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;
                state.user = user;
                user.password = '';  
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
                Swal.fire('Error', action.error.message??'unknown error', 'error')
            }
        };
    }

    function signup() {
        let { pending, fulfilled, rejected } = extraActions.signup;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                Swal.fire('Success!', '', 'success');
                const { from } = history.location.state || { from: { pathname: '/login' } };
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
                Swal.fire('Error', action.error.message??'unknown error', 'error');
            }
        };
    }
}
