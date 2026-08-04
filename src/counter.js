import "./counter.css";

export function Counter() {
  const date = new Date("February 24 ,2026");

  return (
    <>
      <div>
        <div className="step btn">
          <button>-</button>
          <p>Step</p>
          <button>+</button>
        </div>
        <div className="count btn">
          <button>-</button>
          <p>Count</p>
          <button>+</button>
        </div>
        <div>
          <p>Today is {date.toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
}
