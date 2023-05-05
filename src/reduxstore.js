import {configureStore} from '@reduxjs/toolkit';
import {itemApi} from './api/itemApi';
import {categoryApi} from './api/categoryApi';
import {warehouseApi} from './api/warehouseApi';
import {lotApi} from './api/lotApi';

//bunch of useReducers put together
const store = configureStore({
    reducer: {
        [itemApi.reducerPath]: itemApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [warehouseApi.reducerPath]: warehouseApi.reducer,
        [lotApi.reducerPath]: lotApi.reducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware()
                                        .concat(itemApi.middleware)
                                        .concat(categoryApi.middleware)
                                        .concat(warehouseApi.middleware)
                                        .concat(lotApi.middleware)
});

export default store;