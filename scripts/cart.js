let show = document.getElementById("popupp");
    let btn = document.getElementById("btun");
    let close = document.getElementById("close-btn");
    btn.addEventListener(("click"),()=>{
            show.style.display = "flex";    
    })
    close.addEventListener("click",()=>{
        show.style.display = "none";
    })