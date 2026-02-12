import React, { useRef, useState } from "react";

const WebWorkerComponent = () => {
  const workerRef = useRef(null);
  const [message, setMessage] = useState("");
  const createNewWorker = () => {
    setMessage("");
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL("./work.js", import.meta.url)); //Main thread will create a new worker thread and execute the code in work.js file.
      //import.meta.url is the URL of the current module. It is used to create a new URL for the worker script. This is necessary because the worker script needs to be loaded from a separate file, and using import.meta.url ensures that the correct path is used regardless of where the main script is located.
      workerRef.current.onmessage = (event) => {
        //Worker message should be collected here.
        console.log("Message from worker:", event.data);
        setMessage(event.data);
        workerRef.current = null;
      };
      workerRef.current.postMessage({ start: 1, end: 10000000000 }); //Starts function in worker
      //Object send to worker are copied, not shared. So if we send an object to worker and change it in main thread, it will not change in worker thread. If we want to share data between main thread and worker thread, we can use SharedArrayBuffer.
      //Called marshalling
    } // Main thread returns immediately after creating the worker and continues with other tasks. The worker runs in the background and sends messages back to the main thread when it has results to share.
  };

  const terminateWorker = () => {
    if (workerRef.current) {
      setMessage("Terminating worker...");
      workerRef.current.terminate();
      workerRef.current = null;
    }
  };

  return (
    <>
      <button onClick={createNewWorker}>Create Worker</button>
      <button onClick={terminateWorker}>Terminate Worker</button>
      <br />
      <h1>Message from worker: {message}</h1>
    </>
  );
};

export default WebWorkerComponent;
