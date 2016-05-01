//定义数据列表
var dataList = [];
var state = [];

//取得数据的函数，包括不合法数据的筛选
function getData(){

}

//定义渲染函数
function render(){
	var numList = document.getElementById("num-list");
	numList.innerHTML = "" ;

	for(var m = 0; m < dataList.length; m++){
	numList.innerHTML += "<div>" + "</div>" ;
  //取得包含数据的div的nodelist
  var dataDiv = numList.querySelectorAll("div");
  //给每个数据的div设定样式
  dataDiv[m].style.height = dataList[m]*5 + "px";

  }
}

//打乱排序
function randomSort(){
  return Math.random()>0.5?-1:1;

}



//定义排序函数
function sortNum(arr){
  for (var i = arr.length-1; i > 0; i--) {
    for(var j = 0; j < i; j++){
      if (arr[j] > arr[j+1]) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        //将每一次交换的数组存到state中，state是数组的数组
        state.push(JSON.parse(JSON.stringify(arr)));
      }
    }

  }
}

//随机生成1到100的整数
function randomGeneration(){
  for(var x=0; x<19; x++){
    dataList[x] = parseInt(Math.random()*100+1);
  }
}

//定义重置函数
function formReset()
  {
  document.getElementById("myForm").reset()
  }

//定义初始函数
function init(){

  	//绑定事件按钮
  	var inleftBtn = document.getElementById("in-left");
  	inleftBtn.onclick = function(){
  		var data = document.getElementById("num-input").value.trim();
  		dataList.unshift(data);
  		render();
      formReset();
  	}

  	var inRightBtn = document.getElementById("in-right");
  	inRightBtn.onclick = function(){
  		var data = document.getElementById("num-input").value.trim();
  		dataList.push(data);
  		render();
      formReset();
  	}

  	var outLeftBtn = document.getElementById("out-left");
  	outLeftBtn.onclick = function(){
  		var data = document.getElementById("num-input").value.trim();
  		dataList.shift(data);
  		render();
  	}

  	var outRightBtn = document.getElementById("out-right");
  	outRightBtn.onclick = function(){
  		var data = document.getElementById("num-input").value.trim();
  		dataList.pop(data);
  		render();
  	}

    var sort = document.getElementById("sort");
    sort.onclick = function(){
      sortNum(dataList);
      var int = setInterval(forSortRender, 100);
			//专门给冒泡排序写一个渲染函数
			function forSortRender(){
			  var s ;
			  s = state.shift();
			  var numList = document.getElementById("num-list");
			  numList.innerHTML = "" ;
			  if (s !== undefined) {
			    for(var m = 0; m < s.length; m++){
			    numList.innerHTML += "<div>" + "</div>" ;
			    //取得包含数据的div的nodelist
			    var dataDiv = numList.querySelectorAll("div");
			    //给每个数据的div设定样式
			    dataDiv[m].style.height = s[m]*5 + "px";

			    }
			  }
			  //避免state为空之后，页面也变空
			  else{
			    render();
			    window.clearInterval(int);
			  }
			}
    }

    var randomsort = document.getElementById("random-sort");
    randomsort.onclick = function(){
      dataList.sort(randomSort);
      render();
    }

    var randomgeneration = document.getElementById("random-generation");
    randomgeneration.onclick = function(){
      randomGeneration();
      render();
    }

}

init();
