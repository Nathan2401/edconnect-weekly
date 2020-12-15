let firstName = document.querySelector("input[name=firstName]").value;
let lastName = document.querySelector('#signupForm input[name="lastName"]')
  .value;
let email = document.querySelector('#signupForm input[name="email"]').value;
let password = document.querySelector('#signupForm input[name="password"]')
  .value;
let program = document.querySelector('#signupForm select[name="program"]')
  .value;
let matricNumber = document.querySelector(
  '#signupForm input[name="matricNumber"]'
).value;
let graduationYear = document.querySelector(
  '#signupForm select[name="graduationYear"]'
).value;

let contData = {
  firstName,
  lastName,
  email,
  password,
  program,
  matricNumber,
  graduationYear
};
let signUpButton = document.getElementById("btn-1");
signUpButton.addEventListener("click", function(e) {
  e.preventDefault();
  console.log(firstName);
  console.log(contData);
});
