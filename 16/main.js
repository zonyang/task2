/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function trim(str) {
	var re = /^\s+|\s+$/g;
	return str.replace(re,'');
}
function addAqiData() {
	var city = trim(document.getElementById('aqi-city-input').value);
	var cityTest = /^([a-zA-Z]|[\u4e00-\u9fa5])+$/g;
	if (!cityTest.test(city)) {
		alert('请在城市一栏输入字母或者汉字');
		exit();
	}
	var num = trim(document.getElementById('aqi-value-input').value);
	var numTest = /^[1-9]+$/g; 
	if (!numTest.test(num)) {
		alert('请在空气质量一栏输入整数');
		exit();
	}
	aqiData[city] = num;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	var tr = document.createElement('tr');
	var td_c = document.createElement('td');
	var td_n = document.createElement('td');
	var td_b = document.createElement('td');
	if (table.children.length === 0) {
		table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	}
	for (var data in aqiData)
	{	
		td_c.innerHTML = data;
		td_n.innerHTML = aqiData[data];
		tr.appendChild(td_c);
		tr.appendChild(td_n);
		td_b.innerHTML = "<button class='del-btn'>删除</button>";
		tr.appendChild(td_b);
		table.appendChild(tr);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
  	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var parent = target.parentElement.parentElement;
  parent.removeChild(parent.children[0]);
  parent.removeChild(parent.children[0]);
  parent.removeChild(parent.children[0]);
  //renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var cre_btn = document.getElementById("add-btn");
  cre_btn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById("aqi-table");
  var del_btn = table.getElementsByClassName("del-btn");
  table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })
}

init();
