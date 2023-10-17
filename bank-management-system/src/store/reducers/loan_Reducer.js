const initialState = {
  status: false,
};

export function LoanReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "APPLY_LOAN":
      return {
        userData: payload,
        status: true,
      };
    case "ALREADY_APPLIED":
      return {
        ...state,
      };

    default:
      return state;
  }
}
