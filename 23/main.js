function addEventHandler(element, event, handler) {
	if(element.addEventListener) {
		//兼容IE以外的所有浏览器
		element.addEventListener(event, handler, false);
	}
	else if(element.attachEvent) {
		//ie
		element.attachEvent('on'+event, handler);
	}
	else {
		//只能对一个元素的一个事件绑定一个事件处理程序
		element['on'+event] = handler;
	}
}
function orderTree() {
	var root = document.getElementById('binaryTree');
	var dTraverse = document.getElementById('dTraverse');
	var bTraverse = document.getElementById('bTraverse');
	var DFS = document.getElementById('DFS');
	var BFS = document.getElementById('BFS');
	var text = document.getElementsByName('search');
	addEventHandler(dTraverse,'click',function(){
		var colorArr = [];
		colorArr = deepTraverse(root, colorArr);
		changeColor(colorArr);
	});
	addEventHandler(bTraverse,'click',function(){
		var colorArr = [];
		colorArr.push(root);
		colorArr = breathTraverse(root, colorArr)
		changeColor(colorArr);
	});
	addEventHandler(DFS,'click',function(){
		var colorArr = [];
		colorArr = deepTraverse(root, colorArr);
		search(colorArr,text[0].value);
	});
	addEventHandler(BFS,'click',function(){
		var colorArr = [];
		colorArr.push(root);
		colorArr = breathTraverse(root, colorArr)
		search(colorArr,text[0].value);
	});
}
function changeColor(colorArr) {
	var i = 0;
	var t = setInterval(function() {
		if(i>0){
			colorArr[i-1].style.backgroundColor='white';
		}
		colorArr[i].style.backgroundColor='pink';
		i++;
		if (i >= colorArr.length) {
			clearInterval(t);
			var t1 = setTimeout(function() {
				colorArr[i-1].style.backgroundColor='white';
			},500)
		}
	},500);
}
function search(colorArr,text) {
	var i = 0;
	var t = setInterval(function() {
		if (i>0){
			colorArr[i-1].style.backgroundColor='white';
		}
		a= colorArr[i].textContent.trim().split(/[(\r\n)]+/);
		for (var j in a) {
			if (/[a-zA-Z]/.test(a[j])) {
				if (a[j].trim() === text) {
					colorArr[i].style.backgroundColor='red';
					clearInterval(t);
				}
				else {
					colorArr[i].style.backgroundColor='pink';
				}
			break;
			}
		} 
		i++;
		if (i >= colorArr.length) {
			clearInterval(t);
			var t1 = setTimeout(function() {
				colorArr[i-1].style.backgroundColor='white';
			},500)
		}
	},500);
}
function deepTraverse(arr, colorArr) {
	colorArr.push(arr);
	for (var i = 1; i < arr.childNodes.length; i+=2) {
		colorArr = deepTraverse(arr.childNodes[i], colorArr);
	}
	return colorArr;
}
function breathTraverse(arr, colorArr) {
	for (var i = 0; i < colorArr.length; i++) {
		for (var j = 1; j < colorArr[i].childNodes.length; j+=2) {
			colorArr.push(colorArr[i].childNodes[j]);
		}
	}
	return colorArr;
}
orderTree();