/**
 * canvas api
 *
 * stroke();//绘制
 * fill();//填充
 *
 * 
 * **线条api
 * moveTo(x,y);
 * lineTo(x,y);
 *
 * **封闭api
 * beginPath();
 * closePath();
 *
 * **弧api(弧api+封闭api=圆)
 * arc(x,y,r,startDeg,endDeg,antiClockWise);
 *
 * **矩形api
 *  只描边
 *ctx.strokeRect(左上角 x 坐标, 左上角 y 坐标, 宽度, 高度);
 * 只填充
 *ctx.fillRect(左上角 x 坐标, 左上角 y 坐标, 宽度, 高度);
 *清除矩形像素
 *ctx.clearRect(左上角 x 坐标, 左上角 y 坐标, 宽度, 高度);
 * 
 *
 * **文字api
 *
 * ctx.font = '30px Verdana';
 * ctx.strokeText("Hello Coding!", 23, 33);
 * ctx.fillText("Hello Coding!", 23, 66);
 *
 * **图片api
 *指定绘制位置
 *ctx.drawImage(image, x, y);
 *指定绘制位置和图像宽高
 *ctx.drawImage(image, x, y, width, height);
 *指定剪裁区域、绘制位置和图像宽高
 *ctx.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
 *image:   要使用的 Image、Canvas 或 Video
 *sx:      可选，开始剪切的 x 坐标
 *sy:      可选，开始剪切的 y 坐标
 *swidth:  可选，被剪切图像的宽度
 *sheight: 可选，被剪切图像的高度
 *x:       在画布上放置图像的 x 坐标
 *y:       在画布上放置图像的 y 坐标
 *width:   可选，要使用的图像的宽度
 *height:  可选，要使用的图像的高度
 *
 *
 *
 * **画布设置api
 *
 * ctx.lineWidth='34';
 * 
 * ctx.translate(往右移动的量, 往下移动的量);//移动画布(移动坐标系)
 * ctx.rotate(顺时针旋转的角度);//旋转画布，旋转中心为坐标系原点
 * ctx.scale(横向放大倍数, 纵向放大倍数);//以坐标系原点为中心缩放画布
 * 
 * ctx.globalAlpha(零到一的小数);//设置绘制透明度，如果 fillStyle 等属性设置了透明度则会叠加
 * 
 * ctx.globalCompositeOperation = 'lighter';//设置全局组合操作
 * 
 * ctx.save();//保存当前设置
 * ctx.restore();//恢复上次保存的设置
 *
 *
 * **其他
 * getImageData()
 * putImageData()
 * toDataUrl()
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * 
 *
 * 
 */
