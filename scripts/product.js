let url = `https://script.googleusercontent.com/macros/echo?user_content_key=OWlD6cVUch3T0JJGlJZ8Sn_t22Ex-Tsua61e923ppcpk-XDSHfuN0UX_rewLfHiQunbgthpetFKaGFnC-3IXsgdGDDeVqxijm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHxcMLpTY64uk7KipC0tzgwA-CtFtpiqwclv_-BaugaHnTtJ-mDJacNtMEAPHEdJ_WVXoXee0IvfvEQ97MH3u0hyVWwnNcSLjtz9Jw9Md8uu&lib=M8J7kzd7Zlw2ThwXavx9Z1SZBtr-bOvlX` ;

// console.log(url)

let filter = document.getElementById("SCategory");
let paginationhere = document.getElementById("pagination");
let renderhere = document.getElementById("renderhere");
let genderSort = document.getElementById("gendersort");
let subC_sort = document.getElementById("SCategory");
let priceSort = document.getElementById("sortbyprice")
let clearFilters = document.getElementById("clearFilters");
let cardsperpage = 12 ;

// let LSobj = {gender: "Men" , subcategory : "T-Shirts" }


let globaldata = [];
let filteredData = [];
let sortingCopy = [];


//============================================= event listners start here =================================================//  

window.addEventListener("load",()=>{
    let indexdata = JSON.parse(localStorage.getItem("indextoproduct"))||[];
    filteredData = [...indexdata];
    globaldata = [...indexdata] ;
    sortingCopy = [...indexdata] ; 
    let searchData=null;
    
    let LSdata = JSON.parse(localStorage.getItem("productInfo")) ;

   if(LSdata.gender== "search"){

   
       let LSSearch=JSON.parse(localStorage.getItem("searchProduct")) ;
       console.log(LSSearch)
       renderDOM(LSSearch.slice(0,cardsperpage))
    
         renderPagination(LSSearch.length/cardsperpage,LSSearch);
         localStorage.setItem("productInfo",JSON.stringify({gender:"",subCat:""}))
   }
   else{

    let reqData = filteredData.filter((element,index)=>{
        if(LSdata.gender === "" && LSdata.subCat === "Jeans"){
            if(element.SubCategory === "Jeans"){
                return true ;
            }
        }else if(LSdata.gender === "Winterwear"){
            if(element.SubCategory === LSdata.subCat){
                return true;
            }
        }else if(LSdata.gender === "Men"){
            if(element.SubCategory === LSdata.subCat && element.MainCategory === "Men"){
                return true;
            }
        }else if(LSdata.gender === "Women"){
            if(element.SubCategory === LSdata.subCat && element.MainCategory === "Women"){
                return true;
            }
        }

    })
    sortingCopy = reqData;
    let numofpages = reqData.length/cardsperpage;

    // let tobj = localStorage.getItem("")

    // reqData = globaldata.filter((rl,ind)=>{
    //     if(tobj.gender === el.gender && tobj.subcategory = el.subcategory){
    //         return true ;
    //     }
    // })

    renderDOM(reqData.slice(0,cardsperpage))
    
    renderPagination(numofpages,reqData);

}
    
    // console.log(filteredData)
   
    // renderDOM(filteredData)
    
})


genderSort.addEventListener("change", ()=>{
    // console.log(genderSort.value)
    let subcval = subC_sort.value ;
    let priceval = priceSort.value ; 
    let genderval = genderSort.value;
    let filtered = filteredData.filter((elem,inde)=>{
        // console.log(priceval=="")
        if(elem.MainCategory === genderval){
            if(subcval == ""){
              return true;
            }else{
                    if(elem.SubCategory=== subcval){
                        return true ; 
                    }
               
            }
        }
    })
    
    if(genderval === ""){
        filtered = sortingCopy ;
    }
    
    if(priceval === "LH" ){
        filtered.sort((a,b)=>{return a.Price - b.Price });
    }else if(priceval === "HL" ){
        filtered.sort((a,b)=>{return b.Price - a.Price });
    }
    
    renderDOM(filtered.slice(0,cardsperpage));
    renderPagination(filtered.length/cardsperpage , filtered);
    sortingCopy = filtered ; 
})


subC_sort.addEventListener("change",()=>{
    let subcval = subC_sort.value ;
    let priceval = priceSort.value ; 
    let genderval = genderSort.value;
    let filtered = filteredData.filter((eleme,inde)=>{
        if(eleme.SubCategory === subcval){
            if(genderval===""){
                return true;
            }else if(eleme.MainCategory === genderval){
                return true ; 
            }
        }
    })

    if(subcval===""){
        filtered = sortingCopy ;
    }

    if(priceval === "LH" ){
        filtered.sort((a,b)=>{return a.Price - b.Price });
    }else if(priceval === "HL" ){
        filtered.sort((a,b)=>{return b.Price - a.Price });
    }

    renderDOM(filtered.slice(0,cardsperpage));
    renderPagination(filtered.length/cardsperpage , filtered);
    sortingCopy = filtered ; 
})

