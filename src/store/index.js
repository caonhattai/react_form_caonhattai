import { createStore } from "redux";
import rootRedcuer from "./rootReducer";

const store = createStore(
  rootRedcuer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
