exports.moduleFunc = (receivedObject) => {
  const formDataObj = new FormData();
  formDataObj.append("modelSpec", receivedObject.modelSpec);
  formDataObj.append("makeSpec", receivedObject.makeSpec);
  formDataObj.append("sellingPrice", receivedObject.sellingPrice);
  formDataObj.append("mileage", receivedObject.mileage);
  formDataObj.append("photo", receivedObject.photo);
  formDataObj.append("registrationNumber", receivedObject.registrationNumber);
  formDataObj.append("owner", receivedObject.owner);
  formDataObj.append("address", receivedObject.address);
  
  return formDataObj;
};
/* 
  * I created a module function that creates an object called formDataObj using the javascript FormData object that compile a set of key/value pairs to send to the API enabling creation/updating of data
  * It returns the object.
*/