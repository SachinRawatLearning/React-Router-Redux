import { useState } from "react";
import { increment, decrement } from "./counterSlice";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
const Settings = () => {
  const count = useSelector((state) => state.counterReducer.value);
  const dispatch = useDispatch();
  return (
    <>
      <button className="increment-btn" onClick={() => dispatch(increment())}>
        Increment: {count}
      </button>
      <span></span>
      <button className="decrement-btn" onClick={() => dispatch(decrement())}>
        Decrement: {count}
      </button>
    </>
  );
};
//On change of child component, count is lost. This is because the state is local to the Settings component and is not preserved when navigating between routes. When you navigate away from the Settings component and then return to it, a new instance of the component is created, and the state is reset to its initial value (0 in this case). To preserve the state across route changes, you can use a global state management solution like React Context or a state management library like Redux. Alternatively, you can also use URL parameters or local storage to persist the state across route changes.
export default Settings;
