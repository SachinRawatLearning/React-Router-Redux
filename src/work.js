self.onmessage = (e) => {
  const { start, end } = e.data; // e is copied not shared between main thread and worker thread. So we can safely access e.data without worrying about race conditions
  let count = 0;
  console.log("Worker started counting to 100 billion");
  for (let i = start; i <= end; i++) {
    count++;
  }
  console.log("Worker finished counting to 1 billion");
  self.postMessage(count);
};

//Secondary thread will be created by the new Worker() object

//this function will be called in secondary thread
//place it in a separate file and import it in webworker file
//always put code in self.onmessage to avoid polluting global scope and to make sure it runs in worker context
