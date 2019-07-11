import axios from '../../src/index'

axios({
  method: 'post',
  url: '/body/post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(123, res)
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/body/post',
  data: searchParams
})

axios.post('/body/post', searchParams).then(res => {
  console.log(1234, res)
})
