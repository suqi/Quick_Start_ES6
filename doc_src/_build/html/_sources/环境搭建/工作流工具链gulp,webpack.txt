
# 工作流工具链

node.js是服务于web工程的,而web工程涉及到的文件种类多,特点不一,属于管理比较复杂的,因此需要一套工具链来做自动化构建,这边只举2个工具来说

## 模块打包器webpack

webpack可以处理带有依赖关系的模块，生成一系列表示这些模块的静态资源。它不止可以处理js依赖,更加可以整合各种前端资源

webpack 本身只支持处理 JavaScript，但可以通过加载器来把别的资源转为 JavaScript。因此，每个资源都被当作一个模块。

### 安装

webpack的安装依然是靠npm,推荐项目安装,一个项目一个,不会打架,但第一个我们只是做个演示,就用全局的webpack来演示好了,

    npm install webpack -g

> 例1:一个最简单的例子

文件结构

    ex1\-index.html
       |
       |-src\
       |    |-ex1.js
       |-bin\


> 例子开始

+ 编写代码
    
    ex1.js:

            document.write("It works.")
    index.html:

           <head>
                <meta charset="utf-8">
           </head>
           <body>
                <script type="text/javascript" src="bin/bundle.js" charset="utf-8"></script>
           </body>





+ 编译绑定
```shell
webpack ./src/ex1.js ./bin/bundle.js
```

+ 打开html文件试试,如果正确可以显示 `it works`


+ 修改文件,人为的把文件拆了....

content.js:


    module.exports = "It works from content.js."

更新ex1.js:


    document.write(require("./content.js"))


+ 再编译

```shell
 webpack ./src/ex1.js ./bin/bundle.js

```

+ 打开html,正确的话可以看到

`It works from content.js.`

### 加载器

webpack的特色就是加载器了,各种资源通过加载器处理和整合,比如css,图片等

> 例2:利用加载器

+ 在之前的例子根目录下安装我们的第一个加载器

    npm install css-loader style-loader

+ 增加一个文件style.css

```css
body {
    background: yellow;
}
```

+ 更新ex1.js

```javascript
require("./style.css")
document.write(require("./content.js"))
```

+ 再编译下

```shell
webpack ./src/ex1.js ./bin/bundle.js --module-bind 'css=style!css'

```

+ 打开html文件就可以看到背景变黄的效果了

### 配置文件

既然都到这个地步了哪有还要这么长的命令才能编译的道理,webpack提供了利用配置文件默认编译的方法

一个配置文件`webpack.config.js`形如这样:

```javascript
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

```

这样例1的项目我们只要用

    `webpack`
    
命令就可以默认编译了

### 更友好的输出

如果项目变得越来越大，编译耗时将会越来越长。所以，我们希望能够展示一些进度条，同时增加颜色……

这些需求可以通过以下命令来实现

    $ webpack --progress --colors
    

### 监控模式

我们并不希望每一个变更都需要去手动编译，则可以通过以下命令来改善。

    $ webpack --progress --colors --watch
    
这样，webpack 会缓存未变更的模块而输出变更的模块。

开启 webpack 监控模式后，webpack 会给所有文件添加用于编译的文件监控。如果有任何变更，将会触发编译。当缓存开启时，webpack 会在内存中保存所有模块内容并在没变更时直接重用。

### 静态服务器

开发前端我们更加希望每次修改的效果可以直接在浏览器中显示,简单的办法就是使用`webpack-dev-server`作为静态服务器

安装:

    npm install --save-dev webpack-dev-server

配置`package.json`:

```json
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
  }
  ...
}
```

当你在命令行里运行 npm run dev 的时候他会执行 dev 属性里的值。这是这些指令的意思：

+ webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器
+ --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
+ --progress - 显示合并代码进度
+ --colors - Yay，命令行中显示颜色！
+ --content-base build - 指向设置的输出目录

总的来说，当你运行 npm run dev 的时候，会启动一个 Web 服务器，然后监听文件修改，然后自动重新合并你的代码。真的非常简洁！

当运行 webpack-dev-server 的时候，它会监听你的文件修改。当项目重新合并之后，会通知浏览器刷新。为了能够触发这样的行为，你需要把你的 index.html 放到 build/ 文件夹下，然后做这样的修改：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

### 与ES6结合

到了最关键的部分了,webpack怎么添加ES6支持呢?

> 例3:添加ES6支持

1. 安装`babel-loader`等必要模块

        npm install babel-loader babel-preset-es2015 --save-dev
    
