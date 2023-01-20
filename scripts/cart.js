let show=document.getElementById("popupp");
let btn = document.getElementById("btun");
let close =document.getElementById("close-btn");
btn.addEventListener(("click"), ()=>{
    show.style.display = "flex";


let inputbtns=document.querySelectorAll("#saveus>input");
let selectAddoption =''

console.log(inputbtns);

inputbtns.forEach((item, ind) =>{
console.log(item)
item.addEventListener("click", ()=>{
// alert(item.value)
// console.log(item)
selectAddoption=item.value
})
})
console.log(inputbtns);

let savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click", ()=>{
let pincpde=document.getElementById("code");
let fname=document.getElementById("F_name");
let lname = document.getElementById("l_Name");
alert (selectAddoption)
})
})
close.addEventListener("click", ()=>{
show.style.display="none";
})
