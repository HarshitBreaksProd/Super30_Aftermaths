import React, { useState } from "react";
import Counter from "./components/Counter";

const App = () => {
  const [stateVal, setStateVal] = useState(1);

  let val = 2;

  const func = () => {
    console.log("val", val);
    console.log(stateVal);
    val++;
    setStateVal(stateVal + 2);
  };

  return (
    <div>
      <Counter />
      <button onClick={func}>here </button>
    </div>
  );
};

export default App;
