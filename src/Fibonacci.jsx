import { useEffect } from "react";
import { useState, useMemo, useRef } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value); // put new value in the state
    }, delay);

    // Cleanup function: clear the timeout if the value or delay changes
    // This resets the timer on each new input, ensuring the handler
    // only runs after the user has stopped typing for the 'delay' duration
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Rerun effect only if value or delay changes

  return debouncedValue;
}

function useWorker(url) {
  const [isWorkerRunning, SetIsWorkerRunning] = useState(false);
  const [result, setResult] = useState(null);

  const workerRef = useRef(null);

  useEffect(() => {
    return () => {
      terminateWorker();
    };
  }, []);

  const startWorker = (n) => {
    if (workerRef.current == null) {
      setResult(null);

      workerRef.current = new Worker(url); // MT

      workerRef.current.onmessage = (e) => {
        workerRef.current = null;
        setResult(e.data);
        SetIsWorkerRunning(false);
      };

      SetIsWorkerRunning(true);

      workerRef.current.postMessage({ n });
    }
  };

  const terminateWorker = () => {
    if (workerRef.current != null) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  };

  return [startWorker, terminateWorker, isWorkerRunning, result];
}

const hashmap = {}; // every object created using { } is a hashmap
function FibonacciComponent() {
  const [num, setNum] = useState(10);
  const [count, setCount] = useState(0); // An unrelated state
  // const [fibValue, setFibValue] = useState(0);
  const [startWorker, terminateWorker, isWorkerRunning, fibValue] = useWorker(
    new URL("./fibonacciWorker.js", import.meta.url),
  );
  const debouncedNum = useDebounce(num, 500);

  useEffect(() => {
    if (hashmap[num]) {
      setFibValue(hashmap[num]);
      return;
    }

    startWorker(num);

    return () => {
      terminateWorker();
    };
  }, [debouncedNum]);

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
        The Fibonacci number for {num} is: {fibValue}{" "}
        {isWorkerRunning && "Please Wait..."}
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

// function FibonacciComponent() {
//     const [num, setNum] = useState(10);
//     const [count, setCount] = useState(0); // An unrelated state
//     const [fibValue, setFibValue] = useState(0);
//     const [wait, setWait] = useState(false);
//     const workerRef = useRef(null);
//     //new URL("../fibonacci.js", import.meta.url)

//     useEffect(() => {

//         if (hashmap[num]) {
//             setFibValue(hashmap[num]);
//             return;
//         }

//         if (workerRef.current == null) {

//             setFibValue("");

//             setWait(true);

//             workerRef.current = new Worker(
//                 new URL("../fibonacci.js", import.meta.url)); // MT

//             workerRef.current.onmessage = (e) => {
//                 hashmap[num] = e.data;
//                 setFibValue(e.data);
//                 workerRef.current = null;
//                 setWait(false);
//             };

//             workerRef.current.postMessage({ n: num });

//         }

//         return () => {
//             if (workerRef.current != null) {
//                 workerRef.current.terminate();
//                 workerRef.current = null;
//             }
//         }

//     }, [num]);

//     // Memoize the result of the fibonacci calculation
//     //   const fibValue = useMemo(() => fibonacci(num), [num]);
//     // The function runs only when 'num' changes.

//     return (
//         <div>
//             <h1>Fibonacci Calculator</h1>

//             {/* Input for the number */}
//             <input
//                 type="number"
//                 value={num}
//                 onChange={(e) => setNum(Number(e.target.value))}
//             />
//             <p>The Fibonacci number for {num} is: {fibValue} {wait && "Please Wait..."}</p>

//             <hr />

//             {/* Unrelated counter button */}
//             <button onClick={() => setCount(c => c + 1)}>
//                 Increment Counter (unrelated re-render)
//             </button>
//             <p>Counter: {count}</p>
//         </div>
//     );
// }

export default FibonacciComponent;
