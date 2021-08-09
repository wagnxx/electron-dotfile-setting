# 项目简介
该项目主要以Electron为主，核心功能是实现 对动态配置文件进行可视化在线编辑：
- 添加文件到菜单，该文件处于待编辑任务
- key-value 形式，有disabled状态代表注释行
- 添加 key，数据保存本地
- 预览 文件
- apply ，clean，同步操作本地数据和文件





# Note

### NodeJS

1. fs
- stat
```js
const fs = require('fs')
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  stats.isFile() //true
  stats.isDirectory() //false
  stats.isSymbolicLink() //false
  stats.size //1024000 //= 1MB
})

```


2. path

- 方法
```js
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt

```