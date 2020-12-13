const DataModel = require("./data_model");

class User {
  constructor(
    id,
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.matricNumber = matricNumber;
    this.program = program;
    this.graduationYear = graduationYear;
  }

  getFullName() {
    return this.firstname + " " + this.lastname;
    return this;
  }
}

class Users extends DataModel {
  authenticate(email, password) {
    return this.data.some(
      obj => obj.email === email && obj.password === password
    );
  }

  getByEmail(email) {
    return this.data.find(obj => obj.email === email);
  }

  getByMatricNumber(matricNumber) {
    return this.data.find(obj => obj.matricNumber === matricNumber);
  }

  validate(obj) {
    let scanObjProps = this.data.every(
      el => el.email !== obj.email && el.matricNumber !== obj.matricNumber
    );
    if (
      scanObjProps &&
      Object.keys(obj).length !== 0 &&
      obj["password"].length >= 7
    ) {
      return true;
    }
    return false;
  }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
  User,
  Users
};

const UserWole = new User(102, "Wole", "Falasinu", "", "", "", "", "");
console.log(UserWole.getFullName());
