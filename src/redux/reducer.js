import {
  DEL_FORM,
  DROPDOWN_OPTIONS,
  OTHER_INPUTS,
  HANDLE_TYPES,
  HANDLE_ALLBOXES_ID,
  CREATE_ROW,
} from "./type";

const initialState = {
  elements: [],
  //state for form builder
  options: null,
  otherInputs: null,
  type: null,
  allBoxesId: [],
  rows: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DEL_FORM:
      return {
        ...state,
        elements: [],
      };

    //reducers for form builder
    case HANDLE_TYPES:
      return {
        ...state,
        type: action.payload,
      };

    case HANDLE_ALLBOXES_ID:
      return {
        ...state,
        allBoxesId: action.payload,
      };

    case DROPDOWN_OPTIONS:
      return {
        ...state,
        options: action.payload,
      };

    case OTHER_INPUTS:
      return {
        ...state,
        otherInputs: action.payload,
      };

    case CREATE_ROW:
      return {
        ...state,
        rows: action.payload,
      };

    default:
      return state;
  }
};
