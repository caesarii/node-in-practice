function base64(str) {
    // 创建 base64 buffer
    // 转换
    base64Buf = new Buffer(str).toString('base64')
    console.log(base64Buf)
}

const str = 'name : 123455'
base64(str)



