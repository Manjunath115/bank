const initialState = {
  users: [],
  isAuthenticated:false,
  user:[],
  // products: [{ id: 1, name: "apple", price: "200" }],
};
export function AuthReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "REGISTERED_USER":
      return {
        ...state,
        users: [...state.users, payload],
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated:true,
        user: [...state.user,payload],
      };
      case "LOGOUT":
        return {
          ...state,
            // user:null,
            isAuthenticated:false,
        }
    default:
      return state;
  }
}
