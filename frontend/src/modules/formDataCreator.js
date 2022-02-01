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