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

bts.forEach(function(element){
  element.onclick = function (){
  i++;
  if (i < 10){
  index = "0"+i;
  }else{
  index = i
  }
  let parent = this.parentElement.firstElementChild;
  console.log(parent)
  let div = document.createElement("div");
  div.draggable = true
  div.id = i;
  div.className = parent.id;
  div.innerHTML = `<input type="text" value="Task ${index}"> <button class = "edit"><i class="fa-solid fa-pen-to-square"></i></button> <button class = "delete"><i class="fa-solid fa-trash"></i></button>`;
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
let editbts = document.querySelectorAll("button[class = 'edit']");
let delbts = document.querySelectorAll("button[class = 'delete']");
let inputs = document.querySelectorAll(".parent >div .tasks div input");

editbts.forEach((element)=>{
  element.onclick = function(){
  let input = element.parentElement.firstElementChild
  // to set cursor at the end of the input field
  const end = input.value.length;
  input.setSelectionRange(end,end);
  input.focus();
  // -------------------------------------------
  console.log(element.parentElement);
  input.onchange = function(){
    val = input.value;
    console.log(val);
    let inner = `<input type="text" value="${val}"> <button class = "edit"><i class="fa-solid fa-pen-to-square"></i></button> <button class = "delete"><i class="fa-solid fa-trash"></i></button>`;
    // console.log(JSON.stringify(inner))
    let divDate = {
    innerHTML:inner,
    id : element.parentElement.id,
    class : element.parentElement.className
    }
    let json = JSON.stringify(divDate);
    if (element.parentElement.className === 'not-s'){
      for(let l = 0;l<notStarted.length;l++){
        if (JSON.parse(notStarted[l]).id === divDate.id){
          notStarted[l] = json;
          break;
        }
      }
      localStorage.setItem("notStarted-tasks",notStarted);
    }else if (element.parentElement.className === 'in-p'){
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
  }
})

delbts.forEach((element)=>{
  element.onclick = function(){
  let temp = {
    innerHTML:element.parentElement.innerHTML,
    id : element.parentElement.id,
    class : element.parentElement.className
  }
  if (element.parentElement.className === 'not-s'){
    notStarted.splice(notStarted.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("notStarted-tasks",notStarted);
  }else if (element.parentElement.className === 'in-p'){
    inPro.splice(inPro.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("inPro-tasks",inPro);
  }else{
    comp.splice(comp.indexOf(JSON.stringify(temp)), 1);
    localStorage.setItem("comp-tasks",comp);
  }
  element.parentElement.remove()
  }
})
function del(div,parent){
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
let flag = false;
console.log(divs)
console.log(tasks)
let drag = null;
divs.forEach(element=>{
  element.addEventListener('dragstart',function(){
  console.log("drag start");
  drag = element;
  })
  element.addEventListener('dragend',function(){
  console.log("drag end");
  drag = null;
  })
})
tasks.forEach((container)=>{
  container.addEventListener('dragover',function(e){
    e.preventDefault();
  });
  container.addEventListener('dragleave',function(e){
    e.preventDefault();
  });
    container.addEventListener('drop',function(){
    if (container.id !== drag.className){
      container.appendChild(drag);
      console.log("drop");
      add(drag,drag.parentElement)
    }
  });  
})
console.log(drag)