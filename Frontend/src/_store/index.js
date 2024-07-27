import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { botsReducer } from './bots.slice';

export * from './auth.slice';
export * from './users.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        bots: botsReducer
    },
});