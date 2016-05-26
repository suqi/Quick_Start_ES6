
Javascript是当今最火的编程语言之一,而最新标准ES6则因为加入了大量语法糖以跳过语言设计时留下的坑而大大增加了js代码的可维护性和入门难度,在有python语言的学习经验之下,入门ES6是非常简单的一个过程.

由于历史原因Javascript的运行环境有两种:

+ 浏览器

    浏览器环境复杂,一般通过babel转码的形式间接地使用ES6特性

+ node.js(v8虚拟机)

    v8引擎原生的支持一些ES6特性,但在有的时候也不得不通过使用Babel转码来实现一些特定的语法.使用node.js的原生ES6支持需要在使用node命令时后面带上`--harmony`参数,方便起见可以在环境变量中直接使用`alias node=node --harmony`语句,这样就可以在repl中使用ES6支持了,但如果要执行脚本,必须开启js的严格模式,也就是在每个脚本头上写上`"use strict"`

他们之间多数时候编程语言是通的,而且默认都最高支持到ES5标准,要使用ES6标准我们还必须使用babel编译器将ES6标准的代码编译成浏览器和node.js支持的低版本js代码才可以顺利执行. 

这一篇和之后两篇主要就是讲的ES6的运行环境搭建配置和工具链

# npm

npm是node.js的官方包管理工具,它可以用于全局环境的搭建,也可以用于单独项目的环境搭建,全局环境可以理解为python中的pip工具的功能,而单独项目管理可以理解为python中的虚拟环境类似概念,只是一个虚拟环境对应一个项目

npm的工具的操作有:

## 通用操作

操作|说明
---|---
npm search <package> |查找包
npm view <package> dependencies|查看包的依赖关系
npm view <package> repository.url|查看包的源文件地址
npm view <package> engines|查看包所依赖的Node的版本
npm root| 查看项目路径,可以加`-g`表示全局的package存储位置
npm install <package>|安装包,可以加`-g`表示全局,`--save`表示计入配置文件的`Dependencies`,`--save-dev`表示计入配置文件的`devDependencies`
npm uninstall <package>|卸载包,可以加`-g`表示全局
npm update <package> |更新包,可以加`-g`表示全局
npm outdated |检查过时的包,可以加`-g`表示全局
npm list| 查看当前目录下已安装的node包<br>注意事项：Node模块搜索是从代码执行的当前目录开始的，搜索结果取决于当前使用的目录中<br>node_modules下的内容。`$ npm list parseable=true`可以目录的形式来展现当前安装的所有node包,可以加`-g`表示全局


## 全局环境设置专用操作
操作|说明
---|---
npm adduser|创建npm的用户
npm config ls|查看npm在机器上的设置


## 单独项目专用操作

操作|说明
---|---
npm init|初始化一个项目,会生成一个`package.json`作为配置文件来管理该项目


## package.json配置文件

package.json是一个node.js项目的配置文件,它大约是这样的:

```json
{
  "name": "ex3",    //项目名
  "version": "1.0.0", //版本
  "description": "", //描述
  "main": "index.js", //入口文件
  "scripts": {  //可运行的脚本
    "docs": "esdoc -c esdoc.json",
    "start": "gulp",
    "lint": "gulp lint",
    "test":"./node_modules/.bin/babel-node ./node_modules/.bin/isparta cover --report html ./node_modules/.bin/_mocha "
  },
  "author": "hsz",//作者
  "license": "ISC",//版权声明
  "devDependencies": {//开发用的依赖
    "babel-cli": "^6.6.5",
    "babel-core": "^6.7.4",
    "babel-eslint": "^6.0.2",
    "babel-loader": "^6.2.4",
    "babel-polyfill": "^6.7.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-register": "^6.7.2",
    "chai": "^3.5.0",
    "esdoc": "^0.4.6",
    "eslint": "^2.7.0",
    "gulp": "^3.9.1",
    "gulp-clean": "^0.3.2",
    "gulp-eslint": "^2.0.0",
    "gulp-minify-html": "^1.0.6",
    "gulp-notify": "^2.2.0",
    "gulp-rename": "^1.2.2",
    "gulp-uglify": "^1.5.3",
    "gulp-util": "^3.0.7",
    "isparta": "^4.0.0",
    "mocha": "^2.4.5",
    "mochawesome": "^1.3.2",
    "webpack": "^1.12.14"
  }
}
```
## 依赖的版本声明

使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码，这里简单介绍一下。
语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。
如果只是修复bug，需要更新Z位。
如果是新增了功能，但是向下兼容，需要更新Y位。
如果有大变动，向下不兼容，需要更新X位。
版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。

版本控制同样支持通配符

+ \*: 任意版本
+ 1.1.0: 指定版本
+ ~1.1.0: >=1.1.0 && < 1.2.0
+ ^1.1.0: >=1.1.0 && < 2.0.0
+ 其中 ~ 和 ^ 两个前缀让人比较迷惑，简单的来说：
+ ~ 前缀表示，安装大于指定的这个版本，并且匹配到 x.y.z 中 z 最新的版本。
+ ^ 前缀在 ^0.y.z 时的表现和 ~0.y.z 是一样的，然而 ^1.y.z 的时候，就会 匹配到 y 和 z 都是最新的版本。

特殊的是，当版本号为 ^0.0.z 或者 ~0.0.z 的时候，考虑到 0.0.z 是一个不稳定版本， 所以它们都相当于 =0.0.z。


