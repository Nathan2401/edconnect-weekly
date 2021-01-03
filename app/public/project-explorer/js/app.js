let signUpButton = document.getElementById("btn-1");
signUpButton.addEventListener("click", function(e) {
  e.preventDefault();

  const data = {
    firstName: document.getElementsByName("firstName")[0].value,
    lastName: document.querySelector('#signupForm input[name="lastName"]')
      .value,
    email: document.querySelector('#signupForm input[name="email"]').value,
    password: document.querySelector('#signupForm input[name="password"]')
      .value,
    program: document.querySelector('#signupForm select[name="program"]').value,
    matricNumber: document.querySelector(
      '#signupForm input[name="matricNumber"]'
    ).value,
    graduationYear: document.querySelector(
      '#signupForm select[name="graduationYear"]'
    ).value
  };

  fetch("http://localhost:4000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status == 200 || response.status == 201) {
        return response.json();
      }
    })

    .then(data => {
      console.log("Success:", data);
      let uid = "uid";
      let value = data.data.id;
      //console.log(uid);
      document.cookie = `${uid}= ${value}; path=/; expires=60*60*24*30;`;
      window.location.href = "index.html";
    })
    .catch(error => {
      //console.error("Error:", error);
      let RegForm = document.getElementById("signupForm");
      let upDiv = document.createElement("div");
      upDiv.className = "alert alert-danger";
      upDiv.textContent = `\n ${error.message}`;
      console.log(upDiv);
      RegForm.prepend(upDiv);
    });
});
let cookie = document.cookie;
let cookieArr1 = cookie.split("=");
let cookieValue = cookieArr1[1];
//let cookieValue = cookieArr1.replace(";", "");
console.log(cookieValue);
if (cookieValue) {
  fetch(`http://localhost:4000/api/users/${cookieValue}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}
let loginButton = document.querySelector('a[href="/login"]');
loginButton.addEventListener("click", () => {
  loginButton.textContent = `Hi ${data.firstName}`;
});
