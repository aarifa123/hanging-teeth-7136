let username=document.getElementById("username")
let pass=document.getElementById("password")
let form=document.getElementById("signin")
form.addEventListener("click",()=>{
    // e.preventDefault()
    fetch("https://63c69db7dcdc478e15c55914.mockapi.io/UsersAPI")
    .then(res=>{
        return res.json()
    })

    .then(data=>{
        let user;
        for(let i=0;i<=data.length-1;i++){
            if(data[i].username===username.value&&data[i].password==pass.value){
                console.log("true")
                user=data[i]
                break;
            }
            else if (username.value === "" || pass.value === "") {
                alert("Please fill in the input fields.");
              }
              
           
        }
        console.log(user)
       if(user.admin===true){
        window.location.href = "admin.html";
       } 
       else if(user.admin===false){
        window.location.href = "index.html";  
       }
    })



})

