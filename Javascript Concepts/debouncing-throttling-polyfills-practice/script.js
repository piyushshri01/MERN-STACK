const btn = document.querySelector(".btn");
const press = document.querySelector(".press");
const trigger = document.querySelector(".trigger");

let pressCount = 0;
let triggerCount = 0;

// // for bebouncing by lodash
// const debouncedCount = _.debounce(() => {
//   trigger.innerHTML = ++triggerCount;
// }, 800);

// // for throttling by lodash
// const throttledCount = _.throttle(() => {
//   trigger.innerHTML = ++triggerCount;
// }, 800);

// debounce polyfill
const myDebounce = (cb, t) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, t);
  };
};
const debouncedCountPolyfiil = myDebounce(() => {
  triggerCount += 1;
  trigger.innerHTML = triggerCount;
}, 800);

// throttle Polyfill
const myThrottle = (cb, t) => {
  let last = 0;
  return function (...args) {
    let now = new Date().getTime();
    if (now - last < t) return;
    last = now;
    return cb(...args);
  };
};
const throttleCountPolyfill = myThrottle(() => {
  triggerCount += 1;
  trigger.innerHTML = triggerCount;
}, 800);

btn.addEventListener("click", () => {
  press.innerHTML = ++pressCount;
  // debouncedCount();
  // debouncedCountPolyfiil();
  // throttledCount();
  throttleCountPolyfill();
});
