let username = document.getElementById("username");
let pass = document.getElementById("password");
let form = document.getElementById("signin");
let loginbutton = document.getElementById("show-login");
let Name = document.getElementById("name");
form.addEventListener("click", (event) => {
   
    // checking for  if the input fields are empty
    if (username.value === "" || pass.value === "" || Name.value === "") {
        alert("Please fill in the input fields.");
        return;
    }

    // check if user is already logged in
   

   
    fetch("https://63c69db7dcdc478e15c55914.mockapi.io/UsersAPI")
    .then(res => res.json())
    .then(data => {
        let user;
        for (let i = 0; i <= data.length - 1; i++) {
            if (data[i].username === username.value && data[i].password === pass.value && data[i].name === Name.value) {
                user = data[i];
                break;
            }
        }

        // check if user is found
        let loginstatus = JSON.parse(localStorage.getItem("loginstatus"));
        if (loginstatus && loginstatus.status) {
            alert("You are already logged in.");
            // return;
        }
        else {
            if (user) {
                localStorage.setItem("loginstatus", JSON.stringify({status: true, id: user.id}));
                if (user.admin) {
                    alert("Hi Admin Welcome Back...")
                    window.location.href = "admin.html";
                   
                } else {
                    alert("Hi User Welcome Back...")
                    window.location.href = "index.html";  
                }
            } else {
                alert("Incorrect username, password or name. Please try again.");
            }
        }
       
    });
});