2. `webpack.config.js`实现ES6支持

    目前有两种方式:
    + 修改文件名为`webpack.config.babel.js`,这种方式可以让babel先编译,你只要有babel-loader和babel-core这俩包就行
    + 用babel-node  
        首先它用 package.json 里定义的 scripts 来代替 webpack 命令。可以看到它完全使用了 babel-node 命令代替 node 。比如：
        
            ```javascript
            {
              "scripts": {
                "bundle": "babel-node tools/run bundle",
                ...
              }
            }
            ```
        这样就可以用 npm run bundle 来执行相应的任务了。这个命令会会先调用 tools/run.js，然后调用 tools/bundle.js，然后加载 tools/webpack.config.js 。整个流程中的所有文件都是用 ES6 和 ES7 语法写的，挺整洁漂亮。
        
     推荐第一种方式,简单直接,而且不用装babel-node,我们也用第一种方式继续
     
3. 组织文件:

        exp3\
            |-index.html
            |-webpack.config.babel.js
            |-package.json
            |=js\
            |   |-src\
            |   |    |-main.js
            |   |    |-Person.js
            |   |-bin\
                       
4. 全局代码使用babel编译

    在`webpack.config.babel.js`中为js添加加载器:
    
    ```javascript
    import path from "path"

    export default {
      entry: "./js/src/main.js",
      output: {
        path: path.join(__dirname, 'js/bin'),
        filename: "bundle.js"
      },
      module: {
        loaders: [
          {
            test: path.join(__dirname, 'js/src'),
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }

    ```
    
4. 编译

    ```shell
    $ webpack
    ```

## 自动化流式构建工具gulp

gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器,前面的例子中项目也使用了gulp用于构建项目.它的话就比较像makefile了,定义task,然后通过指令执行这些task.一般来说它具体干啥呢?

> 单独的gulp可以:

1. 定义task,定义工作流
2. 像makefile一样作为项目的总入口


> 配合插件一般可以做:

1. 编译sass(gulp-ruby-sass)
2. 压缩css(gulp-minify-css)
3. 图片压缩(gulp-imagemin)
4. 清理档案(gulp-clean)
5. 图片快取，只有更改过得图片会进行压缩(gulp-cache)
6. webpack构建
7. js代码验证(gulp-eslint)
8. js压缩(gulp-uglify)
9. html文件压缩(gulp-minify-html)
10. 文件重命名(gulp-rename)

还有很多其他的可以在[官网](http://gratimax.net/search-gulp-plugins/)找到

### 安装

依然是npm安装,依然推荐项目安装

```shell
npm install gulp --save-dev
npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-eshint gulp-concat gulp-uglify gulp-imagemin gulp-clean gulp-notify gulp-rename gulp-livereload gulp-cache gulp-minify-html gulp-util --save-dev

```

这样就可以将gulp和它的插件注册到package.json中了

### 配置文档

接着是配置文档`gulpfile.js`

> 配置文档中会用到5个预设的方法和一个管道方法:

gulp 中的五大方法：

+ gulp.task(name[, deps], fn)，注册一个 gulp 任务
    + name 为任务名
    + deps 是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数,一般deps中是按照数组顺序执行,但如果其中有相互依赖就会先执行子任务的依赖
    + fn 为任务函数，我们把任务要执行的代码都写在里面。该参数也是可选的。
+ gulp.run(...tasks)，并行运行多个 gulp 任务
+ gulp.watch(glob, fn)，实时监控内容，当 glob 内容变化时，执行 fn

    + watch方法可以监听变化,预设的变化有:
    
        + nomatch，在 glob 没有匹配到文件时触发
        + ready，在匹配后即将进行自动化任务前触发
        + error，自动化任务出错时触发
        + end，自动化任务完成时触发
    
    + watcher 对象可以调用的一些方法：
    
        + watcher.end()，中断 watcher
        + watcher.files()，返回监听的文件列表
        + watch.add(glob[, fn])，添加文件到监听的文件列表
        + watch.remove(fillpath)，从监听的文件列表中移除文件

+ gulp.src(globs[, options])
    + glob 是目标文件的路径，返回一个可读的 stream,globs参数是文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名)，当然这里也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组
        Gulp内部使用了node-glob模块来实现其文件匹配功能。我们可以使用下面这些特殊的字符来匹配我们想要的文件：
        + \* 匹配文件路径中的0个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾
        + \*\* 匹配路径中的0个或多个目录及其子目录,需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。
        + ? 匹配文件路径中的一个字符(不会匹配路径分隔符)
        + [...] 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似js正则表达式中的用法
        + !(pattern|pattern|pattern) 匹配任何与括号中给定的任一模式都不匹配的
        + ?(pattern|pattern|pattern) 匹配括号中给定的任一模式0次或1次，类似于js正则中的(pattern|pattern|pattern)?
        + \+(pattern|pattern|pattern) 匹配括号中给定的任一模式至少1次，类似于js正则中的(pattern|pattern|pattern)\+
        + \*(pattern|pattern|pattern) 匹配括号中给定的任一模式0次或多次，类似于js正则中的(pattern|pattern|pattern)\*
        + @(pattern|pattern|pattern) 匹配括号中给定的任一模式1次，类似于js正则中的(pattern|pattern|pattern)
        
        当有多种匹配模式时可以使用数组:
        ```
        gulp.src(['js/*.js','css/*.css','*.html'])
        ```
        
        使用数组的方式还有一个好处就是可以很方便的使用排除模式，在数组中的单个匹配模式前加上!即是排除模式，它会在匹配的结果中排除这个匹配，要注意一点的是不能在数组中的第一个元素中使用排除模式:
        ```
        gulp.src([*.js,'!b*.js']) //匹配所有js文件，但排除掉以b开头的js文件
        gulp.src(['!b*.js',*.js]) //不会排除任何文件，因为排除模式不能出现在数组的第一个元素中
        ```
        
        此外，还可以使用展开模式。展开模式以花括号作为定界符，根据它里面的内容，会展开为多个模式，最后匹配的结果为所有展开的模式相加起来得到的结果。展开的例子如下：

        + a{b,c}d 会展开为 abd,acd
        + a{b,}c 会展开为 abc,ac
        + a{0..3}d 会展开为 a0d,a1d,a2d,a3d
        + a{b,c{d,e}f}g 会展开为 abg,acdfg,acefg
        + a{b,c}d{e,f}g 会展开为 abdeg,acdeg,abdeg,abdfg


