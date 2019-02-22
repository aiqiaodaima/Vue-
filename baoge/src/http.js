import axios from 'axios';
import qs from 'qs'
import {
  Message
} from 'element-ui';

axios.defaults.timeout = 50000;
// axios.defaults.baseURL = 'http://192.168.1.150:1002';
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://192.168.1.150:1002';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://yd.imuts.cn';
}

// 设置提交数据的格式
axios.defaults.transformRequest = [function (data,headers) {
  if (headers['Content-Type'] === 'application/json;charset=UTF-8') {
    return JSON.stringify(data)
  } else {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }
}]
// 设置请求头
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
//  跨域
axios.defaults.withCredentials = true
//POST传参序列化
// axios.interceptors.request.use((config) => {
//   // config.headers = {
//   //   'Content-Type':'application/x-www-form-urlencoded'
//   // }
//   if (config.method === 'post') {
//     // 用JSON方法不行
//     // config.data = JSON.stringify(config.data);
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        querry: {
          redirect: router.currentRoute.fullPath
        } //从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
