import {configureStore} from '@reduxjs/toolkit';
import {itemApi} from './api/itemApi';
import {categoryApi} from './api/categoryApi';

//bunch of useReducers put together
const store = configureStore({
    reducer: {
        [itemApi.reducerPath]: itemApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware()
                                        .concat(itemApi.middleware)
                                        .concat(categoryApi.middleware)
});

export default store;