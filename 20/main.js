function addEventHandler(element, event, handler) {
	if(element.addEventListener) {
		element.addEventListener(event, handler, false);
	}
	else if(element.attachEvent) {
		element.attachEvent('on'+event, handler);
	}
	else {
		element['on'+event] = handler;
	}
}
function queue() {
	var input = document.getElementsByName('num');
	var arr = [];
	var leftOut = document.getElementById('leftOut');
	addEventHandler(leftOut, 'click', function() {
		alert(arr[0]);
		arr.shift();
		updateQueue(arr);
	});
	var rightIn = document.getElementById('rightIn');
	addEventHandler(rightIn, 'click', function() {
		var num = input[0].value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);//(",");
		for(var i in num) {
			if(num[i] !== "") {
				arr.push(num[i]);
				updateQueue(arr);
			}
		}
	});
	//当点击查询时，将查询词在各个元素内容中做模糊匹配，将匹配到的内容进行背景颜色标示。
	var inquire = document.getElementById('inquire');
	addEventHandler(inquire, 'click', function() {
		var text = document.getElementsByName('text');
		var flag = true;
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].indexOf(text[0].value) !== -1) {
				updateQueue(arr);
				var queue = document.getElementById('queue');
				var inner = queue.innerHTML.match(/>[0-9a-zA-Z\u4e00-\u9fa5]+</g);
				var block = queue.innerHTML.match(/<div[^>]+>[^<]+<\/div>/g);
				for(var i in inner){
					inner[i]=inner[i].replace(new RegExp(text[0].value,"g"),
								"<span style='background-color:yellow'>"+text[0].value+"</span>");
				}
				var innerHTML = "";
				for(var i in block){
					innerHTML += block[i].replace(/>[0-9a-zA-Z\u4e00-\u9fa5]+</g,inner[i]);
				}
				queue.innerHTML = innerHTML;
				flag = false;
			}
		}
		if(flag) {
			alert('nonentity');
		}
	});
}
function updateQueue(arr) {
	var inner = "";
	var queue = document.getElementById('queue');
	for (var i = 0; i < arr.length; i++) {
		inner += "<div class='block'>"+arr[i]+"</div>";
	}
	queue.innerHTML = inner;
	delblock(arr);
}
function delblock(arr) {
	var queue = document.getElementById('queue');
	for(var i=0; i<queue.childNodes.length; i++) {
		(function(m) {
			addEventHandler(queue.childNodes[m], 'click', function() {
				arr.splice(m,1);
				updateQueue(arr);
			})
		})(i);
	}
}
queue();