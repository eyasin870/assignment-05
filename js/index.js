document.getElementById("login-btn").addEventListener("click",()=>{
    const username = getValueFromInput("input-user-name");
    const pass = getValueFromInput("input-password");
    if(username === "admin"  && pass === "admin123" ){
        alert("login success")
        window.location.assign("/home.html")



    }
    else if( pass !=="admin123"){
        alert("Invalid Password")
        return

    }
    else if( username !=="admin"){
        alert("Invalid Username")
        return

    }
    else{
      alert("invalid user name");
      return

    }
   
})
function getValueFromInput(id){
    const input = document.getElementById(id);
    const value = input.value;
    return value

}