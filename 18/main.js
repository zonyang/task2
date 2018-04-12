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
		if ((/^[0-9]+$/).test(input[0].value)) {
			arr.unshift(input[0].value);
			updateQueue(arr);
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
		if ((/^[0-9]+$/).test(input[0].value)) {
			arr.push(input[0].value);
			updateQueue(arr);
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
}
function updateQueue(arr) {
	var inner = "";
	var queue = document.getElementById('queue');
	for (var i = 0; i < arr.length; i++) {
		inner += "<div class='block' id="+i+">"+arr[i]+"</div>";
	}
	queue.innerHTML = inner;
	delblock(arr);
}
function delblock(arr) {
	var queue = document.getElementById('queue');
	console.log(queue.childNodes.length);
	for(var i=0; i<queue.childNodes.length; i++){
		(function(m){
			addEventHandler(queue.childNodes[m], 'click', function() {
				arr.splice(m,1);
				updateQueue(arr);
			})
		})(i);
	}
}
queue();