
# 谓词

这个貌似没在啥书上看到,只是我自己的总结,我把所有与bool值有关的表达式称做谓词,这种表达式一般也就用在控制结构中,大体分为:

表达式|说明
---|---
x >/</===/>=/<= y|值判断表达式,返回bool值
x in container |包含判断,如果in之前的 值包含在in后面的容器中,则返回true,否则为false
exp? trueif:falseif | 三元判断表达式,返回值根据?之前的表达式结果来定,如果为真返回:前的,否则返回:后的

逻辑表达式是控制语句的基础

# 控制结构

一般来说控制语句就是条件判断,循环,分支和try语句了


## 判断
JavaScript使用形如:

```javascript
if () { 
    ... 
} else if () {
    ... 
} else{
    ...
}
```    
这样的条件分支来实现判断语句

练习: 计算一个年份是否是闰年(能被4或者400整除,但被100整除不算)


```javascript
function Leap(year) {
    if (year%100 !== 0 && year%4 ===0 ){
       return true
    } else if(year%400 === 0){
        return true
    } else {
        return false
    }
}
```




    'use strict'




```javascript
Leap(2421)
```




    false



## 循环

### for循环

for循环形如:

```javascript
for (临时变量; 判断条件;改变临时变量) {
    ...
}
```

#### for ... of 循环

这个是for循环最常用最好用的方法了,在之前的数据结构部分已经有相对详细的讲解了

形如:

```javascript
for (temp of 容器){
    ...
}
```
**注意**:js中也有for in循环,然而并不好用,所以我就不写了....

### while循环

for循环在已知循环的初始和结束条件时非常有用。而while循环只有一个判断条件，条件满足，就不断循环，条件不满足时则退出循环。
while循环形如:

```javascript
    while (exp) {
        ...
    }
```    
#### do ... while循环

do ... while循环和while类似,只是它是先执行再判断.

do ... while形如:

```javascript
    do {
        ...
    } while (exp)
    
```

### break和continu
和c类似,break和continu还是一样的语义,分别代表跳出循环和跳过当次循环

## 分支switch

switch语句依然沿用c风格,形如:

```Javascript
switch (exp){
    case value: 
        block
        break
    case value: 
        block
        break
    default:
        block
}
```

千万不要忘了break!

## try

try语句一般用于错误处理,标准格式是

```javascript
try
  {
  //在这里运行代码
  }
catch(err)
  {
  //在这里处理错误
  }
```

+ try 语句测试代码块的错误。
+ catch 语句处理错误。

### throw语句

throw 语句用于抛出自定义异常。



```javascript
throw new Error('cuowu')
```


    Error: cuowu

        at evalmachine.<anonymous>:3:7

        at Object.exports.runInThisContext (vm.js:54:17)

        at run ([eval]:192:19)

        at onMessage ([eval]:63:41)

        at emitTwo (events.js:87:13)

        at process.emit (events.js:172:7)

        at handleMessage (internal/child_process.js:686:10)

        at Pipe.channel.onread (internal/child_process.js:440:11)


Error具有下面一些主要属性：

+ message: 错误信息  
+ name: 错误类型.  

因此我们可以在catch语句段中使用它们

事实上throw可以抛出任意对象

目前我们可能得到的系统异常主要包含以下6种:
+ EvalError: raised when an error occurs executing code in eval()  
+ RangeError: raised when a numeric variable or parameter is outside of its valid range  
+ ReferenceError: raised when de-referencing an invalid reference  
+ SyntaxError: raised when a syntax error occurs while parsing code in eval()  
+ TypeError: raised when a variable or parameter is not a valid type  
+ URIError: raised when encodeURI() or decodeURI() are passed invalid parameters  


```javascript
try{
    throw new Date()
} catch(d){
    console.log(d.toLocaleString())
}
```

    2016-04-11 12:53:41





    undefined



# Function

函数是对象,因此它也有属性和方法

属性|说明
---|---
this|指使用时所在的对象(注意)
arguments|函数的参数存放处,一个类数组对象
length|希望接收参数的个数
prototype|保存实例方法的对象
name|函数的名字


方法|说明
---|---
toString()|返回字面量
valueOf()|返回functin的值




```javascript
function a(x,y){
    
    return x+y
    
}
```




    'use strict'




```javascript
()=>{return 1}.name
```




    ''





像python中一样,fucntion是对象,定义一个function可以有4种方式:

+ 使用`function`关键字

    这种方式类似python中的define


```javascript
function a(...args){
    return true
}
```




    'use strict'



最标准的fucntion写法,没啥花头~

+ 通过new关键字开辟一个新的Function对象

```javascript
var func =new Function("param1","param2",..."function body")
```


```javascript
let a = new Function("x","y","var a = 10 ;return a+x+y")
```




    'use strict'




```javascript
a(1,2)
```




    13



这个就有花头了,function既然是一个对象,那当然可以用new关键字构建了,但不建议这样写,因为你也看到了,代码段成了字符串不好维护,而且显而易见的一定会有二次解析影响性能

+ 匿名函数

function不定义函数名就是匿名函数了


```javascript
let n = function(x,y){
    return x+y
}
```




    'use strict'




```javascript
n(1,2)
```




    3



+ 箭头函数

```javascript
let s = (x,y)=>{
    return x+y
}
```


```javascript
let s = (x,y)=>{
    return x+y
}
```




    'use strict'




```javascript
s(1,2)
```




    3



这是ES6中新增的方式,主要好处在于简化函数的使用,不过需要注意的是:

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作Generator函数。

上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

## 函数的参数

### arguments

定义function后,Js实际上会默认将所有参数传入一个内部变量`arguments`,它类似一个`array`,因此即便你定义的参数数目和实际使用给的参数数目不同也没关系,用`arguments`就可以了,有点类似python中的`*args`.


```javascript
function sum() {
    var args = Array.prototype.slice.apply(arguments)
    var sum = args.reduce(function(x,y){
        return x+y
    }) 
    return sum
}
```




    'use strict'




```javascript
sum(1,2,3)
```




    6



使用arguments也可以实现参数默认值的设定


```javascript
function defaultArgs(){
    var a = arguments[0] ? arguments[0] : 1//设置参数a的默认值为1
    var b = arguments[1] ? arguments[1] : 9//设置参数b的默认值为9
    return [a,b,Array.prototype.slice.apply(arguments)]
}
```




    'use strict'




```javascript
defaultArgs(1,2,3)
```




    [ 1, 2, [ 1, 2, 3 ] ]



### 变长参数

我们可以使用扩展运算符来实现边长参数的使用,这个就真的有点像python中的`*args`了



```javascript
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}
```




    'use strict'




```javascript
foo(1,2,3,3,4,5)
```

    a = 1
    b = 2
    [ 3, 3, 4, 5 ]





    undefined



### 默认参数


```javascript
function bar(a = 1,b = 2){
    return a+b
}
```




    'use strict'




```javascript
bar()
```




    3



### 闭包 

js支持高阶函数,当然也就支持闭包了

所谓闭包就是返回值是一个函数

> 例 一个自加器


```javascript
let counter = () => {
    let flag = 0
    let count = () =>{
        flag += 1
        return flag
    }
    return count
}
```




    'use strict'




```javascript
let c1 = counter()
console.log(c1())
console.log(c1())
console.log(c1())
console.log(c1())
```

    1
    2
    3
    4





    undefined


