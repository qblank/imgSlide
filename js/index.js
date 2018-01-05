/**
 * Created by Administrator on 2017/9/11.
 */
window.onload =function(){
    //先获取数据
    var wrap = document.getElementById("slide");
    var liArr = document.getElementsByTagName("li");
    var arrow = document.getElementById("arrow");
    var arrowChild = arrow.children;
    //用于判断事件是否走完没走完点击无效  true表示走完，false表示没走完
    var flag = true;

    //将数据存入数组中
    var json = [
        {   //  1
            width:400,
            top:70,
            left:50,
            opacity:20,
            z:2
        },
        {  // 2
            width:600,
            top:120,
            left:0,
            opacity:80,
            z:3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:100,
            z:4
        },
        {  // 4
            width:600,
            top:120,
            left:600,
            opacity:80,
            z:3
        },
        {   //5
            width:400,
            top:70,
            left:750,
            opacity:20,
            z:2
        }
    ];
    //鼠标移入，缓慢显示
    wrap.onmouseenter = function(){
        animate(arrow,{"opacity":100});
    }
    //鼠标移出，缓慢隐藏
    wrap.onmouseleave = function(){
        animate(arrow,{"opacity":0});
    }
    //加载数据
    move();
    //给两侧的按钮绑定事件
    for(var k in arrowChild){
        arrowChild[k].onclick = function(){
            if (this.className == "prev"){
                if (flag) {
                    //alert("左边");
                    flag = false;
                    //左侧  true就左侧运动
                    move(true);
                }
            }else{
                if(flag) {
                    //alert("右边");
                    flag = false;
                    //右侧  false就右侧运动
                    move(false);
                }
            }
        }
    }

    //移动的方法
    function move(bool){
        //当不带参数时，表示第一次加载数据
        if (bool !== undefined) {
            if (bool) {
                // (操作数组。向右旋转：删除数组中最后一个元素，添加到数组中的第一位)
                json.unshift(json.pop());
            } else {
                // (操作数组。向左旋转：删除数组中第一个元素，添加到数组中的最后一位)
                json.push(json.shift());
            }
        }
        //加载数据
        for(var i = 0;i<liArr.length;i++){
            animate(liArr[i],{
                "width":json[i].width,
                "top":json[i].top,
                "left":json[i].left,
                "opacity":json[i].opacity,
                "zIndex":json[i].z
            },function(){
                //表示所有动画执行完毕  让其继续操作
                flag = true;
            });
        }
    }
}