+ gulp.dest(globs[,options])，path是输出路径，返回一个可写的 stream,options为一个可选的参数对象，通常我们不需要用到

gulp 中的管道方法：

+ pipe(), 通过管道连接操作


> 它大约形如:

```javascript
//引入各种插件
var gulp = require('gulp'),  
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    jshint = require("gulp-jshint")
    
//定义task,参数为task名字,执行的步骤

//webpack整理
gulp.task("webpack", (callback) => {
    // run webpack
    webpack({
        // configuration
        entry: "./js/src/main.js",
        output: {
          path: path.join(__dirname, 'js/bin'),
          filename: "bundle.js"
        },
        module: {
          loaders: [
            {
              test: path.join(__dirname, 'js/src'),
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            }
          ]
        }
    }, (err, stats) => {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }))
        callback()
    })
})

//js代码检查
gulp.task('lint', function () {
    return gulp.src('js/src/*.js')
    .pipe(eslint())
    .pipe(eslint.format()) 
    .pipe(eslint.failAfterError())
})

//js压缩
gulp.task('jsmini', function () {
    return gulp.src('./js/bin/bundle.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js/bin'))
    .pipe(notify({ message: 'jsmini task complete' }))
})

//处理js文件
gulp.task('jsdeal',['jsmini', "webpack"], function() {
    console.log('start dealing with js Script!')
})

//预设任务    
gulp.task('default', ['clean'], function() {  
    gulp.start('jsdeal')
})

// 清理
gulp.task('clean', function() {  
  return gulp.src('./js/bin', {read: false})
    .pipe(clean())
})
```

### ES6支持

和webpack类似,gulp的配置文件也可以通过中缀添加babel字样让它支持ES6语法,而eslint需要把配置写好,同时需要使用gulp-util包.

上面的配置可以改为:

```javascript
'use strict'
import gulp from 'gulp'
import uglify from 'gulp-uglify'
import clean from 'gulp-clean'
import eslint from "gulp-eslint"
import minifyHtml from "gulp-minify-html"
import notify from 'gulp-notify'
//重命名插件
import rename from "gulp-rename"
import path from "path"
//定义task,参数为task名字,执行的步骤
//html压缩
import wpconfig from './wpconfig'
import webpack from 'webpack'
import gutil from 'gulp-util'
gulp.task('htmlmini', () => {
    return gulp.src('index.html')
    .pipe(rename('index.mini.html'))
    .pipe(minifyHtml()) //压缩
    .pipe(gulp.dest('./html'))
    .pipe(notify({ message: 'htmlmini task complete' }))
})

//webpack整理
gulp.task("webpack", (callback) => {

    var myconfig = Object.create(wpconfig)
    // run webpack
    webpack(
        myconfig
        , (err, stats) => {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }))
        callback()
    })
})

//js代码检查
gulp.task('lint', () => {
    return gulp.src('js/src/*.js')
    .pipe(eslint({
        "parser": "babel-eslint",
        "rules": {
          "strict": 0
        }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

//js压缩
gulp.task('jsmini', () => {
    return gulp.src('./js/bin/bundle.js')
    .pipe(rename('bundle.mini.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/bin'))
    .pipe(notify({ message: 'jsmini task complete' }))
})

//处理js文件
gulp.task('jsdeal', () => {
    console.log('start dealing with js Script!')
    gulp.start('jsmini', "webpack")
})

//预设任务
gulp.task('default', () => {
    gulp.start('jsdeal','htmlmini')
})

// 清理
gulp.task('clean', function() {
  return gulp.src('./js/bin', {read: false})
    .pipe(clean())
})

```

