
# RegExp 对象

正则表达式,python中也有这个概念,只是它是字符串的一种,而且要用标准库re处理而已

正则表达式的语法就不多讲了,这边只说如何创建和与python的不同之处

## 创建 RegExp 对象的语法：

```javascript
var re = new RegExp(pattern, attributes)
```

或者:

```javascript
var re = / pattern /
```

这两种都可以,第二种写起来简单些



## 字符串的正则方法

+ match()
+ replace()
+ search()
+ split()

## unicode支持

ES6对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于\uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。



```javascript
/^\uD83D/.test('\uD83D\uDC2A')
```




    true



+ 点字符

    点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。
    
+ ES6新增了使用大括号表示Unicode字符

    这种表示法在正则表达式中必须加上u修饰符，才能识别。
    
+ 量词

    使用u修饰符后，所有量词都会正确识别大于码点大于0xFFFF的Unicode字符。


```javascript
/𠮷{2}/u.test('𠮷𠮷')
```




    true



+ 预定义模式

u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的Unicode字符。


```javascript
/^\S$/u.test('𠮷')
```




    true



+ i修饰符

    有些Unicode字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。



```javascript
/[a-z]/iu.test('\u212A')
```




    true



# Date

Date 对象用于处理日期和时间。


创建 Date 对象的语法：


```javascript
var myDate=new Date()
```




    'use strict'



Date对象方法:

方法	|描述
---|---
Date()	|返回当日的日期和时间。
getDate()|	从 Date 对象返回一个月中的某一天 (1 ~ 31)。
getDay()	|从 Date 对象返回一周中的某一天 (0 ~ 6)。
getMonth()	|从 Date 对象返回月份 (0 ~ 11)。
getFullYear()	|从 Date 对象以四位数字返回年份。
getYear()	|请使用 getFullYear() 方法代替。
getHours()	|返回 Date 对象的小时 (0 ~ 23)。
getMinutes()	|返回 Date 对象的分钟 (0 ~ 59)。
getSeconds()	|返回 Date 对象的秒数 (0 ~ 59)。
getMilliseconds()	|返回 Date 对象的毫秒(0 ~ 999)。
getTime()	|返回 1970 年 1 月 1 日至今的毫秒数。
getTimezoneOffset()	|返回本地时间与格林威治标准时间 (GMT) 的分钟差。
getUTCDate()	|根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。
getUTCDay()|	根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。
getUTCMonth()	|根据世界时从 Date 对象返回月份 (0 ~ 11)。
getUTCFullYear()	|根据世界时从 Date 对象返回四位数的年份。
getUTCHours()	|根据世界时返回 Date 对象的小时 (0 ~ 23)。
getUTCMinutes()	|根据世界时返回 Date 对象的分钟 (0 ~ 59)。
getUTCSeconds()|	根据世界时返回 Date 对象的秒钟 (0 ~ 59)。
getUTCMilliseconds()	|根据世界时返回 Date 对象的毫秒(0 ~ 999)。
parse()	|返回1970年1月1日午夜到指定日期（字符串）的毫秒数。
setDate()	|设置 Date 对象中月的某一天 (1 ~ 31)。
setMonth()|	设置 Date 对象中月份 (0 ~ 11)。
setFullYear()	|设置 Date 对象中的年份（四位数字）。
setYear()	|请使用 setFullYear() 方法代替。
setHours()	|设置 Date 对象中的小时 (0 ~ 23)。
setMinutes()	|设置 Date 对象中的分钟 (0 ~ 59)。
setSeconds()	|设置 Date 对象中的秒钟 (0 ~ 59)。
setMilliseconds()	|设置 Date 对象中的毫秒 (0 ~ 999)。
setTime()	|以毫秒设置 Date 对象。
setUTCDate()	|根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
setUTCMonth()	|根据世界时设置 Date 对象中的月份 (0 ~ 11)。
setUTCFullYear()	|根据世界时设置 Date 对象中的年份（四位数字）。
setUTCHours()|	根据世界时设置 Date 对象中的小时 (0 ~ 23)。
setUTCMinutes()	|根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
setUTCSeconds()	|根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。
setUTCMilliseconds()	|根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
toSource()	|返回该对象的源代码。
toString()|	把 Date 对象转换为字符串。
toTimeString()	|把 Date 对象的时间部分转换为字符串。
toDateString()	|把 Date 对象的日期部分转换为字符串。
toGMTString()	|请使用 toUTCString() 方法代替。
toUTCString()|	根据世界时，把 Date 对象转换为字符串。
toLocaleString()	|根据本地时间格式，把 Date 对象转换为字符串。
toLocaleTimeString()|	根据本地时间格式，把 Date 对象的时间部分转换为字符串。
toLocaleDateString()	|根据本地时间格式，把 Date 对象的日期部分转换为字符串。
UTC()	|根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。
valueOf()	|返回 Date 对象的原始值。


# 定时操作

+ setTimeout(func,time) 方法是定时程序，也就是在什么时间以后干什么。干完了就拉倒。


```javascript
setTimeout(()=>{
    console.log("延迟")
},20) 
```




    { _called: false,
      _idleTimeout: 20,
      _idlePrev: 
       Timer {
         '0': [Function: listOnTimeout],
         _idleNext: [Circular],
         _idlePrev: [Circular],
         msecs: 20 },
      _idleNext: 
       Timer {
         '0': [Function: listOnTimeout],
         _idleNext: [Circular],
         _idlePrev: [Circular],
         msecs: 20 },
      _idleStart: 300295,
      _onTimeout: [Function],
      _repeat: null }



    延迟

