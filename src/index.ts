/**

Converts a function that uses a callback pattern to a function that returns a Promise instead.
If the original function is called with a callback, it is executed as usual.
If the original function is called without a callback, it returns a Promise.
@param {Function} fn - The function to be converted.
@returns {Function} A new function that returns a Promise.
*/
export const fromCallback = function (fn: Function): Function {
  return Object.defineProperty(function (...args: any[]) {
    if (typeof args[args.length - 1] === 'function') {
      // If called with a callback, execute as usual.
      fn.apply(this, args);
    } else {
      // If called without a callback, return a Promise.
      return new Promise((resolve, reject) => {
        fn(...args, (err: Error | null, res?: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      })
    }
  }, 'name', { value: fn.name });
};


/**

Wraps a function that returns a Promise, and returns a function that accepts a callback instead.
If the last argument to the returned function is a callback function, it calls the original function
with the provided arguments and passes the result or error to the callback. If the last argument is not
a callback function, it calls the original function with the provided arguments and returns the Promise.
@param {Function} fn - The function that returns a Promise.
@returns {Function} The wrapped function that accepts a callback or returns a Promise.
*/
export const fromPromise = function (fn: Function): Function {
  return Object.defineProperty(function (...args: any[]) {
  const cb = args[args.length - 1]
  if (typeof cb !== 'function') return fn.apply(this, args)
  else fn.apply(this, args.slice(0, -1)).then(
  (r: any) => cb(null, r),
  (err: Error) => cb(err)
  )
  }, 'name', { value: fn.name })
  }