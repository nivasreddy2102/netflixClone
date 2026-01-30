import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import moviesReducer from "./moviesSlice"
import searchSlice from "./searchSlice"
import configSlice from "./configSlice"

const appStore=configureStore({

    reducer:{
        user:userSlice,
        movies:moviesReducer,
        search:searchSlice,
        config:configSlice,
    }

})

export default appStore;
