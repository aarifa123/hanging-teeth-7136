
// let username=document.getElementById("username")
// let pass=document.getElementById("password")
// let form=document.getElementById("signin-form")
// form.addEventListener("submit",(e)=>{
//     e.preventDefault()
//     fetch("https://63c69db7dcdc478e15c55914.mockapi.io/UsersAPI")
//     .then(res=>{
//         return res.json()
//     })

//     .then(data=>{
//         let user;
//         for(let i=0;i<=data.length-1;i++){
//             if(data[i].username===username.value&&data[i].password==pass.value){
//                 console.log("true")
//                 user=data[i]
//                 break;
//             }
//             else{
//                 alert ("UserID or password not match")
//             }
           
//         }
//         console.log(user)
//        if(user.admin===true){
//         window.location.href = "./admin.html";
//        } 
//        else if(user.admin===false){
//         window.location.href = "./index.html";  
//        }
//     })



// })
let username=document.getElementById("username")
let pass=document.getElementById("password")
let form=document.getElementById("signin")
let loginbutton=document.getElementById("show-login")
let Name=document.getElementById("name")
form.addEventListener("click",()=>{
    // e.preventDefault()
    fetch("https://63c69db7dcdc478e15c55914.mockapi.io/UsersAPI")
    .then(res=>{
        return res.json()
    })

    .then(data=>{
        let user;
        for(let i=0;i<=data.length-1;i++){
            if(data[i].username===username.value&&data[i].password==pass.value&&data[i].name==Name.value){
            
                user=data[i]
                break;
            }
            else if (username.value === "" || pass.value === ""||Name.value==="") {
                alert("Please fill in the input fields.");
              }
              
           
        }
        console.log(user)
        if(user){
            localStorage.setItem("loginstatus", JSON.stringify({status: true, id: user.id}));
            if(user.admin){
                window.location.href = "admin.html";
            }else{
                window.location.href = "index.html";  
            }
        }
        
       if(user.admin===true){
localStorage.setItem("loginstatus", JSON.stringify({status: true, id: user.id}));

        window.location.href = "admin.html";
       
       } 
       else if(user.admin===false){
        localStorage.setItem("loginstatus", JSON.stringify({status: true, id: user.id}));
        window.location.href = "index.html";  
        
       }
    })


})
