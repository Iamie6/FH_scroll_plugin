var FH_scroll_bar = function(id,options){
	this.options = options || {};
	//if(isEmpty(this.options))return;

	//获取 容器
	this.ele = getEle(id);
	if(!this.ele)return;

	//获取 子容器
	this.eleChild=this.ele.getElementsByTagName("div")[0];
	if(!this.eleChild)return;

	//bar 的宽度
	var w = options.width || 10;
	w = parseInt(w);

	//检测定位 并 设置
	addPosition(this.ele, false);
	addPosition(this.eleChild, true);

	//获取 容器高度 和 内容高度
	var parentH = this.ele.offsetHeight;
	var childH = this.eleChild.offsetHeight;

	//设置 内容 padding-right
	var childPadding = parseInt(getStyle(this.eleChild, "paddingRight"));
	this.eleChild.style.paddingRight = (childPadding + w) + "px";
	
	
	console.log(childH);
	console.log(parentH);

	//FH_scroll_bar
	var FH = this;


	//创建 滚动条 容器
	function createBarBox(){
		var barBox = document.getElementById("FHSrollBarBoxLY");
		if(barBox){
			return barBox;
		};
		barBox = document.createElement("div");
		
		barBox.id = "FHSrollBarBoxLY";
		barBox.style.width = w + "px";
		barBox.style.height = parentH + "px";
		barBox.style.borderLeft = "1px solid #ccc";
		barBox.style.position = "absolute"
		barBox.style.top = "0";
		barBox.style.right = "0";
		barBox.style.padding = "0";

		FH.ele.appendChild(barBox);
		return barBox;
	}

	//创建 滚动条
	function createBar(){
		var bar = document.getElementById("FHSrollBarLY");
		if(bar){
			return bar;
		};
		var barBox = createBarBox();
		bar = document.createElement("div");

		bar.id = "FHSrollBarLY"
		bar.style.background = "#ccc";
		bar.style.borderTop = "1px solid #999";
		bar.style.borderBottom = "1px solid #999";
		bar.style.width = w + "px";
		bar.style.position = "absolute";
		bar.style.top = w + "px";
		bar.style.height = parseInt((parentH/childH)*(parentH - w*2)) + "px";

		barBox.appendChild(bar);

		return bar;
	}

	//创建 滚动条 上下 点击按钮
	function createSrollBtn(){
		var bar = createBar();
		var upBtn = document.createElement("");
	}

	//判断json 是否为空
	function isEmpty(json){
		for (var name in json){
			return false;
		}
		return true;
	}

	//深度克隆
	/*function clone(obj){  
		if(typeof obj!='object'){
			return obj;	
		}
		if(obj instanceof Array){
			var arr=[];
			for(var i=0; i<obj.length; i++){
				arr[i]=clone(obj[i]);
			}
			return arr;
		}else if(obj.constructor==Object){
			var json={};
			for(var name in obj){
				json[name]=clone(obj[name]);
			}
			return json;
		}else{
			return new obj.constructor(obj.valueOf());
		}
	}*/


	//判断传入id是否正确
	function getId(id){
		if(typeof id === 'string'){
			if(id.length==0){
				console.log("id 不能为空")
				return;
			}
			if(/^#/.test(id)){
				if (id.length==1) {
					console.log("id 不合法")
					return;
				}
				return id.substring(1);
			}else {
				return id;
			}
		}else {
			console.log("传入的 id 不合法")
			return false;
		}
	}

	//获取 最外层 盒子 id 元素
	function getEle(id){
		var ID = id;
		id = getId(id);
		var ele = document.getElementById(id);
		if(ele){
			return ele;
		}else {
			console.log("id 元素未获取到")
			return false;
		}
	}

	//获取元素属性
	function getStyle(obj,name){
		return (obj.currentStyle || getComputedStyle(obj,false))[name];
	}

	//给元素 添加 定位
	function addPosition(obj, absolute){
		var position = getStyle(obj, "position");

		if(absolute){
			if (position != "absolute") {
				obj.style.position="absolute";
			}
		}else{
			if(position != "relative" || position != "absolute"){
				obj.style.position="relative";
			}
		}
	}
};












window.onload = function(){
	new FH_scroll_bar("#scroll_main",{
		width:20	
	})
};