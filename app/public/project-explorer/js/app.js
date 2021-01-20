
/*SignUP Part*/
const signPostReq = () => {
  let regForm = document.querySelector('#signupForm');
  console.log(regForm);
  
regForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    
      let firstname = document.querySelector('#signupForm input[name="firstName"]')
        .value
     let lastname = document.querySelector('#signupForm input[name="lastName"]')
        .value
      let email = document.querySelector('#signupForm input[name="email"]').value
     let password = document.querySelector('#signupForm input[name="password"]')
        .value
     let program = document.querySelector('#signupForm select[name="program"]')
        .value
      let matricNumber = document.querySelector(
        '#signupForm input[name="matricNumber"]'
      ).value
     let graduationYear = document.querySelector(
        '#signupForm select[name="graduationYear"]'
      ).value
    
      const data = {
        firstname,
        lastname,
        email,
        password,
        program,
        matricNumber,
        graduationYear
      }

    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
        console.log(response);
      })

      .then(data => {
        if (data.status==='ok') {
          console.log("Success:", data);
          let value = data.data.id;
          //console.log(uid);
          document.cookie = `uid=${value}; path=/; max-age=60*60*24*30;`;
          console.log(data);
          window.location.href = "index.html";
        } else {
          console.log(data.errors);
         
          let upDiv = document.createElement("div");
          upDiv.className = "alert alert-danger";
          let err_msg = "";
          for (let error of data.errors) {
            err_msg += `<br>${error}`;
            upDiv.innerHTML = err_msg;
            console.log(upDiv);
            regForm.prepend(upDiv);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
}


const updateHeader = () => {
  let cookie = document.cookie;
  console.log(cookie);
  let cookieArr1 = cookie.split(";");
  console.log(cookieArr1);
  const cookieFind = cookieArr1.find(el => el.startsWith("uid"));
  cookieValue = cookieFind.split("=")[1];
  console.log(cookieValue);
  if (cookieValue) {
    fetch(`http://localhost:4000/api/users/${cookieValue}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let loginButton = document.querySelector('a[href="/login"]');
        loginButton.setAttribute("id", "username");
        loginButton.textContent = `Hi, ${data.firstname}`;
        let signButton = document.querySelector('a[href="/signup"]');
        signButton.setAttribute("id", "logout");
        signButton.textContent = "Logout";
        const SignButtonCLicked = () => {
          let logingOut = document.getElementById("logout");
          let signingUp = document.getElementById("username");
          logingOut.addEventListener("click", e => {
            e.preventDefault();

            document.cookie =
              "uid=;path=/;expires = Thu, 01 Jan 1970 00:00:00 GMT";
            logingOut.textContent = "Sign Up";
            signingUp.textContent = "Login";

            window.location.href = "index.html";
          });
        };
        SignButtonCLicked();
      })
      .catch(error => {
        console.log(error);
      });
  }
};



/*Login Part*/

const LoginAction = () =>{ 
  let loginForm = document.getElementById('loginForm');
  

const LoginPostData = (e)=>{
   e.preventDefault();
  
    let email = document.querySelector('#loginForm input[name="email"]').value;
    let password = document.querySelector('#loginForm input[name="password"]').value;
    let loginData = {
      email,
      password
    }
    //console.log(loginData);
    
  let url = "http://localhost:4000/api/login";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
        body: JSON.stringify(loginData)
  
  }).then((response)=>response.json()).then((data)=>{
    console.log(data);
    if(data.status ==="ok"){
      
     let value = data.data.id;
     console.log(value);
      document.cookie = `uid=${value}; path=/; max-age=60*60*24*30;`;
      console.log(document.cookie);
      window.location.href="index.html";
    }
    else if(data.status==="error"){
     let upDiv = document.createElement('div');
     upDiv.className = "alert alert-danger";
     upDiv.textContent="Invalid email\//password";
     loginForm.prepend(upDiv);
     

    }
  }).catch((error)=>{
    console.log(error);
    
  })
}
loginForm.addEventListener('submit', LoginPostData);

}
  //Login Section.


  // create project section//
  const CreateProject = ()=>{
    let createProj = document.getElementById('createProjectForm');
    const createProjectAction = (e) =>{
      e.preventDefault();
      let name = document.querySelector('#createProjectForm input[name="name"]').value;
      let abstract = document.querySelector('#createProjectForm textArea[name="abstract"]').value;
      let authors = document.querySelector('#createProjectForm input[name="authors"]').value;
      let tags = document.querySelector('#createProjectForm input[name="tags"]').value;
      let createProjData = {
        name,
        abstract,
        authors,
        tags
      }
      let url ="http://localhost:4000/api/projects";
      fetch(url, {
        method:'POST',
        header:{
          "Content-Type": "application/json"
          },
        body:JSON.stringify(createProjData)

      }).then((response)=>response.json()).then(data=>{
        if(data.status ==='ok'){
          console.log(data);
        }
      }) 
    }

    createProj.addEventListener('submit',createProjectAction);


  }

 
window.onload = () => {
  
  
  let path = window.location.href;
  if(path==="http://localhost:4000/project-explorer/register.html"){
    signPostReq();
    updateHeader();
    
  
    
}else if (path==="http://localhost:4000/project-explorer/login.html"){
  //updateHeader();
  LoginAction();
 

}
else if(path==="http://localhost:4000/project-explorer/createProject.html"){
   CreateProject();
}
updateHeader();






 
  
};
