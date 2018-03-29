/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2018-01-01");
  var datStr = ''
  for (var i = 1; i < 91; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  //console.log(datStr);
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(innerHTML, width, leftWidth, data) {
	var chart = document.getElementById('aqi-chart');
	var left = 0;
	for(var key in data) {
			left += leftWidth;
			innerHTML += "<div class='row' style='margin-left: "+left+
			"%;background:blue;height: "+data[key].split(" ")[0]+"px;width: "+width+"%' id = "+key+"></div>";
		}
	chart.innerHTML = innerHTML;
	var id = document.getElementById('aqi-chart').children;
    for (var i = 1; i < id.length; i++) {
  		(function (m) {
  			addEventHandler(id[m], 'mouseover', function(event) {
  				id[m].innerHTML="<div class=text>[AQI]: "+data[id[m].id]+"<br>"
  				+"</div>"
  			})
  		})(i);
    }
    for (var i = 1; i < id.length; i++) {
  		(function (m) {
  			addEventHandler(id[m], 'mouseout', function(event) {
  			id[m].innerHTML='';
  		})})(i);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
  // 确定是否选项发生了变化 
  	var city = document.getElementById('city-select');
	if (radio.value === 'day') {
		var innerHTML = "<div class='chart-title'>"+city.value+"市01-03月日平均空气质量报告</div>";
		var width = 0.5;
		var leftWidth = (100-width)/91;
		renderChart(innerHTML,width,leftWidth,chartData.day);
	}
	if (radio.value === 'week') {
		var innerHTML = "<div class='chart-title'>"+city.value+"市01-03月周平均空气质量报告</div>";
		var width = 4;
		var leftWidth = (100-width)/15;
		renderChart(innerHTML,width,leftWidth,chartData.week);
	}
	if (radio.value === 'month') {
		var innerHTML = "<div class='chart-title'>"+city.value+"市01-03月月平均空气质量报告</div>";
		var width = 10;
		var leftWidth = (100-width)/4;
		renderChart(innerHTML,width,leftWidth,chartData.month);
	}
  // 设置对应数据

  // 调用图表渲染函数
 
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// 设置对应数据
	initAqiChartData();
  	// 确定是否选项发生了变化 
  	var radio = document.getElementsByName("gra-time");
  	for(var i = 0; i < radio.length; i++) {
  		if(radio[i].checked){
  			// 调用图表渲染函数
 			 graTimeChange(radio[i]);
  		}
  	}
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */

 /**
 * addEventHandler方法
 * 跨浏览器实现事件绑定
 */
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

function initGraTimeForm() {	
	var radio = document.getElementsByName("gra-time");
    for (var i = 0; i < radio.length; i++) {
        (function (m) {
            addEventHandler(radio[m], 'click', function () { 
            graTimeChange(radio[m]);
            })
        })(i);
    }
    //for (var i = 0; i < radio.length; i++) {

    //addEventHandler(id, 'mouseout', function(event){
    //	console.log('aaa');
        //var ele = event.target;
        //ele.className = ele.className.replace(/show/, "");
    //});
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var city = document.getElementById('city-select');
  	var Data = aqiSourceData[city.value];
    addEventHandler(city, 'change', function(){ 
        citySelectChange();
    });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  	var city = document.getElementById('city-select');
  	var Data = aqiSourceData[city.value];	
	var jan = /^2018-01/;
	var feb = /^2018-02/;
	var mar = /^2018-03/;
	var sumj = 0;var sumf = 0;var summ = 0;
	for (var key in Data) {
		if(jan.test(key)) {
			sumj += Data[key];
		}
	 	else if(feb.test(key)) {
			sumf += Data[key];
		}
		else if(mar.test(key)) {
			summ += Data[key];
		}
	}
	chartData.month = {};
	chartData.month[1] = parseInt(sumj/31)+" 2018-01";
	chartData.month[2] = parseInt(sumf/28)+" 2018-02";
	chartData.month[3] = parseInt(summ/31)+" 2018-03";
	console.log(chartData.month);
	var sum = dayNum = 0;
	var weekNum = 1;
	chartData.week = [];
	for (var key in Data) {
		if (weekNum !== 5 && weekNum !== 14) {
			dayNum++;
			sum += Data[key];
			if (dayNum === 7) {
				if (weekNum < 5) {
					chartData.week[weekNum] = parseInt(sum/7) +  " 2018-01 第"+weekNum+"周";
				}
				if (weekNum > 5 && weekNum < 10) {
					chartData.week[weekNum] = parseInt(sum/7) +  " 2018-02 第"+ (weekNum-5) +"周";
				}
				if (weekNum > 9 && weekNum < 14) {
					chartData.week[weekNum] = parseInt(sum/7) +  " 2018-03 第"+ (weekNum-9) +"周";
				}
				dayNum=0;
				sum=0;
				weekNum++;
			}
		}
		else {
			dayNum++;
			sum += Data[key];
			if (dayNum === 3) {
				if (weekNum === 5) {
					chartData.week[weekNum] = parseInt(sum/3) +  " 2018-01 第"+weekNum+"周";
				}
				if (weekNum === 14) {
					chartData.week[weekNum] = parseInt(sum/3) +  " 2018-03 第"+(weekNum-9)+"周";
				}
				dayNum=0;
				sum=0;
				weekNum++;
			}
		}
	}
	chartData.day={};
	var i=0;
	for (var key in Data) {
		chartData.day[i] = parseInt(Data[key])+" "+key;
		i++;
	}
}
/**
 * 初始化图表
 */
function initchart() {
	initAqiChartData();
	var innerHTML = "<div class='chart-title'>北京市01-03月日平均空气质量报告</div>";
	var width = 0.5;
	var leftWidth = (100-width)/91;
	renderChart(innerHTML,width,leftWidth,chartData.day);
}
/**
 * 初始化函数
 */
function init() {
	initchart();
  	initGraTimeForm();
  	initCitySelector();
	initAqiChartData();
}

init();
