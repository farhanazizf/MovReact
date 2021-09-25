import { createStore } from "redux";

const initState = {
  value: 0,
  loading: false,
  imdbID: "",
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_ON":
      return {
        ...state,
        loading: true,
      };
    case "LOADING_OFF":
      return {
        ...state,
        loading: false,
      };
    case "SELECT_IMDB":
      return {
        ...state,
        imdbID: action.value,
      };
    default:
      return state;
  }
  // return state;
};

export const storeRedux = createStore(rootReducer);
