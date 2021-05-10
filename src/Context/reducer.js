export const initialState = {
  label: "لیبل",
  placeholder: "جای نگهدارنده",
  options: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_LABEL":
      return {
        ...state,
        label: action.payload.label,
      };
    case "UPDATE_PLACEHOLDER":
      return {
        ...state,
        placeholder: action.payload,
      };
    case "DROPDOWN_OPTIONS":
      return {
        ...state,
        options: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
