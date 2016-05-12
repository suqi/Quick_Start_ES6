"use strict"
exports.area = (r)=>{
    return Math.PI*Math.pow(r,2)
}
exports.circumference = (r) => {
    return 2 * Math.PI * r
}

exports.createpoint =  function(x,y){
    let point = function(x,y){
        this.x = x
        this.y = y
        this.add = function(that){
            let x = this.x+that.x
            let y = this.y+that.y
            return new point(x,y)
        }
    }
    //protopye中定义类方法和重载一些方法
    point.prototype.toString=function(){
        return '(' + this.x + ', ' + this.y + ')'
    }
    return new point(x,y)
}
