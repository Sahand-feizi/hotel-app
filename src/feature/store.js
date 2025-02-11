import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./hotels/hotelsSlice";
import walletReducer from "./wallet/walletSlice";

const store = configureStore({
    reducer:{
        hotels: hotelsReducer,
        wallet: walletReducer
    }
})

export default store