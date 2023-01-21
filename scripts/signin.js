let username = document.getElementById("username");
let pass = document.getElementById("password");
let form = document.getElementById("signin");
let loginbutton = document.getElementById("show-login");
let Name = document.getElementById("name");
form.addEventListener("click", (event) => {
   
    // checking for  if the input fields are empty
    if (username.value === "" || pass.value === "" || Name.value === "") {
        // alert("Please fill in the input fields.");
        Swal.fire('Please fill in the input fields.')

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
            // alert("You are already logged in.");
            Swal.fire('You are already logged in.')
            // return;
        }
        else {
            if (user) {
                localStorage.setItem("loginstatus", JSON.stringify({status: true, id: user.id}));
                if (user.admin) {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Hi Admin Welcome Back...',
                        showConfirmButton: false,
                        timer: 2000
                      })
                      setTimeout(() => {
                         window.location.href = "./admin.html";
                      }, 2000);
                   
                   
                } else {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Hi User Welcome Back...',
                        showConfirmButton: false,
                        timer: 2000
                      })
                      setTimeout(() => {
                         window.location.href = "./index.html";  
                      }, 2000);
                   
                }
            } else {
                // alert("Incorrect username, password or name. Please try again.");
                Swal.fire('Incorrect username, password or name. Please try again.')
            }
        }
       
    });
});
