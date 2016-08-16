var data = [
  {time:"01:01:01",price:"11.00"},
  {time:"02:02:02",price:"22.00"},
  {time:"03:03:03",price:"33.00"},
  {time:"04:04:04",price:"44.00"},
  {time:"05:05:05",price:"55.00"},
  {time:"06:06:06",price:"66.00"},
  {time:"07:07:07",price:"77.00"}
]

var container = document.getElementsByClassName("noti-info")[0];
var scroll1 = document.getElementById("info-scroll1");

for(var i=0;i<data.length;i++){
  var li = document.createElement("li");
  scroll1.appendChild(li);
  var dot = document.createElement("div");
  var span1 = document.createElement("span");
  var span2 = document.createElement("span");
  var span3 = document.createElement("span");
  span1.innerHTML = data[i].time;
  span2.innerHTML = "您收到消费金额";
  span3.innerHTML = "￥" + data[i].price;
  dot.setAttribute("class","noti-dot");
  span1.setAttribute("class","noti-time");
  span2.setAttribute("class","noti-text");
  span3.setAttribute("class","noti-price");
  li.appendChild(dot);
  li.appendChild(span1);
  li.appendChild(span2);
  li.appendChild(span3);

}

var liHeight = li.getBoundingClientRect().bottom - li.getBoundingClientRect().top;
console.log(liHeight);

var scroll2 = scroll1.cloneNode(true);
container.appendChild(scroll2);


var top1 = 0;
var top2 = 0;
var currentTop1,currentTop2
var myFuc = setInterval(function(){
  currentTop1 = top1;
  currentTop2 = top2;
  top1 = top1 - liHeight;
  top2 = top2 - liHeight;

  if(currentTop1 == -(data.length)*liHeight){
    top1 = (data.length-1)*liHeight;
    scroll1.style.top = top1 + "px";
  }
  if(currentTop2 == -(data.length)*2*liHeight){
    top2 = -liHeight;
    scroll2.style.top = top2 + "px";
  }

  var linear = setInterval(function(){
    if(scroll1.style.top == (top1) + "px"){
      clearInterval(linear);
    }

    currentTop1 = currentTop1-1;
    currentTop2 = currentTop2-1;
    scroll1.style.top = currentTop1 + "px";
    scroll2.style.top = currentTop2 + "px";

  },10)




},3000);
