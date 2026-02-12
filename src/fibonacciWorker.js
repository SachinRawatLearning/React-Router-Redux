self.onmessage = (e) => {
  const { num } = e.data;
  let result = null;

  const fibonacci = (n) => {
    console.log("Calculating Fibonacci for:", n); // Helps to see when it actually runs
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  result = fibonacci(num);
  self.postMessage(result);
};

// // Secondary Thread will be created by the new Worker() object
// self.onmessage = (e) => { // this function will be called in secondary thread

//     const { n } = e.data; // e.data contains copy of the object

//     console.log('Calculating Fibonacci for:', n); // Helps to see when it actually runs

//     function fibonacci(n) {
//         if (n < 2) return n;
//         return  fibonacci(n - 1) + fibonacci(n - 2);
//     }
//     const result = fibonacci(n);

//     self.postMessage(result); // sending the value back to the Main Thread

// }
