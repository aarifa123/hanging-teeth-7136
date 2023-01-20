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

let userDataURL = `https://63c69db7dcdc478e15c55914.mockapi.io/UsersAPI/`

let loginStatus = JSON.parse(localStorage.getItem("loginstatus")) || {status:true , id:1};


console.log(loginStatus.status)
let bodydiv =  document.querySelector(".eagle");
let noprod = document.querySelector("#noProds>h2")
let appendCart = document.getElementById("appendCart");

window.addEventListener("load",()=>{
    if(loginStatus.status===false){
        bodydiv.style.display = "none"
        
        // console.log( typeof noprod)
        noprod.innerText = "Please Login First" ; 
        // console.log(bodydiv)
    }else{
        let userId = loginStatus.id ;
    
        fetch(`${userDataURL}${userId}`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            let ourCart = data.cart ; 
            console.log(ourCart)
            if(ourCart.length === 0){
                bodydiv.style.display = "none"
                noprod.innerText = "No Products in cart" ;
            }else{
                bodydiv.style.display = "flex"
                    
                renderDOMcart(ourCart)
            }
        })
    }
    
})



function renderDOMcart (data){
    let numitems = document.getElementById("numOfitems");
    numitems.innerText = data.length ; 


    
    let arr = data.map((ele,ind)=>{
        return renderCartCards(ele);
    })

    let orderVal = document.getElementById("orderVal") ; 
    let prodDiscount = document.getElementById("prodDiscount") ;
    let totalAmt = document.getElementById("totalAmt") ;
    let prodDis = document.getElementById("prodDis");

    appendCart.innerHTML = `
        ${arr.join("")}
    `
    let sizeSelect = document.querySelectorAll(".quantity");

    sizeSelect.forEach((ele,ind)=>{
        ele.addEventListener("change",(e)=>{
            // alert(ele.value)
            let sum = [];
            for(item of sizeSelect){
                sum.push(Number(item.value)) ; 
            }
            
            let prod = 0; 
            data.forEach((el,inde)=>{
                prod += el.price * sum[inde];
            })

            // alert(prod)
            orderVal.innerText = prod  ;
            totalAmt.innerText = prod - Number(prodDiscount.innerText); 
            prodDis.innerText = Number(prodDiscount.innerText); 
        })
    })
    
    let prod = 0

    data.forEach((el,inde)=>{
        prod += el.price * sizeSelect[inde].value ;
    })
    orderVal.innerText = prod  ;
    totalAmt.innerText = prod - Number(prodDiscount.innerText); 
    prodDis.innerText = Number(prodDiscount.innerText); 

}

// function(data,)

function renderCartCards (item){
    
    // item 

    let id = item.id;
    let title  = item.title;
    let img = item.image;
    let price = item.price;
    let size = item.size;
    let col = item.color;

    return `<div class="render-cart"> 
                <div id="img">
                    <img  class="cart-img" src="${img}" alt="aeimg">
                </div>
                <div class="userProds">
                    <h5>${title}</h5>
                    <p>₹ ${price}</p>
                    <p>Color: ${col}</p>
                    <select name="size" class="size-select" id="size${id} data-size="${size}">
                        <option value="${size}">${size}</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    <select name="qunty" class="quantity"  id="quant${id}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="close-button" data-id = "${id} data-size="${size}"><button class="times-close">&times;</button></div>
            </div>
`
}