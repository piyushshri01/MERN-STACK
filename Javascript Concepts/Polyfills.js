// HOC polyfill(map, filter, reduce)
// call, apply, bind polyfill
// PRomise.all, flatten Array and object, setTimeout polyfills
// what is prototype , prototype nature of javascript

// let users = [1, 2, 3, 4, 5];

// // Map polyfill
// Array.prototype.myMap = function (callBack) {
//   const newArray = [];
//   for (let i = 0; i < this.length; i++) {
//     newArray.push(callBack(this[i]));
//   }
//   return newArray;
// };

// // console.log(users.myMap((val) => val + val));

// // filter polyfill
// Array.prototype.myFilter = function (callBack) {
//   const newArray = [];
//   for (let i = 0; i < this.length; i++) {
//     let tmp = callBack(this[i]);
//     if (tmp) {
//       newArray.push(tmp);
//     }
//   }
//   return newArray;
// };

// // let res = users.myFilter((val) => {
// //     if (val > 2) {
// //       return val;
// //     }
// //   })
// // console.log(res)

// // Reduce polyfill
// Array.prototype.myReduce = function (callBack, initialVal) {
//   let ans = initialVal;
//   for (let i = 0; i < this.length; i++) {
//     ans = callBack(ans, this[i]);
//   }
//   return ans;
// };

// let initialValue = 0;
// let ans = users.myReduce((acc, value) => acc + value, initialValue);
// console.log(ans);

let obj1 = {
    name: "piyush",
    city: "jaipur"
  };
  
  function sayHello(state) {
    console.log(this.name + " from " + this.city + " " + state);
  }
  
  let obj2 = {
    name: "pulkit",
    city: "jaipur"
  };
  
  // sayHello.call(obj1, "rajasthan");
  // sayHello.apply(obj2, ["rajasthan"]);
  
  // let methodBorrowing = sayHello.bind(obj1, "raj");
  // methodBorrowing();
  // console.log(obj1);
  
  // Bind polyfill
  // Function.prototype.myBind = function (...args) {
  //   let obj = this; // this represents function
  //   let params = args.slice(1);
  //   return function (...args2) {
  //     obj.apply(args[0], [...params, ...args2]);
  //   };
  // };
  
  // let myBind = sayHello.myBind(obj1);
  // myBind("rajasthan");
  
  // Call polyfill
  Function.prototype.myCall = function (obj = {}, ...args) {
    obj.fn = this;
    obj.fn(...args);
    delete obj.fn;
  };
  
  // sayHello.myCall(obj1, "Rajasthan");
  // console.log(obj1, "older");
  
  // Apply polyfill
  Function.prototype.myApply = function (currentContext = {}, arg = []) {
    currentContext.fn = this;
    currentContext.fn(...arg);
    delete currentContext.fn;
  };
  
  sayHello.myApply(obj1, ["Rajasthan", "maharashtra"]);
  console.log(obj1, "older");
  