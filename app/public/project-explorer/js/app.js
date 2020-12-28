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
      if (response.status == 200 || 201) {
        return response.json();
        document.cookie = `${uid}= ${data}.${data}.${id}; path=/project-explorer; expires=60*60*24*30;`;
      }
    })

    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