priceSort.addEventListener("change",()=>{
    // let subcval = subC_sort.value ;
    let priceval = priceSort.value ; 
    // let genderval = genderSort.value;

   
    if(priceval === "LH" ){
        sortingCopy.sort((a,b)=>{return a.Price - b.Price });
        // sortArr = sortingCopy;
    }else if(priceval === "HL" ){
        sortingCopy.sort((a,b)=>{return b.Price - a.Price });
        // sortArr = sortingCopy;
    }
    
    renderDOM(sortingCopy.slice(0,cardsperpage));
    console.log(sortingCopy)
    renderPagination(sortingCopy.length/cardsperpage , sortingCopy);
    
})

clearFilters.addEventListener("click",()=>{
    filteredData = globaldata ;
    sortingCopy = globaldata ; 
    subC_sort.value  = "" ;
    priceSort.value = "" ;
    genderSort.value = "" ;
            
    renderDOM(filteredData.slice(0,cardsperpage))
    let num = filteredData.length/cardsperpage;
    renderPagination(num,filteredData);
    // sortingCopy = filteredData ; 
})



//========================================== functions start here ===================================================//

function renderPagination(numOfpages,prod){
    let arr = [];

    for(let i = 0 ; i<numOfpages ; i++){
        arr.push(createbtn (i+1));
    }
    
    paginationhere.innerHTML = `
       ${arr.join("")}
    `

    function createbtn (num){
        return `
        <button class="pagination-button" data-id="${num-1}">${num}</button>
        `
    }
    let pgbuttons = document.querySelectorAll(".pagination-button");

    pgbuttons.forEach((el,ind)=>{
        el.addEventListener("click",(e)=>{
            // alert(`this was clicked ${e.target.dataset.id}`)
            let int = e.target.dataset.id * cardsperpage;
            let newdata = prod.slice(int,int+cardsperpage);

            renderDOM(newdata)

        })
    })
  
}




function renderDOM(prodData){
    //  sortingCopy = [...prodData];
    let arr = prodData.map((el,ind)=>{
        return renderDOMcards(el);
    })
   
    renderhere.innerHTML = `
        ${ arr.join("")}
    `

    let btncards = document.querySelectorAll(".cards-buttons");

    btncards.forEach((ele,ind)=>{
        ele.addEventListener("click",(e)=>{
            // alert(`The type is ${e.target.dataset.mainc} & id is ${e.target.dataset.id}`)
            // console.log(e.target.dataset.mainc);
            let recentVisited = JSON.parse(localStorage.getItem("recentStack")) || [];

            let singleprod = {};

            singleprod.__id  = e.target.dataset.id;
            singleprod.Title  = e.target.dataset.title;
            singleprod.Price  = e.target.dataset.price;
            singleprod.MainCategory  = e.target.dataset.mainc;
            singleprod.SubCategory  = e.target.dataset.subc;
            singleprod.Description  = e.target.dataset.desc;
            singleprod.Image1  = e.target.dataset.img1;
            singleprod.Image2  = e.target.dataset.img2;
            singleprod.Image3  = e.target.dataset.img3;
            singleprod.Image4  = e.target.dataset.img4;
            singleprod.color = e.target.dataset.col;
            

            if(recentVisited.length===0){
                recentVisited.push(singleprod);
                localStorage.setItem("recentStack",JSON.stringify(recentVisited));
            }else if(recentVisited.length<15){
                let int =  0;
                let c = 0 ;
                recentVisited.forEach((eleme,inde)=>{
                    if(eleme.__id === singleprod.__id){
                        int = inde;
                        c++;
                    }
                })

                if(c===0){
                    recentVisited.push(singleprod);
                    localStorage.setItem("recentStack",JSON.stringify(recentVisited));
                }else{
                    recentVisited.splice(int,1);
                    recentVisited.push(singleprod);
                    localStorage.setItem("recentStack",JSON.stringify(recentVisited));
                }

            }else{
                
                let int =  0;
                let c = 0 ;
                recentVisited.forEach((eleme,inde)=>{
                    if(eleme.__id === singleprod.__id){
                        int = inde;
                        c++;
                    }
                })

                if(c===0){
                    console.log("hehe")
                    recentVisited.shift();
                    recentVisited.push(singleprod);
                    localStorage.setItem("recentStack",JSON.stringify(recentVisited));
                }else{
                    recentVisited.splice(int,1);
                    recentVisited.shift();
                    recentVisited.push(singleprod);
                    localStorage.setItem("recentStack",JSON.stringify(recentVisited));
                }

                
            }

            // console.log(singleprod)
            localStorage.setItem("singleProduct",JSON.stringify(singleprod));
                
            window.location.href = "/singleProductPage.html"
        })
    })

}



function renderDOMcards (item){
    // let obj = {};
    let id = item.__id ;
    let title = item.Title ; 
    let price = item.Price;
    let mainC = item.MainCategory;
    let subC = item.SubCategory;
    let desc = item.Description;
    let img1 = item.Image1
    let img2 = item.Image2
    let img3 = item.Image3
    let img4 = item.Image4
    let color = item.Color;
    return `
    <div class="renderCards" id="cards${id}" data-cards = ${id}>
        <img style="width:100% " src="${img1}" alt="err">
        <h4>${title}</h4>
        <p>₹ ${price}</p>
        <button class="cards-buttons" id="cardsbutton${id}" data-id="${id}" data-mainc="${mainC}" data-subc="${subC}" data-title="${title}" data-desc="${desc}" data-price="${price}" data-img1="${img1}" data-img2="${img2}" data-col="${color}" data-img3="${img3}" data-img4="${img4}">View Details</button>
    </div>
    `
}
// console.log(globaldata)