## 墙内换源

npm虽好,但无奈天朝有墙,我们只能用国内镜像作为源了

在你的home目录下,编辑`~/.npmrc `,

```shell
registry =https://registry.npm.taobao.org
```

# babel安装:

主流的babel版本是5和6,这边以6为标准,如果要使用babel6,那么你需要用npm安装以下几个包


+ babel-core             编译器核心
+ babel-cli              包含一个repl和一个叫babel-node的程序,用来代替node先编译再执行程序
+ babel-preset-es2015    es6的语法特性包

    主要是:
    
    + Arrow functions
    + Async functions
    + Async generator functions
    + Block scoping
    + Block scoped functions
    + Classes
    + Class properties
    + Computed property names
    + Constants
    + Decorators
    + Default parameters
    + Destructuring
    + Do expressions
    + Exponentiation operator
    + For-of
    + Function bind
    + Generators
    + Modules
    + Module export extensions
    + New literals
    + Object rest/spread
    + Property method assignment
    + Property name shorthand
    + Rest parameters
    + Spread
    + Sticky regex
    + Template literals
    + Trailing function commas
    + Type annotations
    + Unicode regex


+ babel-polyfill         es6的运行时支持,包括数据结构的新增api和一些其他需要运行时操作的语法

    主要是:
    
    + ArrayBuffer
    + Array.from
    + Array.of
    + Array#copyWithin
    + Array#fill
    + Array#find
    + Array#findIndex
    + Function#name
    + Map
    + Math.acosh
    + Math.hypot
    + Math.imul
    + Number.isNaN
    + Number.isInteger
    + Object.assign
    + Object.is
    + Object#entries
    + Object.setPrototypeOf
    + Promise
    + Reflect
    + RegExp#flags
    + Set
    + String#codePointAt
    + String#endsWith
    + String.fromCodePoint
    + String#includes
    + String.raw
    + String#repeat
    + String#startsWith
    + Symbol
    + WeakMap
    + WeakSet
    
+ babel-register         es6的import特性支持包

+ babel-runtime          es6的运行时帮助

+ babel-plugin-transform-runtime     es6的运行时帮助插件

装好这些以后,如果要在当前目录中可以使用es6,那么需要在`package.json`中配置:

```json
"babel":{
		"presets": ["es2015"],                //语法包
        "plugins": ["transform-decorators"]   //插件
	}
```
这样就可以了

值得一提的是babel支持模块化的新怎语法特性,只要安装插件并配置到`babel`字段即可

要在node环境下使用ES6,那么已经可以了~

> 例1 第一个babel-node程序:

1. 在项目下安装依赖包:

    ```shell
    npm init
    npm install babel-core babel-cli babel-preset-es2015 babel-polyfill babel-register --save-dev
    ```

2. 修改`package.json` 

    ```json
    {
      "name": "ex1",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "start": "./node_modules/.bin/babel-node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "babel-cli": "^6.7.5",
        "babel-core": "^6.7.6",
        "babel-polyfill": "^6.7.4",
        "babel-preset-es2015": "^6.6.0",
        "babel-register": "^6.7.2"
      },
      "babel":{
        "presets": ["es2015"]
      }
    }
    ```
3. 新建一个入口文件`index.js`
    
    ```javascript
    import http from 'http'
    http.createServer((request, response) => {
        /**
        *发送 HTTP 头部
        * HTTP 状态值: 200 : OK
        * 内容类型: text/plain
        */
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        // 发送响应数据 "Hello World"
        response.end('Hello World\n')
    }).listen(8899)

    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8899/')
    ```
    
4. 运行`npm run start`

这样打开`localhost:8899`就可以看到第一个helloworld了

要在浏览器端使用babel需要先编译(其实babel-node也是先编译再执行而已)成浏览器可用的脚本,之后再运行那个脚本即可

> 例2 第一个浏览器端的ES6脚本

我们的项目目录是这个样子:

    ex2\
       |-js\
       |   |-src\
       |   |    |-hello.js
       |   |
       |   |-bin\
       |
       |-html\
       |     |-src\
       |     |    |-index.html
   
   
我们要让它实现脚本渲染helloworld出来

1. 依然是安装各种依赖

    ```shell
    npm init
    npm install babel-core babel-cli babel-preset-es2015 babel-polyfill babel-register --save-dev
    ```
    
2. 修改`package.json` 

    ```json
    {
      "name": "ex2",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "build": "babel js/src -d js/bin",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "babel-cli": "^6.7.5",
        "babel-core": "^6.7.6",
        "babel-polyfill": "^6.7.4",
        "babel-preset-es2015": "^6.6.0",
        "babel-register": "^6.7.2"
      },
      "babel":{
        "presets": ["es2015"]
      }
    }
    ```
    
3. 编辑`index.html`

    ```html
    <!--
    @Author: HSZ <huangsizhe>
    @Date:   2016-04-05T14:19:46+08:00
    @Email:  hsz1273327@gmail.com
    @Last modified by:   huangsizhe
    @Last modified time: 2016-04-05T15:35:58+08:00
    @License: MIT
    -->

    <h1 id="hello">hello|world</h1>
    <script src="../../js/bin/hello.js"></script>
    ```

4 . 编辑`hello.js`

    ```Javascript
    let node = document.getElementById('hello')
    node.innerHTML="hello babel"
    ```
    
5. 运行`npm run build`

6.打开html文件,结果就可看到啦
