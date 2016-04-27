var visitedList = [];
var parent = document.getElementsByClassName("parentNode");

//遍历函数
//先序遍历
var preOrder = function(node){
  if (node) {
    visitedList.push(node);
    preOrder(node.firstChild);
    preOrder(node.lastChild);

  }
}

//中序遍历
var inOrder = function(node){
  if (node) {
    inOrder(node.firstChild);
    visitedList.push(node);
    inOrder(node.lastChild);

  }
}

//后序遍历
var postOrder = function(node){
  if (node) {
    postOrder(node.firstChild);
    postOrder(node.lastChild);
    visitedList.push(node);

  }
}

//渲染函数，呈现视觉效果用
var render = function(){
  var int = setInterval(function(){
    var s;
    s = visitedList.shift();
    if (s !== undefined) {
      s.style.backgroundColor = "red";

    }
    else {
      window.clearInterval(int);
    }
  },100);

}

//清空函数
//var clear() = function(){
//  var div =
//}

var init = function(){
  var button = document.getElementsByClassName('button');
  button.addEventListener("click",function(e){
    if (e.target&&e.target.className == "VLR") {
      preOrder(parent);
    }
    if (e.target&&e.target.className == "LVR") {
      inOrder(parent);
    }
    if (e.target&&e.target.className == "LRV") {
      postOrder(parent);
    }
  })
}

init();
