import Vuex from 'vuex'
import { createStore } from "vuex";
import variables from "./variables";

export default createStore({
    modules: {
        variables
    }
});
