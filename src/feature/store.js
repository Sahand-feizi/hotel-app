import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./hotels/hotelsSlice";
import walletReducer from "./wallet/walletSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
    reducer:{
        hotels: hotelsReducer,
        wallet: walletReducer,
        auth: authReducer
    }
})

export default store