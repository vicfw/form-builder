import {
  DROPDOWN_OPTIONS,
  OTHER_INPUTS,
  HANDLE_TYPES,
  HANDLE_ALLBOXES_ID,
  CREATE_ROW,
} from "./type";

//Form Builder 2
export const addDropdownOptions = input => {
  return {
    type: DROPDOWN_OPTIONS,
    payload: input,
  };
};

export const addOtherInputs = input => {
  return {
    type: OTHER_INPUTS,
    payload: input,
  };
};

export const handleTypes = input => {
  return {
    type: HANDLE_TYPES,
    payload: input,
  };
};

export const handleAllBoxesId = input => {
  return {
    type: HANDLE_ALLBOXES_ID,
    payload: input,
  };
};

export const handleCreateRow = input => {
  return {
    type: CREATE_ROW,
    payload: input,
  };
};
