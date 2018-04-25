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
function getRelated(e){
    var related;
    var type=e.type.toLowerCase();//这里获取事件名字
    if(type === 'mou'){
        related = e.relatedTarget||e.fromElement
    }
    else if(type === 'mouseout') {
        related=e.relatedTarget||e.toElement
    }
    return related;
}
function orderTree() {
	var root = document.getElementById('binaryTree');
	var dTraverse = document.getElementById('dTraverse');
	var bTraverse = document.getElementById('bTraverse');
	var DFS = document.getElementById('DFS');
	var BFS = document.getElementById('BFS');
	var text = document.getElementsByName('search');
	addEventHandler(dTraverse,'click',function(){
		if (selectBlock) {
			selectBlock.style.backgroundColor='white';
		}
		if (searchBlock) {
			searchBlock.style.backgroundColor='white';
		}
		var colorArr = [];

		colorArr = deepTraverse(root, colorArr);
		changeColor(colorArr);
	});
	addEventHandler(bTraverse,'click',function(){
		if (selectBlock) {
			selectBlock.style.backgroundColor='white';
		}
		if (searchBlock) {
			searchBlock.style.backgroundColor='white';
		}
		var colorArr = [];
		colorArr.push(root);
		colorArr = breathTraverse(root, colorArr)
		changeColor(colorArr);
	});
	addEventHandler(DFS,'click',function(){
		if (selectBlock) {
			selectBlock.style.backgroundColor='white';
		}
		var colorArr = [];
		colorArr = deepTraverse(root, colorArr);
		search(colorArr,text[0].value);
	});
	addEventHandler(BFS,'click',function(){
		if (selectBlock) {
			selectBlock.style.backgroundColor='white';
		}
		var colorArr = [];
		colorArr.push(root);
		colorArr = breathTraverse(root, colorArr)
		search(colorArr,text[0].value);
	});
	//删除节点
	var del = document.getElementById('del');
	addEventHandler(del,'click',function(){
		selectBlock.parentNode.removeChild(selectBlock);
	});
	var add = document.getElementById('add');
	var atext = document.getElementById('atext');
	//添加节点
	addEventHandler(add,'click',function(){
		var node=document.createElement("div");
		var textnode=document.createTextNode(atext.value);
		node.appendChild(textnode);
		selectBlock.appendChild(node);
	});

}
var selectBlock;//记录选中的块
var searchBlock;//搜索到的块
function click() {		
	//绑定根元素
	var root = document.getElementById('binaryTree');
	addEventHandler(root,'click',function(e){
					e.stopPropagation(); //防止冒泡
					if (selectBlock) {
						selectBlock.style.backgroundColor='white';
					}
					root.style.backgroundColor='pink';
					selectBlock = root;
				});
	var colorArr=[];
	colorArr.push(root);
	//绑定子元素
	for (var i = 0; i < colorArr.length; i++) {
		for (var j = 0; j < colorArr[i].childNodes.length; j++) {
			if(colorArr[i].childNodes[j].nodeName != "#text") {
				colorArr.push(colorArr[i].childNodes[j]);
				(function(m,k) {
					addEventHandler(colorArr[m].childNodes[k],'click',function(e){
						e.stopPropagation(); //防止冒泡
						if (selectBlock) {
							selectBlock.style.backgroundColor='white';
						}
						if (searchBlock) {
							searchBlock.style.backgroundColor='white';
						}
						colorArr[m].childNodes[k].style.backgroundColor='pink';
						selectBlock=colorArr[m].childNodes[k];
					});
				})(i,j);
			}
		}
	}
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
					searchBlock = colorArr[i];
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
	for (var i = 0; i < arr.childNodes.length; i++) {
		if(arr.childNodes[i].nodeName != "#text") {
			colorArr = deepTraverse(arr.childNodes[i], colorArr);
		}
	}
	return colorArr;
}
function breathTraverse(arr, colorArr) {
	for (var i = 0; i < colorArr.length; i++) {
		for (var j = 0; j < colorArr[i].childNodes.length; j++) {
			if(colorArr[i].childNodes[j].nodeName != "#text") {
				colorArr.push(colorArr[i].childNodes[j]);
			}
		}
	}
	return colorArr;
}
orderTree();
click();