!function() {
    //封装方法，压缩之后减少文件大小
    function get_attribute(node, attr, default_value) {
        return node.getAttribute(attr) || default_value;
    }
    //封装方法，压缩之后减少文件大小
    function get_by_tagname(name) {
        return document.getElementsByTagName(name);
    }
    //获取配置参数
    function get_config_option() {
        var scripts = get_by_tagname("script"),
            script_len = scripts.length,
            script = scripts[script_len - 1]; //当前加载的script
        return {
            l: script_len, //长度，用于生成id用
            z: get_attribute(script, "zIndex", -1), //z-index
            o: get_attribute(script, "opacity", 0.5), //opacity
            c: get_attribute(script, "color", "0,0,0"), //color
            n: get_attribute(script, "count", 99) //count
        };
    }
    //设置canvas的高宽
    function set_canvas_size() {
        canvasandpen.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 
        canvasandpen.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    //绘制线条
    function drawLine() {
        canvasandpen.pen.clearRect(0, 0, canvasandpen.canvas.width, canvasandpen.canvas.height);
        //随机的线条和当前位置联合数组
        var e, i, d, x_dist, y_dist, dist; //临时节点
        //遍历处理每一个点
        random_lines.forEach(function(r, idx) {
            r.x += r.xa, 
            r.y += r.ya, //移动
            r.xa *= r.x > canvasandpen.canvas.width || r.x < 0 ? -1 : 1, 
            r.ya *= r.y > canvasandpen.canvas.height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
            canvasandpen.pen.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
            //从下一个点开始
            for (i = idx + 1; i < all_array.length; i++) {
                e = all_array[i];
                //不是当前点
                if (null !== e.x && null !== e.y) {
                        x_dist = r.x - e.x, //x轴距离 l
                        y_dist = r.y - e.y, //y轴距离 n
                        dist = x_dist * x_dist + y_dist * y_dist; //总距离, m
                    dist < e.max && (e === mouse_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                        d = (e.max - dist) / e.max, 
                        canvasandpen.pen.beginPath(),
                        canvasandpen.pen.lineWidth = d / 2, 
                        //canvasandpen.pen.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")", 
                        canvasandpen.pen.strokeStyle = fills,
                        canvasandpen.pen.moveTo(r.x, r.y), 
                        canvasandpen.pen.lineTo(e.x, e.y), 
                        canvasandpen.pen.stroke());
                }
            }
        }), requestAnimationFrame(drawLine);
    }
    //绘制三角
    function drawTriangle() {
        canvasandpen.pen.clearRect(0, 0, canvasandpen.canvas.width, canvasandpen.canvas.height);
        //随机的线条和当前位置联合数组
        var e, ee, i, d, x_dist, y_dist, dist; //临时节点
        //遍历处理每一个点
        random_lines.forEach(function(r, idx) {
            r.x += r.xa, 
            r.y += r.ya, //移动
            r.xa *= r.x > canvasandpen.canvas.width || r.x < 0 ? -1 : 1, 
            r.ya *= r.y > canvasandpen.canvas.height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
            canvasandpen.pen.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点

            //从下一个点开始
            for (i = idx + 1; i < all_array.length-1; i++) {
                e = all_array[i];
                ee = all_array[i+1];
                //不是当前点
                if (null !== e.x && null !== e.y && null !== ee.x && null !== ee.y) {
                        x_dist = r.x - e.x, //x轴距离 l
                        y_dist = r.y - e.y, //y轴距离 n
                        dist = x_dist * x_dist + y_dist * y_dist; //总距离, m
                    dist < e.max && (e === mouse_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                        d = (e.max - dist) / e.max, 
                        canvasandpen.pen.beginPath(), 
                        canvasandpen.pen.lineWidth = d / 2, 
                        canvasandpen.pen.fillStyle = fills,
                        canvasandpen.pen.moveTo(r.x, r.y), 
                        canvasandpen.pen.lineTo(e.x, e.y), 
                        canvasandpen.pen.lineTo(ee.x, ee.y),   
                        canvasandpen.pen.closePath(),
                        canvasandpen.pen.fill());
                }
            }
        }), requestAnimationFrame(drawTriangle);
    }
 
    /**
     * 初始化，取得canvas元素和画笔pen
     */
    //var canvasOption={id:'666',width:'550px',height:'550px',style:'',pEle:'body',dimension:''};;
    var canvasandpen=init();

    var config = get_config_option(), //粒子配置
	mouse_point = {
        x: null, //当前鼠标x
        y: null, //当前鼠标y
        max: 20000
    },
    all_array;
    set_canvas_size(), window.onresize = set_canvas_size;

    //当时鼠标位置存储，离开的时候，释放当前位置信息
    window.onmousemove = function(e) {
        e = e || window.event, mouse_point.x = e.clientX, mouse_point.y = e.clientY;
    }, 
    window.onmouseout = function() {
        mouse_point.x = null, mouse_point.y = null;
    };
    //随机生成config.n条线位置信息
    for (var random_lines = [], i = 0; config.n > i; i++) {
        var x = Math.random() * canvasandpen.canvas.width, //随机位置
            y = Math.random() * canvasandpen.canvas.height,
            xa = 2 * Math.random() - 1, //随机运动方向
            ya = 2 * Math.random() - 1;
        random_lines.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya,
            max: 6000 //沾附距离
        });
    }
    all_array = random_lines.concat([mouse_point]);
    /**
     * 填充色api
     */
    //纯色填充 
    var fillcolor='rgba('+Math.floor(Math.random()*255)+','
                    +Math.floor(Math.random()*255)+','
                    +Math.floor(Math.random()*255)+','
                    +Math.random()+')';
    //渐变填充 
    var gradient = canvasandpen.pen.createLinearGradient(0, 0, 170, 0);// 设置渐变的尺寸（参数分别为起始点的 x 和 y、终止点的 x 和 y）
    //createRadialGradient径向渐变
    gradient.addColorStop(0, 'magenta');// 设置过渡色，第一个参数是渐变的位置，第二个参数是颜色
    gradient.addColorStop(0.5, 'blue');
    gradient.addColorStop(1.0, 'green');

    fillgradient = gradient;

    /* 图片填充 */
    var image = new Image;// 创建图片
    image.src = 'https://www.baidu.com/img/baidu_jgylogo3.gif';
    
    var pattern = canvasandpen.pen.createPattern(image, 'repeat-x');// 创建图片笔触，可以指定图片的平铺方式，这里是横向平铺

    fillpattern = pattern;

    var fills=fillcolor;
    //var fills=fillgradient;
    //var fills=fillpattern;

    //0.1秒后绘制
    setTimeout(function() {
        drawLine();
        //drawTriangle();
    }, 100);


}();
