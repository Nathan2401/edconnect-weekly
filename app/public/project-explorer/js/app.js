

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
          document.cookie = `uid=${value}; path=/; max-age=${60*60*24*30};`;
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
  if(cookieFind){
    cookieValue = cookieFind.split("=")[1];
    console.log(cookieValue);
  if (cookieValue) {
    fetch(`http://localhost:4000/api/users/${cookieValue}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let loginButton = document.querySelector('a[href="login.html"]');
        loginButton.setAttribute("id", "username");
        loginButton.textContent = `Hi, ${data.firstname}`;
        let signButton = document.querySelector('a[href="register.html"]');
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
      document.cookie = `uid=${value}; path=/; max-age=${60*60*24*30};`;
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
      let authors = document.querySelector('#createProjectForm input[name="authors"]').value.split(',').filter(el=>el!=="").map(el=>el.trim());
      let tags = document.querySelector('#createProjectForm input[name="tags"]').value.split('#').filter(el=>el!=="").map(el=>el.trim());
      
      let createProjData = {
        name,
        abstract,
        authors,
        tags
      }
      
      let url ="http://localhost:4000/api/projects";
      fetch(url, {
        method:'POST',
        headers:{
          "Content-Type": "application/json"
          },
        body:JSON.stringify(createProjData)

      }).then((response)=>response.json()).then(data=>{
        if(data.status ==='ok'){
          console.log(data);
          window.location.href="index.html";
        }
        else{
         let upDiv = document.createElement("div");
         upDiv.className = "alert alert-danger";
         let errData = data.errors.join('<br>');
         for(let err in errData){
           upDiv.innerHTML += err ;
           console.log(upDiv);
           createProj.append(upDiv);
           

         }
         

        }
      }) .catch((error)=>{
        console.log(error);
      })
   
    }

    createProj.addEventListener('submit',createProjectAction);


  }

  /**section LoadProject on index.html page */

  const loadProj = ()=>{
    const createProjectCard = (project) => { 
    const {name,abstract,id,tags,authors} = project ;
    let authorsList = authors.join(',');
    let tagsList = tags.map(e=>`#${e}`).join(' ').replace(',',"");
    const card = document.createElement('div'); 
     card.className = "col-lg-3 mb-3"; card.innerHTML = ` <div class='min-text-line border border-muted rounded p-3 mb-3 hoverable h-100'> <h5 class='text-primary text-capitalize'>${name}</h5> <h6 class='text-secondary text-capitalize'>${authorsList}</h6> <p class='small'>${abstract}</p> <p class='small font-weight-bold text-primary'>${tagsList}</p> </div>`; card.addEventListener('click', () => { window.location.href = `${window.location.origin}/project-explorer/viewProject.html?id=${id}` }) 
    return card;}

    const projectCards = document.getElementById('projectCardContainer');
    
    let url = `http://localhost:4000/api/projects/`;
    fetch(url).then(response =>response.json()).then(data =>
      {data.slice(0,4).map(dat=>{
        let item = createProjectCard(dat); 
        projectCards.appendChild(item);
      })
      
      
      }).catch(err=>console.log(err));
  }

  /* end of Load Project section*/


  /* View Project */

  const viewProject = ()=>{
    let url = new URL(window.location.href);
    let params =new URLSearchParams(url.search);
    let id = params.get('id');

    const linkToDom = (project) =>{
      const{createdBy,name, abstract, authors,tags} = project;
      //let authorsList = authors.join(',');
      console.log(authors);
    let tagsList = tags.map(e=>`#${e}`).join(' ').replace(',',"");
      let projName = document.getElementById('project_name');
      projName.textContent = name;
      let projAbstract = document.getElementById('project_abstract'); 
      projAbstract.firstChild.textContent = abstract;
      let projAuthors = document.getElementById('project_authors');
      let projAuthorsChild = projAuthors.children[1];
     // console.log(projAuthorsChild);
      console.log(projAuthorsChild.children);
      for( let i=0;i<projAuthorsChild.children.length;i++){
      projAuthorsChild.children[i].children[0].textContent =authors[i];
       let projTags = document.getElementById('project_tags').children[0].children[0];
       projTags.textContent = tagsList;
        
        
      }
      const createBy=(creator)=>{
        const{firstname,lastname} = creator;
        let projAuthor = document.getElementById('project_author');
        console.log(projAuthor);
        projAuthor.children[1].textContent = `${firstname} ${lastname}`;

      }
     const getCreateByDat = ()=> {
        let fetchCreateUrl =`http://localhost:4000/api/users/${createdBy}`
        fetch(fetchCreateUrl).then(response=>response.json()).then(data=>{
         // console.log(id);
          createBy(data);
        })
        
        
    
       }
       getCreateByDat();
    
      
    }
    
   
   

 const getViewProjData = () =>{
    let fetchUrl= `http://localhost:4000/api/projects/${id}`;
    fetch(fetchUrl).then(response=>response.json()).then(data=>{
      console.log(data);
      linkToDom(data);
     // console.log(linkToDom(data));
    })

  }
 
 
    getViewProjData();

  
 
   

  

    

  }

 
window.onload = () => {
  
  
  let path = window.location.href.toLowerCase();
  console.log(path);
  if(path==="http://localhost:4000/project-explorer/register.html"){
    signPostReq();
    updateHeader();
    
  
    
}else if (path==="http://localhost:4000/project-explorer/login.html"){
  //updateHeader();
  LoginAction();
 

}
else if(path.includes('createproject.html')){

  let cookieArr1 = document.cookie.split(';')
    let cookieFind = cookieArr1.find(el=>el.startsWith('uid'));
    console.log(cookieFind);
    let cookieVal = cookieFind.split('=')[1];
    console.log(cookieVal);
    if(cookieVal){
      updateHeader();
   CreateProject();
  }
  else{
    window.location.href ="login.html" ;
  }
}
else if(path.includes("index.html")){
  updateHeader();
  loadProj();
}
else if(path.includes('viewproject.html')){
  updateHeader();
  viewProject();
}
updateHeader();






 
  
};
