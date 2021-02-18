

/*SignUP Part*/
/*signup function*/
const signPostReq = () => {
  const progGet = (programs) =>{
    return programs.map(prog=>"<option value='"+prog+"'>"+prog+"<option>").join('');

  }
  const gradGet = (grad) =>{
    return grad.map(gra=>"<option value ='"+gra+"'>"+gra+"</option>").join('');

  }
  
  const getPrograms = ()=>{
    fetch('/api/programs').then(response=>response.json()).then(data=>{
      let selectProgCont =  document.getElementsByName('program')[0]
      let progItem = progGet(data);
       selectProgCont.insertAdjacentHTML('beforeend',progItem);
       console.log(selectProgCont);
       return selectProgCont;
    
    
    })
  }
  //API GET Request for Programs

  const getGrad = ()=>{
    fetch('/api/graduationYears').then(response=>response.json()).then(data=>{

    let selectGradCont =  document.getElementsByName('graduationYear')[0]
   let gradItem = gradGet(data);
    selectGradCont.insertAdjacentHTML('beforeend',gradItem);
    console.log(selectGradCont);
    return selectGradCont;
    
    })
  }
  //API GET request for Graduation Years
  getPrograms();
  getGrad();
  //invoking the functions for the graduation year and the programs
  let regForm = document.querySelector('#signupForm');
  
  
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

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
      
      })

      .then(data => {
        if (data.status==='ok') {
          
          let value = data.data.id;
          
          document.cookie = `uid=${value};path=/;max-age=${60*60*24*30};`;
          
          window.location.href = "index.html";
        } else {
         
         
          let upDiv = document.createElement("div");
          upDiv.className = "alert alert-danger";
          let joinedErrorData = data.errors.join('<br>');
          let errMsg = "";
          for(let error of joinedErrorData){
            errMsg += error;
            upDiv.innerHTML = errMsg;
            
            
            

          }
          regForm.prepend(upDiv);
          
        }
      })
      .catch(error => {
        
      });
  });
}

//Api post request for register.html

/*end of  register.html */

/**Beginning of update Navbar */

const updateHeader = () => {
  let cookie = document.cookie;
  let cookieArr1 = cookie.split(";");

  const cookieFind = cookieArr1.find(el => el.trim().startsWith("uid"));
  console.log(cookieFind);
  if(cookieFind){
    cookieValue = cookieFind.split("=")[1];
    console.log(cookieValue);

    //Fetching Cookie
  if (cookieValue) {
    fetch(`/api/users/${cookieValue}`)
      .then(response => response.json())
      .then(data => {
        
        let loginButton = document.querySelector('a[href="login.html"]');
       // loginButton.setAttribute("id", "username");
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
        
      });
  }

  }
 
  
};

//Api GET request to update Navbar.

/*end of update Navbar */

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
    
    
  let url = "/api/login";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
        body: JSON.stringify(loginData)
  
  }).then((response)=>response.json()).then((data)=>{
    
    if(data.status ==="ok"){
      
     let value = data.data.id;
     
      document.cookie = `uid=${value}; path=/; max-age=${60*60*24*30};`;

      window.location.href="index.html";
    }
    else if(data.status==="error"){
     let upDiv = document.createElement('div');
     upDiv.className = "alert alert-danger";
     upDiv.textContent="Invalid email/password";
     loginForm.prepend(upDiv);
     

    }
  }).catch((error)=>{

    
  })
  //Api POST request of login page.
}
loginForm.addEventListener('submit', LoginPostData);

}
  /* end of Login Section */


  /* create project section*/
  
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
      
      let url ="/api/projects";
      fetch(url, {
        method:'POST',
        headers:{
          "Content-Type": "application/json"
          },
        body:JSON.stringify(createProjData)

      }).then((response)=>response.json()).then(data=>{
        if(data.status ==='ok'){
         
          window.location.href="index.html";
        }
        else{
         let upDiv = document.createElement("div");
         upDiv.className = "alert alert-danger";
         let errData = data.errors.join('<br>');
         for(let err in errData){
           upDiv.innerHTML += err ;
          
           createProj.append(upDiv);
           

         }
         

        }
      }) .catch((error)=>{
  
      })

      //Api POST request for the createProject page
   
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
     card.className = "col-lg-3 mb-3"; card.innerHTML = ` <div class='min-text-line border border-muted rounded p-3 mb-3 hoverable h-100'> <h5 class='text-primary text-capitalize'>${name}</h5> <h6 class='text-secondary text-capitalize'>${authorsList}</h6> <p class='small'>${abstract}</p> <p class='small font-weight-bold text-primary'>${tagsList}</p> </div>`; card.addEventListener('click', () => { window.location.href = `${window.location.origin}/project-explorer/viewproject.html?id=${id}` }) 
    return card;}

    const projectCards = document.getElementById('projectCardContainer');
    
    let url = `/api/projects/`;
    fetch(url).then(response =>response.json()).then(data =>
      {data.slice(0,4).map(dat=>{
        let item = createProjectCard(dat); 
        projectCards.appendChild(item);
      })
      
      
      }).catch(err=>{

      }

        )
  //Api GET request to load project into index page.
  }

  /* end of Load Project section*/


  /* View Project */

  const viewProject = ()=>{
    let url = new URL(window.location.href);
    let params =new URLSearchParams(url.search);
    let id = params.get('id');
//getting id params from the url
    const linkToDom = (project) =>{
      const{createdBy,name, abstract, authors,tags} = project;
      
    let tagsList = tags.map(e=>`#${e}`).join(' ').replace(',',"");
      let projName = document.getElementById('project_name');
      projName.textContent = name;
      let projAbstract = document.getElementById('project_abstract'); 
      projAbstract.firstChild.textContent = abstract;
      let projAuthors = document.getElementById('project_authors');
      let projAuthorsChild = projAuthors.children[1];
     
      for( let i=0;i<projAuthorsChild.children.length;i++){
      projAuthorsChild.children[i].children[0].textContent =authors[i];
       let projTags = document.getElementById('project_tags').children[0].children[0];
       projTags.textContent = tagsList;
        
        
      }
      const createBy=(creator)=>{
        const{firstname,lastname} = creator;
        let projAuthor = document.getElementById('project_author');
    
        projAuthor.children[1].textContent = `${firstname} ${lastname}`;

      }
     const getCreateByDat = ()=> {
        let fetchCreateUrl =`/api/users/${createdBy}`
        fetch(fetchCreateUrl).then(response=>response.json()).then(data=>{
         
          createBy(data);
        })
        
        
    
       }
       getCreateByDat();
    
      
    }
    
   
   

 const getViewProjData = () =>{
    let fetchUrl= `/api/projects/${id}`;
    fetch(fetchUrl).then(response=>response.json()).then(data=>{
      
      linkToDom(data);
     
    })

  }
 
 
    getViewProjData();

  
 
   

  

    

  }

  /*end of view project page */

 
window.onload = () => {
  
  
  let path = window.location.href.toLowerCase();
 
  if(path.includes("register.html")){
    signPostReq();
    updateHeader();
    
  
    
}else if (path.includes("login.html")){
  updateHeader();
  LoginAction();
 

}
else if(path.includes('createproject.html')){

  let cookieArr1 = document.cookie.split(';')
    let cookieFind = cookieArr1.find(el=>el.trim().startsWith('uid'));
    if(cookieFind){
    console.log(cookieFind);
    let cookieVal = cookieFind.split('=')[1];
    console.log(cookieVal);
    
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
