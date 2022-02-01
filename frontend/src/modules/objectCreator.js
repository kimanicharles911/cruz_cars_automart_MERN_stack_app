exports.moduleFunc = (receivedObject) => {
  const newObject = {
    "modelSpec": receivedObject.modelSpec,
    "makeSpec": receivedObject.makeSpec,
    "sellingPrice": receivedObject.sellingPrice,
    "mileage": receivedObject.mileage,
    "photo": receivedObject.photo,
    "registrationNumber": receivedObject.registrationNumber,
    "owner": receivedObject.owner,
    "address": receivedObject.address
  };
  
  return newObject;
};
/* 
  * I created a module function that creates an object with similar keys to those of the API to store the respective values which are taken by axios that updates the API with the new project details.
  * It returns the object.
*/