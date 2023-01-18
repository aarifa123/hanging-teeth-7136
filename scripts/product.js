let url = `https://script.googleusercontent.com/macros/echo?user_content_key=OWlD6cVUch3T0JJGlJZ8Sn_t22Ex-Tsua61e923ppcpk-XDSHfuN0UX_rewLfHiQunbgthpetFKaGFnC-3IXsgdGDDeVqxijm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHxcMLpTY64uk7KipC0tzgwA-CtFtpiqwclv_-BaugaHnTtJ-mDJacNtMEAPHEdJ_WVXoXee0IvfvEQ97MH3u0hyVWwnNcSLjtz9Jw9Md8uu&lib=M8J7kzd7Zlw2ThwXavx9Z1SZBtr-bOvlX` ;

// console.log(url)

let filter = document.getElementById("SCategory");
let paginationhere = document.getElementById("pagination");
let renderhere = document.getElementById("renderhere");

let LSobj = {gender: "Men" , subcategory : "T-Shirts" }



let globaldata = [];
let filteredData = [];

       
    // return fetched;    

window.addEventListener("load",()=>{
    fetch(url)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data.data);
        filteredData = [...data.data];
        globaldata = [...data.data] ;
        let cardsperpage = 12 ;
        let numofpages = filteredData.length/cardsperpage;

        let reqData = filteredData.slice(0,cardsperpage);

        renderDOM(reqData)
        
        renderPagination(numofpages);


        let pgbuttons = document.querySelectorAll(".pagination-button");

        pgbuttons.forEach((el,ind)=>{
            el.addEventListener("click",(e)=>{
                // alert(`this was clicked ${e.target.dataset.id}`)
                let int = e.target.dataset.id * cardsperpage;
                let newdata = filteredData.slice(int,int+cardsperpage);

                renderDOM(newdata)

            })
        })
      
        // renderDOM(filteredData)
        
    })
})


function renderPagination(numOfpages){
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
}




function renderDOM(prodData){
    
    let arr = prodData.map((el,ind)=>{
        return renderDOMcards(el);
    })
   
    renderhere.innerHTML = `
        ${ arr.join("")}
    `
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
    
    return `
    <div class="renderCards" id="cards${id}" data-cards = ${id}>
        <img style="width:100% " src="${img1}" alt="err">
        <h4>${title}</h4>
        <p>₹ ${price}</p>
        <button class="cards-buttons" id="cardsbutton${id}" data-id="${id}" data-mainC="${mainC}" data-subC="${subC}" data-title="${title}" data-desc="${desc}" data-price="${price}" data-img1="${img1}" data-img2="${img2}" data-img3="${img3}" data-img4="${img4}">View Details</button>
    </div>
    `
}
// console.log(globaldata)