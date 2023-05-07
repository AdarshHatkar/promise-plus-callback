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