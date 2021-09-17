import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import photoReducer from "./reducers/images.reducer";
import thunkMiddleware from "redux-thunk";

const allReducers = combineReducers({
  photos: photoReducer,
});

const store = createStore(
  allReducers,
  compose(applyMiddleware(thunkMiddleware))
);

console.log("divij store ---", store.getState());
export default store;
