let i = 0
let index
let comp = []
let notStarted = []
let inPro = []
let comp1 = []
let notStarted1 = []
let inPro1 = []
let bts = document.querySelectorAll(".parent >div button")


if (localStorage.getItem('notStarted-tasks')){
  let parent = document.querySelector(".parent .not-started .tasks")
  let text = localStorage.getItem('notStarted-tasks');
  for(let k = 0;k<text.length;k++){
  let element = "";
  if(text[k] === '{'){
  while(text[k] !== "}"){
    element+= text[k];
    k++;
  }
  }
  element+="}";
  k++;
  let divData = JSON.parse(element);
  notStarted1.push(divData);
  console.log(divData)
  let divElement = document.createElement('div');
  // Set the properties of the <div> element
  divElement.draggable = true
  divElement.id = divData.id;
  divElement.innerHTML = divData.innerHTML;
  divElement.className = divData.class;
  parent.appendChild(divElement);
  notStarted.push(element);
  i++;
  }
}



if (localStorage.getItem('inPro-tasks')){
  let parent = document.querySelector(".parent .in-pro .tasks")
  let text = localStorage.getItem('inPro-tasks');
  for(let k = 0;k<text.length;k++){
  let element = "";
  if(text[k] === '{'){
    while(text[k] !== "}"){
      element+= text[k];
      k++;
    }
  }
  element+="}";
  k++;
  let divData = JSON.parse(element);
  inPro1.push(divData);
  console.log(divData)
  let divElement = document.createElement('div');
  // Set the properties of the <div> element
  divElement.draggable = true
  divElement.id = divData.id;
  divElement.innerHTML = divData.innerHTML;
  divElement.className = divData.class;
  parent.appendChild(divElement);
  i++;
  inPro.push(element);
  }
}

if (localStorage.getItem('comp-tasks')){
  let parent = document.querySelector(".parent .completed .tasks")
  let text = localStorage.getItem('comp-tasks');
  for(let k = 0;k<text.length;k++){
  let element = "";
  if(text[k] === '{'){
  while(text[k] !== "}"){
    element+= text[k];
    k++;
  }
  }
  element+="}";
  k++;
  let divData = JSON.parse(element);
  comp1.push(divData);
  console.log(divData)
  let divElement = document.createElement('div');
  // Set the properties of the <div> element
  divElement.draggable = true
  divElement.innerHTML = divData.innerHTML;
  divElement.className = divData.class;
  divElement.id = divData.id;
  parent.appendChild(divElement);
  i++;
  comp.push(element);
}
}

let editbts = document.querySelectorAll("button[class = 'edit']");
let delbts = document.querySelectorAll("button[class = 'delete']");
let inputs = document.querySelectorAll(".parent >div .tasks div input");
delbts.forEach(function(element){
  element.addEventListener("click",deleteFunc);
})

editbts.forEach(function(element){
  element.addEventListener("click",edit);
})

inputs.forEach(function(element){
  element.addEventListener("input",editInputFunc);
})

bts.forEach(function(element){
  element.onclick = function (){
    i++;
    i < 10 ? index = "0"+i : index =i;
    let parent = this.parentElement.firstElementChild;
    console.log(parent)
    // div.draggable = true
    // div.id = i;
    // div.className = parent.id;
    // div.appendChild(creatInput());
    // div.appendChild(creatEditBt());
    // div.appendChild(creatDelBt());
    let div = creatTask(parent)
    parent.appendChild(div);
    let divDate = {
      innerHTML:div.innerHTML,
      id : div.id,
      class : div.className
    }
    let json = JSON.stringify(divDate);
    if(parent.id === 'not-s'){
      notStarted1.push(divDate);
      notStarted.push(json);
      localStorage.setItem("notStarted-tasks",notStarted);
    }else if (parent.id === 'in-p'){
      inPro.push(json);
      inPro1.push(divDate);
      localStorage.setItem("inPro-tasks",inPro);
    }else{
      comp.push(json);
      comp1.push(divDate);
      localStorage.setItem("comp-tasks",comp);
    }
    console.log("parent ",JSON.stringify(parent.innerHTML))
  }
})

function creatTask(parent){
  let div = document.createElement("div");
  div.id = i;
  div.className = parent.id;
  div.draggable = true
  div.addEventListener('dragstart',dragStart);
  div.addEventListener('dragstart',dragEnd);
  div.appendChild(creatInput());
  div.appendChild(creatEditBt());
  div.appendChild(creatDelBt());
  return div
}

function creatInput(){
  var element = document.createElement("input");
  element.type = "text";
  element.setAttribute("value","Task "+index);
  element.addEventListener("input",editInputFunc);
  return element;
}

