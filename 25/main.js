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
function treeNode(obj) {
	this.selfElement = obj.selfElement;
	this.childs = obj.childs || [];//存放子节点的数组
	this.parent = obj.parent;
	this.selfElement.treeNode = this;
}
var colorEle = '';
treeNode.prototype = {
	//遍历所有树叶结点
	traverse: function(visible) {
		for (var i = 0; i < this.childs.length; i++) {
			this.childs[i].style(visible);
		}
		if (this.selfElement.className !== 'init') { //改为不可见;
			if (this.childs[0].selfElement.className === 'node visible') { 
				this.selfElement.getElementsByClassName('arrow')[0].className = 'arrow down';
			}
			else {
				this.selfElement.getElementsByClassName('arrow')[0].className = 'arrow right';
			}
		}
	},
	//改变样式 参数分别表示是否改变箭头，
	style: function(visible) {
		if(!this.isLeaf()) {
			this.selfElement.style.paddingLeft='28px';
		}
		if(!this.isLeaf() && this.selfElement.getElementsByClassName('arrow')[0].className === 'arrow') {
			
			this.selfElement.getElementsByClassName('arrow')[0].className = 'arrow right';
		}
		//叶节点收缩、展开
		if (visible) { //改为不可见
			if (this.selfElement.className === 'node visible') { 
                this.selfElement.className = 'node hidden';
            }
            else { //改为可见
                this.selfElement.className = 'node visible';
            }
		}
		if (!visible) {
			this.selfElement.className = 'node visible';
		}
	},
	addNode: function(value) {
		var node = document.createElement("div");
		node.className = "node hidden";
		var nodeHead = document.createElement("lable");
		nodeHead.className = "Head";
		var arrow = document.createElement("div");
		arrow.className = "arrow";
		var span = document.createElement("span");
		span.className = "text";
        var textnode = document.createTextNode(value);
        var add = document.createElement("img");
		add.className = "add";
		add.src = "img/add.png";
		var del = document.createElement("img");
		del.className = "del";
		del.src = "img/delete.png";
        span.appendChild(textnode);
     	nodeHead.appendChild(arrow);
     	nodeHead.appendChild(span);
     	nodeHead.appendChild(add);
     	nodeHead.appendChild(del);
        node.appendChild(nodeHead);
        this.selfElement.appendChild(node);
        this.childs.push(new treeNode({selfElement: node, parent: this.selfElement}));
        return this;
	},
	delNode: function(node) {
		var parent = node.parentNode;
		parent.treeNode.childs.shift(node.treeNode);
		parent.removeChild(node);
		if (parent.treeNode.childs.length === 0) {
			parent.getElementsByClassName('arrow')[0].className = 'arrow';
			parent.style.paddingLeft=  '';	
		}
	},
	//判断是否为叶子结点
	isLeaf: function() {
		return this.childs.length === 0;
	},
	//判断是否为折叠状态
	isFold: function(node) {
		if (this.isLeaf()) {return false;}
		else {
			return node.getElementsByClassName('arrow')[0].className === 'arrow down'; 
		}
	},
	//绑定事件
	event: function(root) {
		addEventHandler(root.selfElement, 'click', function(e) {
			//			e.stopPropagation(); //防止冒泡
			var target = e.target || e.srcElement;
			node = target;
			while (node.className.indexOf("node") == -1) {
				node = node.parentNode;
			}//找到外层包含块
			if (target.className === 'text' || target.className.indexOf('arrow')!=-1) {
				node.treeNode.traverse(true);
			}
			if (target.className === 'add') {
				var add = true;
				var nodeText = prompt();
				var oldNode = target.parentNode.parentNode.treeNode;
				//除去重，除去无效字符
				if (nodeText === '') {
					alert('invalid character.');
					add = false;
				}
				for (var i = 0; i < oldNode.childs.length; i++) {
					if(oldNode.childs[i].selfElement.getElementsByClassName('text')[0].innerHTML
					 === nodeText) {
					 	alert('already existed.');
						add = false;
					}
				}
				if (add) {
					var newNode = target.parentNode.parentNode.treeNode.addNode(nodeText);
					if (root.isFold(target.parentNode.parentNode)) {
						newNode.childs[(newNode.childs.length)-1].selfElement.className = 'node visible';					
					}
				}
			}
			if (target.className === 'del') {
				root.delNode(target.parentNode.parentNode);
			}
		})
		var search = document.getElementById('search');
		var del = document.getElementById('delete');
		var text = document.getElementById('text');
		addEventHandler(search, 'click', function(e) {
			root.allChilds(root, text);
			
		})
		addEventHandler(del, 'click', function(e) {
			root.allChilds(root, text, true);
		})
	},
	allChilds: function(node, text, del) {
console.log(node.childs.selfElement);
		for (var i = 0; i < node.childs.length; i++) {
			if(node.childs[i].selfElement.getElementsByClassName('text')[0].innerHTML === text.value) {
				if (colorEle !== '') {
					colorEle.style.color = '#6898f4'; 
				}
				node.childs[i].selfElement.getElementsByClassName('text')[0].style.color = 'red';
				colorEle = node.childs[i].selfElement.getElementsByClassName('text')[0];
				parentNode = node.childs[i].parent.treeNode.selfElement;
				while(parentNode.className !== 'init') {
					parentNode.treeNode.traverse(false);
					parentNode = parentNode.treeNode.parent;
				}
				if (del) {
					root.delNode(node.childs[i].selfElement);
				}
				break;
			}
			this.allChilds(node.childs[i], text, del);
		}
	}
}
var root = new treeNode({selfElement: document.getElementsByClassName('init')[0]});
//渲染列表
root.addNode('主科').addNode('理综').addNode('文综');
root.childs[0].addNode('数学').addNode('语文').addNode('英语');
root.childs[0].childs[0].addNode('高数').addNode('线代');
root.childs[0].childs[0].childs[1].addNode('线代上').addNode('线代下');
root.childs[1].addNode('生物').addNode('化学').addNode('物理');
root.childs[2].addNode('政治').addNode('历史');
root.childs[2].childs[1].addNode('近代史');
root.traverse(true);
root.event(root);
