import { createStore } from "redux";
import { CalcReducer } from "./CalcReducers";

const store = createStore(CalcReducer);
export default store;
