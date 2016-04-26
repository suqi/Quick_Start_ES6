/**
* @Author: HSZ <huangsizhe>
* @Date:   2016-04-05T17:09:35+08:00
* @Email:  hsz1273327@gmail.com
* @Last modified by:   huangsizhe
* @Last modified time: 2016-04-05T17:19:18+08:00
* @License: MIT
*/



module.exports = {
    entry: "./src/ex1.js",//入口文件
    output: {
        path: "./bin/",//出口文件位置
        filename: "bundle.js"//出口文件名
    },
    module: {
        loaders: [//加载器
            { test: /\.css$/, loader: "style!css" }
        ]
    }
}
