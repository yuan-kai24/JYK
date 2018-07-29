//css值变化,过度变化
/*
 * opacity兼容
 */
function setStyleAction(obj, attrs, vname, iTarget, nowel) {
	clearInterval(obj[vname]);
	obj[vname] = setInterval(function() {
		var cur = 0;
		//透明度问题
		if(attrs == 'opacity') {
			cur = parseFloat(getStyle(obj, attrs)) * 100;
		} else {
			cur = parseInt(getStyle(obj, attrs));
		}
		//速度问题
		var speed = (iTarget - cur) / nowel;
		//缩小误差检测
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(cur == iTarget) {
			//退出
			clearInterval(obj[vname]);
		} else {
			if(attrs == 'opacity') {
				//兼容问题
				obj.style.filter = 'alpha(opcity:' + (cur + speed) + ')';
				obj.style[attrs] = (cur + speed) / 100;
			} else {
				obj.style[attrs] = cur + speed + 'px';
			}
		}
	}, 30);

}

//获取鼠标位置
function getPosition(ev) {
	//兼容操作
	ev = ev || event;
	//需要设置滚屏，否者很容易跳出范围
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	return {
		x: ev.clientX + scrollLeft,
		y: ev.clientY + scrollTop
	};
}

//获取对象style属性值 
function getStyle(obj, attrs) {

	//兼容获取div值
	if(obj.currenStyle) {
		return obj.currenStyle[attrs];
	} else {
		return getComputedStyle(obj)[attrs];
	}

}

//鼠标拖拽
function mouseDrop(obj, statusv, minX, maxX, minY, maxY,fsUN) {
				if(!obj.disX || !obj.disY)
				{
					obj.disX = getPosition(event).x - parseInt(getStyle(gunl, "left"));
					obj.disY = getPosition(event).y - parseInt(getStyle(gunl, "top"));
				}
				obj.pdx = getPosition(event).x - obj.disX;
				obj.pdy = getPosition(event).y - obj.disY;
				if(obj.pdx < minX) {
					obj.pdx = minX;
				} else if(obj.pdx > maxX) {
					obj.pdx = maxX;
				}
				if(obj.pdy < minY) {
					obj.pdy = minY;
				} else if(obj.pdy > maxY) {
					obj.pdy = maxY;
				}

				if(statusv == 'x') {
					obj.style.left = obj.pdx + 'px';
				} else if(statusv == 'y') {
					obj.style.top = obj.pdy + 'px';
				} else if(statusv == 'all') {
					obj.style.top = obj.pdy + 'px';
					obj.style.left = obj.pdx + 'px';
				}
				fsUN();
}

//ajax创建
function Ajax(mathonv, urlv, fnSucc, fnFaild) {
	//创建对象
	var oAjax;
	if(window.XMLHttpRequest) {
		oAjax = new XMLHttpRequest();
	} else {
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	//连接服务器(异步传输模式)
	oAjax.open(mathonv, urlv + "?ajaxt=" + new Date().getTime(), true);

	//请求
	oAjax.send();

	//返回值
	oAjax.onreadystatechange = function() {
		/*
		 * 0，未初始化
		 * 1，载入
		 * 2，载入完成
		 * 3，解析
		 * 4，解析完成
		 */
		//读取完成处理
		if(oAjax.readyState == 4) {
			if(oAjax.status == 200) {
				fnSucc && fnSucc(oAjax.responseText);
			} else {
				fnFaild && fnFaild(oAjax.responseText);
			}
		}
	}
}