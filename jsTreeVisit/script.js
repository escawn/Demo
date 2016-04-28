var visitedList = [];
var parent = document.getElementsByClassName("parentNode")[0];

//遍历函数
//先序遍历
var preOrder = function(node){
  if (node !== null) {
    visitedList.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);

  }
}

//中序遍历
var inOrder = function(node){
  if (node !== null) {
    inOrder(node.firstElementChild);
    visitedList.push(node);
    inOrder(node.lastElementChild);

  }
}

//后序遍历
var postOrder = function(node){
  if (node !== null) {
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    visitedList.push(node);

  }
}

//渲染函数，呈现视觉效果用
var render = function(){
  var int = setInterval(function(){
    clear();
    var currentNode;
    currentNode = visitedList.shift();
    //alert(currentNode);
    if (currentNode !== undefined) {
      currentNode.style.backgroundColor = "red";

    }
    else {
      window.clearInterval(int);
    }
  },500);

}

//清空函数
var clear = function(){
  var div = document.getElementsByTagName("div");
  for(var index = 0;index < div.length;index++){
    div[index].style.backgroundColor = "#fff";
  }
}

var init = function(){
  var btn = document.getElementsByClassName('button')[0];
  btn.addEventListener("click",function(e){
    if (e.target&&e.target.className == "VLR") {
      visitedList = [];
      preOrder(parent);
      render();
    }
    if (e.target&&e.target.className == "LVR") {
      visitedList = [];
      inOrder(parent);
      render();
    }
    if (e.target&&e.target.className == "LRV") {
      visitedList = [];
      postOrder(parent);
      render();
    }
  },false);
}

init();
