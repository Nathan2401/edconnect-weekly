const DataModel = require("./data_model");

class Project {
  constructor(id, name, abstract, authors, tags, createdBy) {
    this.id = id;
    this.name = name;
    this.abstract = abstract;
    this.authors = authors;
    this.tags = tags;
    this.createdBy = createdBy;
  }
}

class Projects extends DataModel {
  validate(obj) {
    let emptProp = Object.values(obj).some(el => el === "");
    if (
      !emptProp &&
      Array.isArray(obj.authors) &&
      Array.isArray(obj.tags) &&
      obj.tags.length !== 0 &&
      obj.authors.length !== 0
    ) {
      return true;
    }
    return false;
  }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
  Project,
  Projects
};
