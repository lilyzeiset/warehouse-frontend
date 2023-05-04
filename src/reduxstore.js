import {configureStore} from '@reduxjs/toolkit';
import {itemApi} from './api/itemApi';
import {categoryApi} from './api/categoryApi';
import {warehouseApi} from './api/warehouseApi';

//bunch of useReducers put together
const store = configureStore({
    reducer: {
        [itemApi.reducerPath]: itemApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [warehouseApi.reducerPath]: warehouseApi.reducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware()
                                        .concat(itemApi.middleware)
                                        .concat(categoryApi.middleware)
                                        .concat(warehouseApi.middleware)
});

export default store;