const initialState = {
  value: 0
};

export const CalcReducer = (state = initialState, action) => {
  if (action.type === "increament") {
    let value = state.value + 100;
    return { ...state, value };
  }
  if (action.type === "decreament") {
    let value = state.value - 100;
    return { ...state, value };
  }
  return state;
};
