import { GET_IMAGES } from "../actions/types";

const initialState = {
  photos: [],
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        photos: [...action.photos],
      };
    default:
      return state;
  }
};

export default photoReducer;
