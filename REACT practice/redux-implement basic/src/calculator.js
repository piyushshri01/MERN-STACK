import { useSelector, useDispatch } from "react-redux";
const Calculator = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.value);
  return (
    <>
      <button onClick={() => dispatch({ type: "increament" })}>
        Increament
      </button>
      <p>{value}</p>
      <button onClick={() => dispatch({ type: "decreament" })}>
        Decreament
      </button>
    </>
  );
};

export default Calculator;
