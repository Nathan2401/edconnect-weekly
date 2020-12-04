class DataModel {
  constructor() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    return this.data.find(obj => {
      if (obj.id === id) {
        return obj;
      }
      return null;
    });
  }

  save(obj) {
    if (this.validate(obj)) {
      this.data.push(obj);
      return true;
    }
    return false;
  }

  update(obj, id) {
    for (let element of this.data) {
      let index = this.data.indexOf(element) == id;
      if (index) {
        for (let prop in element) {
          element[prop] = obj[prop];
          return true;
        }

        console.log("object not found");
        return false;
      }
    }
  }
  delete(id) {
    let idPosition = this.data.findIndex(obj => obj.id === id);
    return this.data.splice(idPosition, 1);
  }

  // this method will be overriden in the sub classes
  validate(obj) {
    return true;
  }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;
