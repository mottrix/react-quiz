import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "countChange":
      return { ...state, count: action.payload };

    case "stepChange":
      return { ...state, step: action.payload };

    case "inc":
      return { ...state, count: state.count + state.step };

    case "dec":
      return { ...state, count: state.count - state.step };
    case "rest":
      return { count: 0, step: 1 };
    default:
      throw new Error("an error");
  }
}
export function DateCounter() {
  const initialState = { step: 1, count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, count } = state;
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: "stepChange", payload: Number(e.target.value) })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          value={count}
          onChange={(e) =>
            dispatch({ type: "countChange", payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "rest" })}>Reset</button>
      </div>
    </div>
  );
}
