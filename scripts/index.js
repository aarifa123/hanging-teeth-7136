function redirecttohomepage(){
  location.href = "./index.html"
}

let dropDown =document.querySelectorAll(".drop-down>li>a");
//console.log(dropDown);
dropDown.forEach((item)=>{
  item.addEventListener("click",(e)=>{
    e.preventDefault();
   // console.log(e.target.dataset.gend,e.target.dataset.subc)
   let obj={};
   obj.gender=e.target.dataset.gend;
   obj.subCat=e.target.dataset.subc;

   localStorage.setItem("productInfo",JSON.stringify(obj));
   
   window.location.href = "/products.html"
  })
   
})
// let data=fetch("");


let inputText= document.getElementById("search")



fetch("https://script.googleusercontent.com/macros/echo?user_content_key=OWlD6cVUch3T0JJGlJZ8Sn_t22Ex-Tsua61e923ppcpk-XDSHfuN0UX_rewLfHiQunbgthpetFKaGFnC-3IXsgdGDDeVqxijm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHxcMLpTY64uk7KipC0tzgwA-CtFtpiqwclv_-BaugaHnTtJ-mDJacNtMEAPHEdJ_WVXoXee0IvfvEQ97MH3u0hyVWwnNcSLjtz9Jw9Md8uu&lib=M8J7kzd7Zlw2ThwXavx9Z1SZBtr-bOvlX")
.then((res)=>{
    return res.json();
})
.then((data)=>{
    let req=data.data;
    console.log(req);
    localStorage.setItem("indextoproduct",JSON.stringify(data.data));
    inputText.addEventListener("change",()=>{
       let searchVal=inputText.value;
       console.log(searchVal)
       let newSearch=req.filter(item=>{
       // console.log(item.MainCategory)
         let str=item.Title.toLowerCase();
        // console.log(str)
        if(str.includes(searchVal.toLowerCase()))
         { //console.log(item);

        return true;
         // console.log(localStorage.getItem("searchProduct",JSON.stringify(item)))
        
         }
       })

       //console.log(newSearch)
       let obj={};
       obj.gender="search";
       obj.subCat=null;
       localStorage.setItem("productInfo",JSON.stringify(obj));
       localStorage.setItem("searchProduct",JSON.stringify(newSearch));
       window.location.href = "/products.html"
      
        
   })
})