function creatEditBt(){
  var element = document.createElement("button");
  element.className = "edit";
  element.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
  element.addEventListener("click",edit);
  return element;
}

function creatDelBt(){
  var element = document.createElement("button");
  element.className = "delete";
  element.innerHTML = "<i class='fa-solid fa-trash'></i>";
  element.addEventListener("click",deleteFunc);
  return element;
}

function edit(){
  console.log(this);
  let input = this.parentElement.firstElementChild
  setCursor(input);
  console.log(this.parentElement);
}


function editInputFunc(){
  val = this.value;
  console.log(val);
  this.setAttribute("value",val);
  let divDate = {
  innerHTML:this.parentElement.innerHTML,
  id : this.parentElement.id,
  class : this.parentElement.className
  }
  let json = JSON.stringify(divDate);
  if (this.parentElement.className === 'not-s'){
    for(let l = 0;l<notStarted.length;l++){
      if (JSON.parse(notStarted[l]).id === divDate.id){
        notStarted[l] = json;
        break;
      }
    }
    localStorage.setItem("notStarted-tasks",notStarted);
  }else if (this.parentElement.className === 'in-p'){
    for(let l = 0;l<inPro.length;l++){
      if (JSON.parse(inPro[l]).id === divDate.id){
        console.log(JSON.parse(inPro[l]).id , divDate.id ,l)
        console.log(json)
        inPro[l] = json;
        break;
      }
    }
    localStorage.setItem("inPro-tasks",inPro);
  }
  else{
    for(let l = 0;l<comp.length;l++){
      if (JSON.parse(comp[l]).id === divDate.id){
        comp[l] = json;
        break;
      }
    }
    localStorage.setItem("comp-tasks",comp);
  }
}

function setCursor(input){
  const end = input.value.length;
  input.setSelectionRange(end,end);
  input.focus();
}

function deleteFunc(){
  console.log(this)
  let temp = {
    innerHTML:this.parentElement.innerHTML,
    id : this.parentElement.id,
    class : this.parentElement.className
  }
  if (this.parentElement.className === 'not-s'){
    notStarted.splice(notStarted.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("notStarted-tasks",notStarted);
  }else if (this.parentElement.className === 'in-p'){
    inPro.splice(inPro.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("inPro-tasks",inPro);
  }else{
    comp.splice(comp.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("comp-tasks",comp);
  }
  this.parentElement.remove()
}

function del(div){
  let temp = {
    innerHTML:div.innerHTML,
    id : div.id,
    class : div.className
  }
  if (div.className === 'not-s'){
    notStarted.splice(notStarted.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("notStarted-tasks",notStarted);
  }else if (div.className === 'in-p'){
    inPro.splice(inPro.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("inPro-tasks",inPro);
  }else{
    comp.splice(comp.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("comp-tasks",comp);
  }
}

function add(div,parent){
  del(div);
  let divDate = {
    innerHTML:div.innerHTML,
    id : div.id,
    class : parent.id
  }
  if(parent.id === 'not-s'){
    notStarted1.push(divDate);
    divDate.class = "not-s";
    div.className = "not-s"
    let json = JSON.stringify(divDate);
    notStarted.push(json);
    localStorage.setItem("notStarted-tasks",notStarted);
  }else if (parent.id === 'in-p'){
    divDate.class = "in-p";
    div.className = "in-p"
    let json = JSON.stringify(divDate);
    inPro.push(json);
    localStorage.setItem("inPro-tasks",inPro);
  }else{
    divDate.class = "comp";
    div.className = "comp"
    let json = JSON.stringify(divDate);
    comp.push(json);
    localStorage.setItem("comp-tasks",comp);
  }
}

let divs = document.querySelectorAll(".tasks div");
let tasks = document.querySelectorAll(".tasks");

divs.forEach(function(element){
  element.addEventListener('dragstart',dragStart);
  element.addEventListener('dragstart',dragEnd);
})

let flag = false;
let drag = null;

tasks.forEach(function(element){
  element.addEventListener('drop',drop);
})

function dragStart(){
  console.log("drag start");
  drag = this;
}

function dragEnd(){
  console.log("drag End");
  // drag = null; 
}

tasks.forEach((container)=>{
  container.addEventListener('dragover',function(e){
    e.preventDefault();
  });
  container.addEventListener('dragleave',function(e){
    e.preventDefault();
  }); 
})

function drop(){
  console.log("drop");
  if (this.id !== drag.className){
    this.appendChild(drag);
    add(drag,drag.parentElement)
  }
}

