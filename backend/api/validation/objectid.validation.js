// check that an id is a valid mongo objectid

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

const objectidValidation = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

export default objectidValidation;
