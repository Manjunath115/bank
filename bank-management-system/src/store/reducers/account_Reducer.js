const initialState = {
  balance: 0,
};

export function AccountReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_INITIAL_DEPOSITE":
        console.log(payload);
      return {
        ...state,
        balance: payload,
      };
    case "DEPOSITE":
        console.log(payload,'in deposite');
      return {
        ...state,
        balance:state.balance+ payload,
      };
    default:
      return state;
  }
}
