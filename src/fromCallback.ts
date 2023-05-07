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
  