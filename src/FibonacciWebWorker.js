import { useRef } from "react";

const FibonacciWebWorker = (num) => {
  const worker = useRef(null);

  if (!worker.current) {
    worker.current = new Worker(
      new URL("./fibonacciWorker.js", import.meta.url),
    );
    worker.current.onmessage = (event) => {
      console.log("Fibonacci result from worker:", event.data);
    };
    worker.current.postMessage({ num: num });
  }
};

export default FibonacciWebWorker;
