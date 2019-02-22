import api from '../api/config'
import OSS from 'ali-oss'
// import { isBuffer } from 'util'
let ossName = api.OSS_NAME
let client = OSS({
  accessKeyId: "LTAIzVoWY3AdBfOR",
  accessKeySecret: "qsZpfUp7sClQ6ZT9atqFTUgjGtBnvs",
  //endpoint: vm.$oss
  //endpoint: "https://oss-cn-shenzhen.aliyuncs.com",
  endpoint: ossName.replace(/(https:\/\/)(\w*\.)|(\.com)(\/\w*)/g, '$1$3'),
  bucket: ossName.split(/https:\/\/|\.oss/)[1]
})
let uploadRequest = (option) => {
  console.log(option)
  let file = option.file
  let data = option.data || {}
  const point = file.name.lastIndexOf(".")
  let suffix = file.name.substr(point)
  let path = ossName.split(/\.com\//)[1] + '/'
  let UUID = getUUID(3)
  data.filePath && (path += data.filePath + '/')
  let fileNames = `${path}${UUID}${suffix}`
  console.log(fileNames)
  // 分片上传文件
  client.multipartUpload(fileNames, file, {
    progress: async function (p) {
      let e = {}
      e.percent = p * 100
      option.onProgress(e)
    }
  }).then(ret => {
    console.log(ret)
    if (ret.res.statusCode === 200) {
      option.onSuccess(ret)
      return ret
    }
  }).catch(err => {
    console.log(err)
    option.onError("上传失败")
  })
}

// fileName 文件名
let deleteFile = (fileName) => {
  return client.delete(fileName)
}

// fileNamArr 数组 文件名的数组
let deleteFileMulti = (fileNameArr) => {
  return client.deleteMulti(fileNameArr)
}

// fileName 文件名
let downloadFile = (fileUrl, fileName) => {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  let Images = new Image()
  fileName = fileName || fileUrl.split('/').slice(-1)[0].split(/\?|\#/)[0]
  Images.src = fileUrl + '?' + Date.now()
  Images.crossOrigin = 'anonymous'
  Images.onload = function () {
    canvas.width = Images.width
    canvas.height = Images.height
    context.drawImage(Images, 0, 0, Images.width, Images.height)
    let save_link = document.createElement('a')
    save_link.href = canvas.toDataURL("image/jpeg")
    save_link.download = fileName
    save_link.click()
  }
}
/**
 * @name getUUID
 * @description 生成一个用不重复的ID
 *
 */
function getUUID(randomLength) {
  return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}

export default{
  uploadRequest,
  deleteFile,
  deleteFileMulti,
  downloadFile,
  api
}
