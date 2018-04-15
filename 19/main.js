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

	var leftIn = document.getElementById('leftIn');
	addEventHandler(leftIn, 'click', function() {
		//限制输入的数字在10-100
		if ((/^([1-9]\d|100)$/).test(input[0].value)) {
			//队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
			if (arr.length < 60) {
				arr.unshift(input[0].value);
				updateQueue(arr);
			}
			else {
				alert('The number of elements exceeds the limit.');
			}
		}
		else {
			alert('Please enter an interger!');
		}
	});
	var leftOut = document.getElementById('leftOut');
	addEventHandler(leftOut, 'click', function() {
		alert(arr[0]);
		arr.shift();
		updateQueue(arr);
	});
	var rightIn = document.getElementById('rightIn');
	addEventHandler(rightIn, 'click', function() {
		if ((/^([1-9]\d|100)$/).test(input[0].value)) {
			if (arr.length < 60) {
				arr.push(input[0].value);
				updateQueue(arr);
			}
			else {
				alert('The number of elements exceeds the limit.');
			}
		}
		else {
			alert('Please enter an interger!');
		}
	});
	var rightOut = document.getElementById('rightOut');
	addEventHandler(rightOut, 'click', function() {
		alert(arr[arr.length-1]);
		arr.pop();
		updateQueue(arr);
	});
	var bublle = document.getElementById('bublle');
	addEventHandler(bublle, 'click', function() {
		bublleSort(arr);
	});
}
function updateQueue(arr) {
	var inner = "";
	var queue = document.getElementById('queue');
	for (var i = 0; i < arr.length; i++) {
		inner += "<div class='block' style='margin-top:"+(100-arr[i])+"px; height:"+arr[i]+"px'></div>";
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
//冒泡排序
function bublleSort(arr) {
	var i = 0,j = 1;
	var int = setInterval(function(){
		if(arr[i] > arr[j]) {
			arr[i] = Number(arr[i])+Number(arr[j]);
			arr[j] = arr[i]-arr[j];
			arr[i] = arr[i]-arr[j];
			updateQueue(arr);
		}
		j++;
		if(j===arr.length) {
			i++;
			j=i+1;
			if (i===arr.length-1) {
				clearInterval(int);
			}
		}
	},50);
}
queue();