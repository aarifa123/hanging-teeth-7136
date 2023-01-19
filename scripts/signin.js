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
// for testing
// {
//     "createdAt": "2023-01-17T06:03:19.831Z",
//     "name": "Joan Schamberger",
//     "username": "Salvatore.Lemke",
//     "password": "9wUtrngGc4envLH",
//     "admin": false,
//     "cart": [],
//     "id": "1"
// },

// {
//     "createdAt": "2023-01-17T06:13:33.530Z",
//     "name": "Sonja Feil",
//     "username": "Shaina69",
//     "password": "ldszY69pq_bN1nZ",
//     "admin": true,
//     "cart": [],
//     "id": "3"
// },
// {
//     "createdAt": "2023-01-16T13:36:47.412Z",
//     "name": "Wayne Jacobson",
//     "username": "Ernesto.Wolff62",
//     "password": "dYpSBuktCy6pKDn",
//     "admin": true,
//     "cart": [],
//     "id": "4"
// },
// {
//     "createdAt": "2023-01-16T15:42:42.093Z",
//     "name": "Seth Bergstrom",
//     "username": "Idell96",
//     "password": "vvDWYftM6B9ZfGg",
//     "admin": false,
//     "cart": [],
//     "id": "5"
// },