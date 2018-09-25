const fs = require('fs')
const log = console.log

function file2buffer(path) {
    fs.readFile(path, (er, buf) => {
        // 直接 log Buffer 输出的是十六进制
        console.log(buf)
    
        // 通过索引获取的是十进制码点
        for(let i = 0; i < buf.length; i++) {
            console.log(String.fromCodePoint(buf[i]))
        }
    
        // toString 将 Buffer 转换成 utf8, utf8可省略
        log(buf.toString('utf8'))
    })
}

file2buffer('./names.txt')
