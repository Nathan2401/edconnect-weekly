class DataModel {
  constructor() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    /*return this.data.find(obj => {
      if (obj.id === id) {
        return obj;
      } else {
        return null;
      }
    });*/
    let found = this.data.find(obj => obj.id === id);
    return found ? found : null;
  }
  getIndexOf(id) {
    return this.data.findIndex(el => el.id == id);
  }

  save(obj) {
    if (this.validate(obj) && typeof obj === "object" && obj !== null) {
      this.data.push(obj);
      return true;
    }
    return false;
  }

  update(obj, id) {
    /*const target = this.data.find(element => element.id == id);
    for (let dat of this.data) {
      if (JSON.stringify(dat) == JSON.stringify(target)) {
        for (let prop in dat) {
          dat[prop] = obj[prop];
          return true;
        }
        console.log("object not found");
        return false;
      }
    }
    */

    const index = this.getIndexOf(id);

    if (index > -1) {
      const temp = this.data[index];
      for (const property in obj) {
        temp[property] = obj[property];
      }

      this.data[index] = temp;
      return true;
    }

    console.log("object id not found");
    return false;
  }

  delete(id) {
    let idPosition = this.data.findIndex(obj => obj.id === id);

    if (idPosition < 0) {
      return false;
    }
    this.data.splice(idPosition, 1);

    return true;
  }

  // this method will be overriden in the sub classes
  validate(obj) {
    return false;
  }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;