# 将node命令,gulp,webpack结合使用

如果gulp和webpack结合使用,可以不用写webpack的配置文件,而把配置写在gulp的配置文件中,之后再package.json中把那些要运行的写在script中

> 例4:将上面的例子使用webpack做打包,gulp做压缩,并且使用node命令执行,加上前一个部分的内容,包括测试,文档和覆盖率

+ 切换到项目根目录,npm 安装各种插件

```shell
npm install babel-core babel-cli babel-preset-es2015 babel-polyfill babel-register --save-dev
npm install esdoc eslint@2.x babel-eslint@6 chai mocha mochawesome isparta --save-dev
npm install gulp gulp-eslint gulp-uglify gulp-clean gulp-notify gulp-rename gulp-minify-html gulp-util --save-dev
npm install webpack babel-loader --save-dev
```

+ 写`wpconfig.js`

```javascript
import path from "path"

export default {
  entry: "./js/src/main.js",
  output: {
    path: path.join(__dirname, 'js/bin'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'js/src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
```

+ 写gulp配置文档`gulp.babel.js`

```javascript
'use strict'
import gulp from 'gulp'
import uglify from 'gulp-uglify'
import clean from 'gulp-clean'
import eslint from "gulp-eslint"
import minifyHtml from "gulp-minify-html"
import notify from 'gulp-notify'
//重命名插件
import rename from "gulp-rename"
import path from "path"
//定义task,参数为task名字,执行的步骤
//html压缩
import wpconfig from './wpconfig'
import webpack from 'webpack'
import gutil from 'gulp-util'
gulp.task('htmlmini', () => {
    return gulp.src('index.html')
    .pipe(rename('index.mini.html'))
    .pipe(minifyHtml()) //压缩
    .pipe(gulp.dest('./html'))
    .pipe(notify({ message: 'htmlmini task complete' }))
})

//webpack整理
gulp.task("webpack", (callback) => {

    var myconfig = Object.create(wpconfig)
    // run webpack
    webpack(
        myconfig
        , (err, stats) => {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }))
        callback()
    })
})

//js代码检查
gulp.task('lint', () => {
    return gulp.src('js/src/*.js')
    .pipe(eslint({
        "parser": "babel-eslint",
        "rules": {
          "strict": 0
        }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

//js压缩
gulp.task('jsmini', () => {
    return gulp.src('./js/bin/bundle.js')
    .pipe(rename('bundle.mini.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/bin'))
    .pipe(notify({ message: 'jsmini task complete' }))
})

//处理js文件
gulp.task('jsdeal', () => {
    console.log('start dealing with js Script!')
    gulp.start('jsmini', "webpack")
})

//预设任务
gulp.task('default', () => {
    gulp.start('jsdeal','htmlmini')
})

// 清理
gulp.task('clean', function() {
  return gulp.src('./js/bin', {read: false})
    .pipe(clean())
})
```

+ 写`esdoc.json`

```javascript
{
  "source": "./js/src",
  "destination": "./esdoc",
  "coverage": true
}
```

+ 写`mocha.opts`

```javascript
--recursive
--compilers js:babel-core/register
--reporter mochawesome
```

+ 为项目文件夹增加权限

    sudo chmod -R 777 ex3

+ 写`package.json`

```javascript
{
  "name": "ex3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "docs": "esdoc -c esdoc.json",
    "start": "gulp",
    "lint": "gulp lint",
    "test":"./node_modules/.bin/babel-node ./node_modules/.bin/isparta cover --report text/html ./node_modules/.bin/_mocha "
  },
  "author": "hsz",
  "license": "ISC",
  "devDependencies": {
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
+ 试试效果

```shell
npm run lint
npm run test
npm run docs
sudo npm run start
```
