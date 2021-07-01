const mockAxios: any = jest.genMockFromModule("axios")

// 首先需要mock掉整个axios模块
// 对axios中的create方法进行一个mock对我们的各种类型的方法进行一个模拟
// 这里统一采用了promise中的resolve场景，并且指定一个空的data，最后抛出这个模拟的模块
mockAxios.create = jest.fn(() => mockAxios)
mockAxios.get = jest.fn(() => Promise.resolve({ headers: { "x-onetimetoken": "" }, data: {} }))
mockAxios.post = jest.fn(() => Promise.resolve({ headers: { "x-onetimetoken": "" }, data: {} }))
mockAxios.put = jest.fn(() => Promise.resolve({ headers: { "x-onetimetoken": "" }, data: {} }))
mockAxios.delete = jest.fn(() => Promise.resolve({ headers: { "x-onetimetoken": "" }, data: {} }))
mockAxios.all = jest.fn(() => Promise.resolve())

export default mockAxios
