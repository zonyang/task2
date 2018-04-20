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
	var preOrder = document.getElementById('pre');
	var inOrder = document.getElementById('in');
	var postOrder = document.getElementById('post');
	addEventHandler(preOrder,'click',function(){
		var colorArr = [];
		colorArr = preorder(root, colorArr);
		changeColor(colorArr);
	});
	addEventHandler(inOrder,'click',function(){
		var colorArr = [];
		colorArr = inorder(root, colorArr)
		changeColor(colorArr);
	});
	addEventHandler(postOrder,'click',function(){
		var colorArr = [];
		colorArr = postorder(root, colorArr)
		changeColor(colorArr);
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
function preorder(arr, colorArr) {
	colorArr.push(arr);
	if (arr.childNodes[1]) {
		colorArr = preorder(arr.childNodes[1], colorArr);
	}
	if (arr.childNodes[3]) {
		colorArr = preorder(arr.childNodes[3], colorArr);
	}
	return colorArr;
}
function inorder(arr, colorArr) {
	if (arr.childNodes[1]) {
		inorder(arr.childNodes[1], colorArr);
	}
	colorArr.push(arr);
	if (arr.childNodes[3]) {
		inorder(arr.childNodes[3], colorArr);
	}
	return colorArr;
}
function postorder(arr, colorArr) {
	if (arr.childNodes[1]) {
		postorder(arr.childNodes[1], colorArr);
	}
	if (arr.childNodes[3]) {
		postorder(arr.childNodes[3], colorArr);
	}
	colorArr.push(arr);
	return colorArr;
}
orderTree();