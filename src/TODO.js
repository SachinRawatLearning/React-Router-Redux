let queue = [];
let isTimerRunning = false;
const processQueue = () => {
  if (queue.length > 0) {
    let errorQueue = queue.slice(0);
    queue = [];

    /// async
    console.log("Sending to the server: " + errorQueue); // send to the serv
  }
};
const errorLogger = (error) => {
  queue.push(error);

  if (!isTimerRunning) {
    isTimerRunning = true;
    setTimeout(() => {
      processQueue();
      isTimerRunning = false;
    }, 5000);
  }
};

function App() {
  const [count, setCount] = useState(1);

  const generateError = () => {
    errorLogger("Error - " + count);
    setCount(count + 1);
  };

  return <button onClick={generateError}>Generate Error</button>;
}

export default App;
        