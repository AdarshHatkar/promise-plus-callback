import { fromCallback } from "../src"



describe('fromCallback', () => {
    const fn = jest.fn((arg1, arg2: string, callback: Function) => {
        callback(null, `${arg1}:${arg2}`)
    })

    const promiseFn = fromCallback(fn)

    it('returns a function with the same name', () => {
        expect(promiseFn.name).toBe(fn.name)
    })

    it('calls the original function with callback arguments', done => {
        promiseFn(1, 'test', (err: any, result: any) => {
            expect(fn).toHaveBeenCalledWith(1, 'test', expect.any(Function))
            done()
        })
    })

    it('returns a Promise with the result', async () => {
        const result = await promiseFn(1, 'test')
        expect(result).toBe('1:test')
    })

    it('returns a Promise with an error', async () => {
        const error = new Error('test error')
        fn.mockImplementationOnce((arg1: number, arg2: string, callback: Function) => {
            callback(error)
        })
        await expect(promiseFn(1, 'test')).rejects.toThrow(error)
    })
})