import { fromPromise } from  "../src/"


describe('fromPromise', () => {
  const fn = jest.fn(async (arg1: number, arg2: string) => {
    return `${arg1}:${arg2}`
  })

  const callbackFn = fromPromise(fn)

  it('returns a function with the same name', () => {
    expect(callbackFn.name).toBe(fn.name)
  })

  it('calls the original function with Promise arguments', async () => {
    await callbackFn(1, 'test')
    expect(fn).toHaveBeenCalledWith(1, 'test')
  })

  it('returns the Promise result to the callback', (done) => {
    const callback = (err: Error, result: any) => {
      expect(err).toBeNull()
      expect(result).toBe('1:test')
      done()
    }
    callbackFn(1, 'test', callback)
  })

  it('returns an error to the callback', (done) => {
    const error = new Error('test error')
    fn.mockImplementationOnce(async () => {
      throw error
    })
    const callback = (err: Error, result: any) => {
      expect(err).toBe(error)
      expect(result).toBeUndefined()
      done()
    }
    callbackFn(1, 'test', callback)
  })
})
