import { useReducer } from "react";

const useInput = (validateValueFunction) => {
  const initialInputState = {
    value: "",
    isTouched: false,
  };

  const inputStateReducer = (state, action) => {
    if (action.type === "INPUT")
      return { value: action.value, isTouched: state.isTouched };

    if (action.type === "BLUR") return { value: state.value, isTouched: true };
    if (action.type === "RESET") return { value: "", isTouched: false };

    return initialInputState;
  };

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValueFunction(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    // setIsTouched(true);
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    // setEnteredValue("");
    // setIsTouched(false);
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    isValid: valueIsValid,
    reset,
  };
};

export default useInput;
