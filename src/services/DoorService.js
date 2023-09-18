import BaseService from './BaseService';
class DoorService {
  addDoor(data) {
    return BaseService.postData(`Doors/AddDoor`, data);
  }
  updateDoor(data) {
    return BaseService.postData(`Doors/UpdateDoor`, data);
  }
  deleteDoor(deviceIP) {
    return BaseService.postData(`Doors/DeleteDoor?deviceIP=${deviceIP}`);
  }
  getDoor() {
    return BaseService.getData(`api/Automat/GetAllAutomatList`);
  }
  importDoors(isUpdate, data) {
    return BaseService.postData(`Doors/DoorFileImport?isUpdate=${isUpdate}`, data);
  }
  setOperationType(isUpdate, data) {
    return BaseService.getData(`Doors/SetOperationType`);
  }
}

export default new DoorService();
