import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { increment, decrement } from "../app/features/couter/counterSlice";

const Counter = () => {
  // Reading the Data
  const count = useAppSelector((state) => state.counter.value);

  // Changing the data
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
};

export default Counter;
