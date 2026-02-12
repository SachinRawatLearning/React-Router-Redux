import { useEffect } from "react";
import { useState, useMemo, useRef } from "react";

// The computationally expensive function is defined outside the component
// const fibonacci = (n) => {
//     console.log('Calculating Fibonacci for:', n); // Helps to see when it actually runs
//     if (n < 2) return n;
//     return fibonacci(n - 1) + fibonacci(n - 2);
// };
const hashMap = {};
function FibonacciComponent() {
  const [num, setNum] = useState(10);
  const [count, setCount] = useState(0); // An unrelated state
  const [fibValue, setFibValue] = useState(0);
  const workerRef = useRef(null);

  useEffect(() => {
    if (hashMap[num]) {
      setFibValue(hashMap[num]);
      return;
    }

    if (workerRef.current == null) {
      setFibValue("Please wait...");

      workerRef.current = new Worker(
        new URL("./fibonacciWorker.js", import.meta.url),
      ); // MT

      workerRef.current.onmessage = (e) => {
        setFibValue(e.data);
        hashMap[num] = e.data;
        workerRef.current = null;
      };

      workerRef.current.postMessage({ num: num });
    }

    return () => {
      if (workerRef.current != null) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [num]);

  // Memoize the result of the fibonacci calculation
  //   const fibValue = useMemo(() => fibonacci(num), [num]);
  // The function runs only when 'num' changes.

  return (
    <div>
      <h1>Fibonacci Calculator</h1>

      {/* Input for the number */}
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(Number(e.target.value))}
      />
      <p>
        The Fibonacci number for {num} is: {fibValue}
      </p>

      <hr />

      {/* Unrelated counter button */}
      <button onClick={() => setCount((c) => c + 1)}>
        Increment Counter (unrelated re-render)
      </button>
      <p>Counter: {count}</p>
    </div>
  );
}

export default FibonacciComponent;
