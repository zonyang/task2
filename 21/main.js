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
//input实时监听事件
function addInput(element,fn) {
	var ie = window.ActiveXObject;
	if(ie) {
		//ie
		addEventHandler(element,'propertychange',fn);
	}
	else {
		//其他浏览器及ie9及以上
		addEventHandler(element,'input',fn);
	}
}
function queue() {
	//input存放tag
	var tag = document.getElementsByName('tag');
	var tags = document.getElementById('tags');
	var tagArr = [];
	addInput(tag[0], function() {
		if (/((\n\r)|\s|,)$/.test(tag[0].value)) {
			var text = tag[0].value.match(/[a-zA-Z0-9]/g).join('');
			tagArr.push(text);
			dealQueue(tagArr,tags);
			tag[0].value = "";
		}
	});
	//textarea表存放hoby
	var hoby = document.getElementsByName('hoby');
	var confirm = document.getElementById('confirm');
	var hobys = document.getElementById('hobys');
	var hobyArr = [];
	addEventHandler(confirm,'click',function() {
		hobyArr = hobyArr.concat( hoby[0].value.match(/[a-zA-Z0-9\u4e00-\u9fa5]+/g));
		hoby[0].value = "";
		dealQueue(hobyArr,hobys);
	});
}
function dealQueue(arr,queue) {
	arr = delRepeat(arr);
	while(arr.length >= 11) {
		arr.shift();
	}
	updateQueue(arr,queue);
}
function updateQueue(arr,queue) {
	var inner = "";
	for (var i = 0; i < arr.length; i++) {
		inner += "<div class='block'>"+arr[i]+"</div>";
	}
	queue.innerHTML = inner;
	delblock(arr,queue);
}
//去除重复项
function delRepeat(arr) {
	var unique = [];//临时数组
	var hash = {};//哈希表
	for (var i = 0; i < arr.length; i++) {
		if (!hash[arr[i]]) {
			hash[arr[i]] = true;
			unique.push(arr[i]);
		}
	}
	return unique;
}
//为每个元素绑定删除事件
function delblock(arr,queue) {
	for(var i=0; i<queue.childNodes.length; i++) {
		(function(m) {
			addEventHandler(queue.childNodes[m], 'mouseover', function() {
				queue.childNodes[m].innerHTML="点击删除 "+arr[m];
			})
			addEventHandler(queue.childNodes[m], 'mouseout', function() {
				queue.childNodes[m].innerHTML=arr[m];
			})
			addEventHandler(queue.childNodes[m], 'click', function() {
				arr.splice(m,1);
				updateQueue(arr,queue);
			})
		})(i);
	}
}
queue();