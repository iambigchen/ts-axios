import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2,
    c: [1,2,3],
    d: {
      a: 1,
      b: 2
    }
  }
})
