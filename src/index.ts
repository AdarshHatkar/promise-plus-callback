export const fromCallback = function(fn: Function) {
    return Object.defineProperty(function (...args: any[]) {
      if (typeof args[args.length - 1] === 'function') fn.apply(this, args)
      else {
        return new Promise((resolve, reject) => {
          fn.call(
            this,
            ...args,
            (err: Error | null, res?: any) => (err != null) ? reject(err) : resolve(res)
          )
        })
      }
    }, 'name', { value: fn.name })
  }


  export const fromPromise = function(fn: Function) {
    return Object.defineProperty(function (...args: any[]) {
      const cb = args[args.length - 1]
      if (typeof cb !== 'function') return fn.apply(this, args)
      else fn.apply(this, args.slice(0, -1)).then(
        (r: any) => cb(null, r),
        (err: Error) => cb(err)
      )
    }, 'name', { value: fn.name })
  }